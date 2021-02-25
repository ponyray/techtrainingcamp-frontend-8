package com.rooftopj.bytedancecamp.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rooftopj.bytedancecamp.entity.Comment;
import com.rooftopj.bytedancecamp.entity.Live;
import com.rooftopj.bytedancecamp.entity.ResMessage;
import com.rooftopj.bytedancecamp.entity.Video;
import com.rooftopj.bytedancecamp.entity.vo.*;
import com.rooftopj.bytedancecamp.service.CommentService;
import com.rooftopj.bytedancecamp.service.LiveService;
import com.rooftopj.bytedancecamp.service.VideoService;
import com.rooftopj.bytedancecamp.util.OssUtil;
import com.rooftopj.bytedancecamp.util.VideoSpriteUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@Api(tags = "后台管理系统")
@RequestMapping("/back")
public class BackSystemController {

    @Autowired
    private LiveService liveService;

    @Autowired
    private VideoService videoService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private CommentService commentService;

    @PostMapping("/addVideo")
    @ApiOperation("添加视频, tag中每个标签用英文逗号分隔开")
    public ResMessage addVideo(MultipartFile file, UploadVideoVo info) {
        System.out.println(info);
        String videoUrl = "";
        try {
            videoUrl = OssUtil.getFileUrl(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            return ResMessage.error().message("视频上传失败！");
        }

        Video video = new Video();
        video.setUrl(videoUrl);
        BeanUtils.copyProperties(info, video);
        String[] infoUrl;
        System.out.println(video);
        try {
            infoUrl = VideoSpriteUtil.getSprite(videoUrl, file.getOriginalFilename().replaceAll(".mp4", ".jpg"));
        } catch (Exception e) {
            return ResMessage.error().message("视频上传失败！");
        }
        video.setThumbnailUrl(infoUrl[1]);
        video.setPosterUrl(infoUrl[0]);
        videoService.save(video);
        redisTemplate.opsForValue().increment("videoCount");
        redisTemplate.opsForValue().set("video:"+video.getId()+":like", 0);
        redisTemplate.opsForValue().set("video:"+video.getId()+":comment", 0);
//        redisTemplate.opsForSet().add("video", video.getId());

        return ResMessage.success().message("成功！");

    }

    @GetMapping("/deleteVideo/{videoId}")
    @ApiOperation("删除视频")
    public ResMessage deleteVideo(@PathVariable("videoId") Integer id) {
        boolean b = videoService.removeById(id);
        redisTemplate.opsForValue().decrement("videoCount");
        redisTemplate.delete("video:"+ id +":like");
        redisTemplate.delete("video:"+ id +":comment");

        QueryWrapper<Comment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("video_id", id);
        commentService.remove(queryWrapper);
//        redisTemplate.opsForSet().remove("video", id);
        return b ? ResMessage.success().message("成功！") : ResMessage.error().message("删除失败！");
    }

    @GetMapping("/listVideos/{curPage}")
    @ApiOperation("点播视频列表, curPage 页数，从 1 开始计数")
    public ResMessage listVideos(@PathVariable("curPage") Integer curPage) {
        Page<Video> page = new Page<>(curPage, 10);
        videoService.page(page, null);
        List<Video> records = page.getRecords();
        List<VideoToFrontVO> res = new ArrayList<>();
        for (Video video : records) {
            VideoToFrontVO videoToFrontVO = new VideoToFrontVO();
            BeanUtils.copyProperties(video, videoToFrontVO);
            videoToFrontVO.setLikeNum((Integer) redisTemplate.opsForValue().get("video:"+ videoToFrontVO.getId()+":like"));
            videoToFrontVO.setCommentNum((Integer) redisTemplate.opsForValue().get("video:"+ videoToFrontVO.getId()+":comment"));
            videoToFrontVO.setTags(video.getTag().split(","));
            res.add(videoToFrontVO);
        }
        return ResMessage.success().data("records", res).data("total", page.getTotal());
    }

    @GetMapping("/getVideo/{videoId}")
    @ApiOperation("获取某条视频的详情信息")
    public ResMessage videoId(@PathVariable("videoId") Integer videoId) {
        return ResMessage.success().data("record", videoService.getById(videoId));
    }

    @PostMapping("/updateVideo/{id}")
    @ApiOperation("修改视频详情")
    public ResMessage updateVideo(@PathVariable("id") Integer id, @RequestBody UpdateVideoVo video) {
        Video v = videoService.getById(id);
        BeanUtils.copyProperties(video, v);
        videoService.updateById(v);
        return ResMessage.success();
    }

    @PostMapping("/uploadImage")
    @ApiOperation("上传图片")
    public ResMessage uploadImage(MultipartFile file) {
        String url = "";
        try {
            url = OssUtil.getFileUrl(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResMessage.success().data("url", url);
    }

    @GetMapping("/getComments/{videoId}/{curPage}")
    @ApiOperation("分页获取评论数据，页数从 1 开始计数")
    public ResMessage getComments(@PathVariable("videoId") Integer videoId,
                                  @PathVariable("curPage") Integer curPage) {
        Page<Comment> page = new Page<>(curPage, 10);
        QueryWrapper<Comment> queryWrapper = new QueryWrapper();
        queryWrapper.eq("video_id", videoId);
        commentService.page(page, queryWrapper);
        List<Comment> records = page.getRecords();
        return ResMessage.success().data("comments", records).data("total", page.getTotal());
    }

    @GetMapping("/deleteComment/{commentId}")
    @ApiOperation("删除评论")
    public ResMessage deleteComment(@PathVariable("commentId") Integer id) {
        boolean b = commentService.removeById(id);
        redisTemplate.opsForValue().decrement("video:"+id+":comment");
        return b ? ResMessage.success().message("成功！") : ResMessage.error().message("删除失败！");
    }

    @PostMapping("/comment")
    @ApiOperation("发表评论。videoId是视频的id，name是发表评论的用户名")
    public ResMessage comment(@RequestBody BackAddCommentVO backAddCommentVO) {

        if (StringUtils.isEmpty(backAddCommentVO.getComment())) {
            return ResMessage.error().message("评论内容不能为空！");
        }
        Comment comment = new Comment();
        comment.setVideoId(backAddCommentVO.getVideoId());
        comment.setUsername(backAddCommentVO.getName());
        comment.setComment(backAddCommentVO.getComment());
        commentService.save(comment);
        redisTemplate.opsForValue().increment("video:"+comment.getVideoId()+":comment");
        return ResMessage.success();
    }


    @PostMapping("/addLive")
    @ApiOperation("新建直播")
    public ResMessage addLive(@RequestBody LiveFrontVO liveFrontVO) {
        Live live = new Live();
        BeanUtils.copyProperties(liveFrontVO, live);
        live.setPushUrl("rtmp://bytedancecamp.rooftopj.cn/live/" + liveFrontVO.getPushName());
        live.setPullUrl("http://bytedancecamp.rooftopj.cn/hls/" + liveFrontVO.getPushName() + ".m3u8");
        liveService.save(live);
        redisTemplate.opsForValue().set("live:" + live.getId() + ":popularity", 0);
        return ResMessage.success();
    }

    @GetMapping("/listLives/{curPage}")
    @ApiOperation("获取直播房间列表")
    public ResMessage getLives(@PathVariable("curPage") Integer curPage) {
        Page<Live> page = new Page<>(curPage, 10);
        liveService.page(page, null);
        List<Live> records = page.getRecords();
        List<LiveIncludePopu> res = new ArrayList<>();
        for (Live record : records) {
            LiveIncludePopu liveIncludePopu = new LiveIncludePopu();
            BeanUtils.copyProperties(record, liveIncludePopu);
            liveIncludePopu.setPopularity(redisTemplate.opsForValue().get("live:" + record.getId() + ":popularity"));
            res.add(liveIncludePopu);
        }
        return ResMessage.success().data("records", res).data("total", page.getTotal());
    }

    @GetMapping("/deleteLive/{liveId}")
    @ApiOperation("删除直播间")
    public ResMessage deleteLive(@PathVariable("liveId") Integer liveId) {
        boolean b = liveService.removeById(liveId);
        redisTemplate.delete("live:" + liveId + ":popularity");
        return b ? ResMessage.success() : ResMessage.error();
    }

    @GetMapping("changeStatus/{liveId}")
    @ApiOperation("开直播/关直播")
    public ResMessage changeStatus(@PathVariable("liveId") Integer liveId) {
        Live live = liveService.getById(liveId);
        if (live.getIsLive() == 1) {
            live.setIsLive(0);
        } else {
            live.setIsLive(1);
        }
        liveService.updateById(live);
        return ResMessage.success().data("flag", live.getIsLive());
    }

    @GetMapping("/getLive/{liveId}")
    @ApiOperation("获取某个直播间的详细信息，一般用于修改直播信息前调用")
    public ResMessage getLive(@PathVariable("liveId") Integer liveId) {
        Live live = liveService.getById(liveId);
        LiveFrontVO liveFrontVO = new LiveFrontVO();
        BeanUtils.copyProperties(live, liveFrontVO);
        String[] temp = live.getPushUrl().split("/");
        liveFrontVO.setPushName(temp[temp.length - 1]);
        return ResMessage.success().data("record", liveFrontVO);
    }

    @PostMapping("/updateLive/{liveId}")
    @ApiOperation("更新某个直播间的详细信息")
    public ResMessage updateLive(@PathVariable("liveId") Integer liveId,
                                 @RequestBody LiveFrontVO liveFrontVO) {
        Live live = liveService.getById(liveId);
        BeanUtils.copyProperties(liveFrontVO, live);
        live.setPushUrl("rtmp://bytedancecamp.rooftopj.cn/live/" + liveFrontVO.getPushName());
        live.setPullUrl("http://bytedancecamp.rooftopj.cn/hls/" + liveFrontVO.getPushName() + ".m3u8");
        liveService.updateById(live);
        return ResMessage.success();
    }


}
