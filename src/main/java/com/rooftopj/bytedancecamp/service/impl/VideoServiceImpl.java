package com.rooftopj.bytedancecamp.service.impl;

import com.rooftopj.bytedancecamp.entity.Video;
import com.rooftopj.bytedancecamp.mapper.VideoMapper;
import com.rooftopj.bytedancecamp.service.VideoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author rooftopj
 * @since 2021-01-30
 */
@Service
public class VideoServiceImpl extends ServiceImpl<VideoMapper, Video> implements VideoService {

    @Override
    public Integer getNewVideo(List<Integer> list) {
        return this.baseMapper.getNewVideo(list);
    }
}
