package com.rooftopj.bytedancecamp.entity.vo;

import lombok.Data;

@Data
public class BackAddCommentVO {
    private Integer videoId;
    private String name;
    private String comment;
}
