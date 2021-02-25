package com.rooftopj.bytedancecamp.netty;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandler;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;

public class HeartbeatHanlder extends ChannelInboundHandlerAdapter {
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent heart = (IdleStateEvent) evt;
            if (heart.state() == IdleState.READER_IDLE) {
//                System.out.println("读空闲");
            }
            if (heart.state() == IdleState.WRITER_IDLE) {
//                System.out.println("写空闲");
            }
            if (heart.state() == IdleState.ALL_IDLE) {
                ChatHandler.users.remove(ctx.channel());
                Integer room = ChatHandler.channelToRoom.get(ctx.channel());
                ChatHandler.channelToRoom.remove(ctx.channel());
                if (ChatHandler.map.get(room) != null)
                    ChatHandler.map.get(room).remove(ctx.channel());
            }
        }
    }
}
