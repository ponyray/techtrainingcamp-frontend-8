package com.rooftopj.bytedancecamp.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rooftopj.bytedancecamp.entity.Comment;
import com.rooftopj.bytedancecamp.entity.ResMessage;
import com.rooftopj.bytedancecamp.entity.Video;
import com.rooftopj.bytedancecamp.entity.vo.AddCommentVO;
import com.rooftopj.bytedancecamp.entity.vo.VideoToFrontVO;
import com.rooftopj.bytedancecamp.service.CommentService;
import com.rooftopj.bytedancecamp.service.VideoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.auth.In;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.PresentationDirection;
import javax.servlet.ServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author rooftopj
 * @since 2021-01-30
 */
@RestController
@RequestMapping("/video")
@Api(tags = "点播")
@CrossOrigin
public class VideoController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private CommentService commentService;

    @Autowired
    private VideoService videoService;


    @GetMapping("/like/{videoId}/{sign}")
    @ApiOperation("点赞/取消点赞。videoId是视频的id。返回值中flag为0表示取消点赞，1表示点赞成功")
    public ResMessage like(@PathVariable("videoId") Integer videoId,
                           @PathVariable("sign") String sign) {
        if (!redisTemplate.hasKey(sign + ":name")) {
            redisTemplate.delete(sign + ":set");
            redisTemplate.delete(sign + ":index");
            redisTemplate.delete(sign + ":list");
            return ResMessage.notLogin();
        }
        int flag = 0;
        if (redisTemplate.hasKey(sign + ":likeVideo:" + videoId)) {
            // 取消赞
            redisTemplate.delete(sign + ":likeVideo:" + videoId);
            redisTemplate.opsForValue().decrement("video:"+videoId+":like");
            flag = 0;
        } else {
            // 点赞
            redisTemplate.opsForValue().set(sign + ":likeVideo:" + videoId, 1);
            redisTemplate.opsForValue().increment("video:"+videoId+":like");
            flag = 1;
        }


        return ResMessage.success().data("flag", flag);
    }

    @PostMapping("/comment")
    @ApiOperation("发表评论。videoId是视频的id，sign是发表评论的签名")
    public ResMessage comment(@RequestBody AddCommentVO addCommentVO) {
        if (!redisTemplate.hasKey(addCommentVO.getSign() + ":name")) {
            redisTemplate.delete(addCommentVO.getSign() + ":set");
            redisTemplate.delete(addCommentVO.getSign() + ":index");
            redisTemplate.delete(addCommentVO.getSign() + ":list");
            return ResMessage.notLogin();
        }

        if (StringUtils.isEmpty(addCommentVO.getComment())) {
            return ResMessage.error().message("评论内容不能为空！");
        }
        Comment comment = new Comment();
        comment.setVideoId(addCommentVO.getVideoId());
        comment.setUsername((String)redisTemplate.opsForValue().get(addCommentVO.getSign()+":name"));
        comment.setComment(addCommentVO.getComment());
        commentService.save(comment);
        redisTemplate.opsForValue().increment("video:"+comment.getVideoId()+":comment");
        return ResMessage.success();
    }

    @GetMapping("/getSign/{username}")
    @ApiOperation("进入系统时使用该API，username是用户输入的用户名，成功返回给你一个签名，12小时后过期，浏览点播视频时带上该签名，用于后端去掉重复视频，以及上滑下滑找视频")
    public ResMessage getSign(ServletRequest request, @PathVariable("username") String username) {
        String uuid = UUID.randomUUID().toString() + request.getRemoteHost() + request.getRemoteAddr();
        uuid = uuid.replaceAll(":", "");
        uuid = uuid.replaceAll("\\.","");
        redisTemplate.opsForValue().set(uuid + ":name", username);
        redisTemplate.expire(uuid + ":name", 60 * 60 * 12, TimeUnit.SECONDS);

        redisTemplate.opsForValue().set(uuid + ":index", 0); // 当前 sign 所在的视频下标
        redisTemplate.expire(uuid + ":index", 60 * 60 * 12, TimeUnit.SECONDS);
        redisTemplate.opsForSet().add(uuid + ":set", -1); // 当前 sign 看过的视频集合
        redisTemplate.expire(uuid + ":set", 60 * 60 * 12, TimeUnit.SECONDS);
        redisTemplate.opsForList().rightPush(uuid + ":list", -1); // 当前 sign 看过的视频顺序
        redisTemplate.expire(uuid + ":list", 60 * 60 * 12, TimeUnit.SECONDS);
        return ResMessage.success().data("sign", uuid);
    }

    @GetMapping("/getNewVideo/{sign}")
    @ApiOperation("下一个视频")
    public ResMessage getNewVideo(@PathVariable("sign") String sign) {
        if (!redisTemplate.hasKey(sign + ":name")) {
            redisTemplate.delete(sign + ":set");
            redisTemplate.delete(sign + ":index");
            redisTemplate.delete(sign + ":list");
            return ResMessage.notLogin();
        }

        Integer now = (Integer)redisTemplate.opsForValue().get(sign + ":index");
        Long listSize = redisTemplate.opsForList().size(sign + ":list");
        Long setSize = redisTemplate.opsForSet().size(sign + ":set");

        Integer videoId = null;
        if (setSize == ((Integer)redisTemplate.opsForValue().get("videoCount")) + 1) {
            redisTemplate.delete(sign + ":set");
            redisTemplate.opsForSet().add(sign + ":set", -1); // 当前 sign 看过的视频集合
            redisTemplate.expire(sign + ":set", 60 * 60 * 12, TimeUnit.SECONDS);
        }

        // 要拿新的视频
        if (now == listSize - 1) {
            Set<Object> members = redisTemplate.opsForSet().members(sign + ":set");
            List<Integer> list = new ArrayList<>();
            for (Object member : members) {
                list.add((Integer)member);
            }
            videoId = videoService.getNewVideo(list);

            redisTemplate.opsForSet().add(sign + ":set", videoId);
            redisTemplate.opsForList().rightPush(sign + ":list", videoId);
            redisTemplate.opsForValue().increment(sign + ":index");

        } else {
            videoId = (Integer) redisTemplate.opsForList().index(sign + ":list", now + 1);
            redisTemplate.opsForValue().increment(sign + ":index");
        }

        Video video = videoService.getById(videoId);
        VideoToFrontVO videoToFrontVO = new VideoToFrontVO();
        BeanUtils.copyProperties(video, videoToFrontVO);
        videoToFrontVO.setLikeNum((Integer) redisTemplate.opsForValue().get("video:"+ videoToFrontVO.getId()+":like"));
        videoToFrontVO.setCommentNum((Integer) redisTemplate.opsForValue().get("video:"+ videoToFrontVO.getId()+":comment"));
        videoToFrontVO.setTags(video.getTag().split(","));
        if (redisTemplate.hasKey(sign + ":likeVideo:" + videoId)) {
            videoToFrontVO.setIsLike(1);
        } else {
            videoToFrontVO.setIsLike(0);
        }

        return ResMessage.success().data("video", videoToFrontVO);
    }

    @GetMapping("/lastVideo/{sign}")
    @ApiOperation("上一个视频")
    public ResMessage lastVideo(@PathVariable("sign") String sign) {
        if (!redisTemplate.hasKey(sign + ":name")) {
            redisTemplate.delete(sign + ":set");
            redisTemplate.delete(sign + ":index");
            redisTemplate.delete(sign + ":list");
            return ResMessage.notLogin();
        }

        Integer now = (Integer)redisTemplate.opsForValue().get(sign + ":index");

        if (now <= 1) {
            // 已经上滑到看过的最旧的视频了
            if (now == 1) {
                redisTemplate.opsForValue().decrement(sign + ":index");
            }
            return ResMessage.error().message("已经上滑到看过的最旧的视频了");
        }

        Integer videoId = (Integer)redisTemplate.opsForList().index(sign + ":list", now - 1);
        redisTemplate.opsForValue().decrement(sign + ":index");

        Video video = videoService.getById(videoId);
        VideoToFrontVO videoToFrontVO = new VideoToFrontVO();
        BeanUtils.copyProperties(video, videoToFrontVO);
        videoToFrontVO.setLikeNum((Integer) redisTemplate.opsForValue().get("video:"+ videoToFrontVO.getId()+":like"));
        videoToFrontVO.setCommentNum((Integer) redisTemplate.opsForValue().get("video:"+ videoToFrontVO.getId()+":comment"));
        videoToFrontVO.setTags(video.getTag().split(","));
        if (redisTemplate.hasKey(sign + ":likeVideo:" + videoId)) {
            videoToFrontVO.setIsLike(1);
        } else {
            videoToFrontVO.setIsLike(0);
        }

        return ResMessage.success().data("video", videoToFrontVO);
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

}

