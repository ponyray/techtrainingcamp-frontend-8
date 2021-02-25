package com.rooftopj.bytedancecamp.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rooftopj.bytedancecamp.entity.Live;
import com.rooftopj.bytedancecamp.entity.ResMessage;
import com.rooftopj.bytedancecamp.entity.vo.LiveFrontVO;
import com.rooftopj.bytedancecamp.entity.vo.LiveIncludePopu;
import com.rooftopj.bytedancecamp.service.LiveService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author rooftopj
 * @since 2021-02-01
 */
@RestController
@RequestMapping("/liveBack")
@Api(tags = "直播")
public class LiveController {
    @Autowired
    private LiveService liveService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

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

    @GetMapping("/listActiveLives/{curPage}")
    @ApiOperation("获取正在直播的直播房间列表")
    public ResMessage listActiveLives(@PathVariable("curPage") Integer curPage) {
        Page<Live> page = new Page<>(curPage, 10);
        QueryWrapper<Live> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("is_live", 1);
        liveService.page(page, queryWrapper);
        List<Live> records = page.getRecords();
        List<LiveIncludePopu> res = new ArrayList<>();
        for (Live record : records) {
            LiveIncludePopu liveIncludePopu = new LiveIncludePopu();
            BeanUtils.copyProperties(record, liveIncludePopu);
            BeanUtils.copyProperties(record, liveIncludePopu);
            liveIncludePopu.setPopularity(redisTemplate.opsForValue().get("live:" + record.getId() + ":popularity"));
            res.add(liveIncludePopu);
        }
        return ResMessage.success().data("records", res).data("total", page.getTotal());
    }

}

