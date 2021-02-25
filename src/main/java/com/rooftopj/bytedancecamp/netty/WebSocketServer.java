package com.rooftopj.bytedancecamp.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class WebSocketServer implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        WebSocketServer.getInstance().start();
    }

    private static class Singleton {
        static final WebSocketServer instance = new WebSocketServer();
    }

    public static WebSocketServer getInstance() {
        return Singleton.instance;
    }

    public WebSocketServer() {
        bossGroup = new NioEventLoopGroup(1);
        workerGroup = new NioEventLoopGroup();
        server = new ServerBootstrap();
        server.group(bossGroup, workerGroup)
              .channel(NioServerSocketChannel.class)
              .childHandler(new LiveHandler());
    }

    private NioEventLoopGroup bossGroup;
    private NioEventLoopGroup workerGroup;
    private ServerBootstrap server;
    private ChannelFuture future;

    public void start() {
        System.out.println("服务器正在启动~");
        future = server.bind(9999);
        System.out.println("test");
        if (future.isSuccess()) {
            System.out.println("服务器启动成功！");
        }
    }
}
