package com.rooftopj.bytedancecamp.netty;

public interface DataType {
    public static final Integer JOIN_IN = 0;
    public static final Integer SEND_MSG = 1;
    public static final Integer HEART_BEAT = 2;
    public static final Integer STOP_LIVE = 3;
    public static final Integer LIKE = 4;
}
