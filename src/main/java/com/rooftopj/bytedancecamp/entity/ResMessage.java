package com.rooftopj.bytedancecamp.entity;

import lombok.Data;

import java.util.HashMap;

@Data
public class ResMessage {
    private Integer code;
    private String message;
    private HashMap<String, Object> data = new HashMap<>();

    private ResMessage(){}

    public static ResMessage success() {
        ResMessage resMessage = new ResMessage();
        resMessage.code = CodeInterface.SUCCESS; // 200
        resMessage.message = "执行成功！";

        return resMessage;
    }

    public static ResMessage error(){
        ResMessage resMessage = new ResMessage();
        resMessage.code = CodeInterface.ERROR; // 202
        resMessage.message = "执行出现异常错误！";
        return resMessage;
    }

    public static ResMessage notFound(){
        ResMessage resMessage = new ResMessage();
        resMessage.code = CodeInterface.NOT_FOUND; // 201
        resMessage.message = "未出现预期执行结果！";
        return resMessage;
    }

    public static ResMessage notLogin(){
        ResMessage resMessage = new ResMessage();
        resMessage.code = CodeInterface.NOT_LOGIN; // 203
        resMessage.message = "用户未登录！";
        return resMessage;
    }

    public ResMessage message(String message){
        this.setMessage(message);
        return this;
    }

    public ResMessage data(String key, Object value){
        this.getData().put(key, value);
        return this;
    }

    public ResMessage data(HashMap<String, Object> hashMap){
        this.setData(hashMap);
        return this;
    }
}
