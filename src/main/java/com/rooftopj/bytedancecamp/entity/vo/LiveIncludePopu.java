package com.rooftopj.bytedancecamp.entity.vo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author rooftopj
 * @since 2021-02-01
 */
@Data
public class LiveIncludePopu {

    private Integer id;

    private String name;

    private String coverUrl;

    private Date updateTime;

    private Date createTime;

    private Integer isLive;

    private String pushUrl;

    private String pullUrl;

    private Object popularity;
}
