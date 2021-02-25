package com.rooftopj.bytedancecamp.entity.vo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class VideoToFrontVO {

    private Integer id;

    private String authorName;

    private String authorAvatar;

    private String url;

    private String description;

    private String posterUrl;

    private String[] tags;

    private String thumbnailUrl;

    private Date createTime;

    private Date updateTime;

    private Integer likeNum;

    private Integer commentNum;

    private Integer isLike;
}
