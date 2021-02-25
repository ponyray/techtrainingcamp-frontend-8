package com.rooftopj.bytedancecamp.netty;

import com.alibaba.fastjson.JSONObject;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.concurrent.GlobalEventExecutor;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ChatHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {

    public static ChannelGroup users = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);
    public static Map<Integer, Set<Channel>> map = new HashMap<>(); // 每个直播间对应的用户
    public static Map<Channel, Integer> channelToRoom = new HashMap<>(); // 每个用户属于哪个直播间


    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
//        ctx.writeAndFlush(new TextWebSocketFrame(ctx.channel().id() + "进入直播间"));
        System.out.println("建立连接：" + ctx.channel().id().asLongText());
        users.add(ctx.channel());
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        System.out.println("断开连接：" + ctx.channel().id().asLongText());
        users.remove(ctx.channel());
        Integer room = channelToRoom.get(ctx.channel());
        channelToRoom.remove(ctx.channel());
        if (map.get(room) != null)
            map.get(room).remove(ctx.channel());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.channel().close();
        users.remove(ctx.channel());
        cause.printStackTrace();
    }

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, TextWebSocketFrame textWebSocketFrame) throws Exception {
        String content = textWebSocketFrame.text();
        DataContent data = JSONObject.parseObject(content, DataContent.class);
        System.out.println(content.toString());

        // 加入直播间
        if (data.getType() == DataType.JOIN_IN) {
            if (!map.containsKey(data.getMsg().getLiveNum())) {
                map.put(data.getMsg().getLiveNum(), new HashSet<>());
            }
            channelToRoom.put(channelHandlerContext.channel(), data.getMsg().getLiveNum());

            Set<Channel> set = map.get(data.getMsg().getLiveNum());
            for (Channel c : set) {
                if (users.find(c.id()) != null)
                    c.writeAndFlush(new TextWebSocketFrame(JSONObject.toJSONString(data)));
            }
            set.add(channelHandlerContext.channel());
        }

        // 发实时评论
        if (data.getType() == DataType.SEND_MSG) {
            Set<Channel> set = map.get(data.getMsg().getLiveNum());
            if (set != null) {
                for (Channel c : set) {
                    if (users.find(c.id()) != null)
                        c.writeAndFlush(new TextWebSocketFrame(JSONObject.toJSONString(data)));
                }
            }
        }

        // 点赞动效，排除自己
        if (data.getType() == DataType.LIKE) {
            Set<Channel> set = map.get(data.getMsg().getLiveNum());
            if (set != null) {
                for (Channel c : set) {
                    if (users.find(c.id()) != null && c != channelHandlerContext.channel())
                        c.writeAndFlush(new TextWebSocketFrame(JSONObject.toJSONString(data)));
                }
            }
        }
    }
}
