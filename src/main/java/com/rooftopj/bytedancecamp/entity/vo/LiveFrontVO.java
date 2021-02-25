package com.rooftopj.bytedancecamp.entity.vo;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Data;

import java.util.Date;

@Data
public class LiveFrontVO {

    private String name;

    private String coverUrl;

    private Integer isLive;

    @ApiModelProperty("一个无特殊符号的英文字符串，后端会自动生成对应的推流和拉流地址")
    private String pushName;

}
