package com.rooftopj.bytedancecamp.entity.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class UploadVideoVo {

    private String authorName;

    private String authorAvatar;

    private String description;

    private String tag;

}
