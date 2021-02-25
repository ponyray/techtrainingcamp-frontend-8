package com.rooftopj.bytedancecamp.util;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 * <p>
 *
 * </p>
 *
 * @author rooftopj
 * @since 2020-10-27
 */
@Service
public class OssUtil {
    public static final String endpoint = "oss-cn-hangzhou.aliyuncs.com";
    public static final String accessKeyId = "XXXXXXXXX";
    public static final String accessKeySecret = "XXXXXX";
    public static final String bucketName = "bytedancecamptiktok";



    public static String getFileUrl(InputStream in, String name) {

        OSS oss = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        StringBuilder tempName = new StringBuilder();
        String fileName = null;

        tempName.append(new DateTime().toString("yyyy/MM/dd"));

        tempName.append("/");

        tempName.append(UUID.randomUUID().toString());

        tempName.append(name);

        fileName = tempName.toString().replaceAll("-", "").replaceAll(",","");

        oss.putObject(bucketName, fileName, in);

        fileName = "https://" + bucketName + "." + endpoint + "/" + fileName;


        return fileName;
    }
}
