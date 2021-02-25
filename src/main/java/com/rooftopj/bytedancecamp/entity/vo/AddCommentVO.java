package com.rooftopj.bytedancecamp.entity.vo;

import io.swagger.models.auth.In;
import lombok.Data;

@Data
public class AddCommentVO {
    private Integer videoId;
    private String sign;
    private String comment;
}
