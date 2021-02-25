package com.rooftopj.bytedancecamp.netty;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.IdleStateHandler;

public class LiveHandler extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline = socketChannel.pipeline();

        // websocket 基于 http 协议，加入 http 编解码器
        pipeline.addLast(new HttpServerCodec());

        // 在http上有一些数据流产生，有大有小，需要对其进行处理，需要使用 netty 对下数据流写 提供支持
        pipeline.addLast(new ChunkedWriteHandler());

        // 对httpMessage 进行聚合处理，聚合成request或 response
        pipeline.addLast(new HttpObjectAggregator(1024*64));

        // 心跳
        pipeline.addLast(new IdleStateHandler(8, 12, 60));
        pipeline.addLast(new HeartbeatHanlder());
        /**
         * 本handler 处理一些繁重复杂的事情
         * 会处理握手动作：handshaking（close、ping、pong） ping+pong = 心跳
         */
        pipeline.addLast(new WebSocketServerProtocolHandler("/ws"));

        //自定义的handler
        pipeline.addLast(new ChatHandler());
    }
}
