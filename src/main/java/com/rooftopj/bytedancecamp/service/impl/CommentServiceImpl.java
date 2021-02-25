package com.rooftopj.bytedancecamp.service.impl;

import com.rooftopj.bytedancecamp.entity.Comment;
import com.rooftopj.bytedancecamp.mapper.CommentMapper;
import com.rooftopj.bytedancecamp.service.CommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author rooftopj
 * @since 2021-01-31
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

}
