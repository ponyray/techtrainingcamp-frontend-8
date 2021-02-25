package com.rooftopj.bytedancecamp;

import com.rooftopj.bytedancecamp.netty.WebSocketServer;
import org.mapstruct.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@MapperScan(basePackages = "com.rooftopj.bytedancecamp.mapper")
public class BytedancecampApplication {

    public static void main(String[] args) {
        SpringApplication.run(BytedancecampApplication.class, args);
    }

}
