package com.rooftopj.bytedancecamp;

import com.rooftopj.bytedancecamp.netty.WebSocketServer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

//@Component
//public class NettyBoot implements ApplicationListener<ContextRefreshedEvent> {
//    @Override
//    public void onApplicationEvent(ContextRefreshedEvent event) {
//        if (event.getApplicationContext().getParent() == null) {
//            WebSocketServer.getInstance().start();
//        }
//    }
//}
