package com.rooftopj.bytedancecamp.entity.vo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.util.Date;

@Data
public class UpdateVideoVo {

    private String authorName;

    private String authorAvatar;

    private String url;

    private String description;

    private String tag;

    private String thumbnailUrl;

    private String posterUrl;
}
