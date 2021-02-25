package com.rooftopj.bytedancecamp.netty;

import lombok.Data;

import java.io.Serializable;

@Data
public class DataMsg implements Serializable {
    private String sendName;
    private String msg;
    private Integer liveNum;
}
