package com.rooftopj.bytedancecamp.mapper;

import com.rooftopj.bytedancecamp.entity.Video;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author rooftopj
 * @since 2021-01-30
 */
public interface VideoMapper extends BaseMapper<Video> {
    Integer getNewVideo(List<Integer> list);
}
