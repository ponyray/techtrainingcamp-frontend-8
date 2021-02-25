package com.rooftopj.bytedancecamp.service.impl;

import com.rooftopj.bytedancecamp.entity.Live;
import com.rooftopj.bytedancecamp.mapper.LiveMapper;
import com.rooftopj.bytedancecamp.service.LiveService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author rooftopj
 * @since 2021-02-01
 */
@Service
public class LiveServiceImpl extends ServiceImpl<LiveMapper, Live> implements LiveService {

}
