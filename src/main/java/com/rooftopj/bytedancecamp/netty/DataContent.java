package com.rooftopj.bytedancecamp.netty;

import lombok.Data;

import java.io.Serializable;

@Data
public class DataContent implements Serializable {
    private Integer type;
    private DataMsg msg;
    private String ext;
}
