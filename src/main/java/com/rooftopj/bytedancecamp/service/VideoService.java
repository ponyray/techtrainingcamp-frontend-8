package com.rooftopj.bytedancecamp.service;

import com.rooftopj.bytedancecamp.entity.Video;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author rooftopj
 * @since 2021-01-30
 */
public interface VideoService extends IService<Video> {
    public Integer getNewVideo(List<Integer> list);
}
