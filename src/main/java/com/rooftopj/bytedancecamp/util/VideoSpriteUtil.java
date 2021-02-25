package com.rooftopj.bytedancecamp.util;

import net.coobird.thumbnailator.Thumbnails;
import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class VideoSpriteUtil {

    public static String[] getSprite(String filePath, String name) throws Exception {
        FFmpegFrameGrabber ff = FFmpegFrameGrabber.createDefault(filePath);
        String[] ans = new String[2];
        ff.start();

        int ffLength = ff.getLengthInFrames();
        if (ffLength < 50) {
            throw new RuntimeException("视频过短！");
        }
        int interval = ffLength / 50;
        Frame f;
        int i = 0;
        int cnt = 0;

        BufferedImage[][] images = new BufferedImage[5][10];

        while (i < ffLength && cnt < 50) {
            f = ff.grabImage();
            if (i == 0) {
                ans[0] = OssUtil.getFileUrl(getInputStream(f), "poster-" + name);
            }
            if ((i % interval) == 0) {
                images[i / 10 / interval][(i / interval) % 10] = ImageIO.read(doExecuteFrameCompress(f));   //获取缩略图
                cnt++;
            }
            i++;
        }
        ff.stop();

        BufferedImage[] temp = new BufferedImage[5];
        for (int j = 0; j < 5; j++) {
            temp[j] = mergeImage(true, images[j]);
        }
        BufferedImage res = null;
        res = mergeImage(false, temp);

        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(res, "jpg", os);
        InputStream input = new ByteArrayInputStream(os.toByteArray());

        ans[1] = OssUtil.getFileUrl(input, name);

        return ans;  //返回的是视频第N帧
    }

    /**
     *  将帧转为图片并且压缩
     * @param f
     * @return
     * @throws Exception
     */
    public static InputStream doExecuteFrameCompress(Frame f) throws Exception {

        Java2DFrameConverter converter = new Java2DFrameConverter();
        BufferedImage bi = converter.getBufferedImage(f);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", os);
        InputStream input = new ByteArrayInputStream(os.toByteArray());

        ByteArrayOutputStream ou = new ByteArrayOutputStream();
        Thumbnails.of(input).size(160, 90).keepAspectRatio(false).toOutputStream(ou);

        return new ByteArrayInputStream(ou.toByteArray());
    }

    public static InputStream getInputStream(Frame f) throws Exception {

        Java2DFrameConverter converter = new Java2DFrameConverter();
        BufferedImage bi = converter.getBufferedImage(f);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(bi, "jpg", os);
        InputStream input = new ByteArrayInputStream(os.toByteArray());


        return input;
    }


    /**
     * 合并图片
     * @param isHorizontal true代表水平合并，fasle代表垂直合并
     * @param imgs 输入的图片
     * @return
     * @throws IOException
     */
    private static BufferedImage mergeImage(boolean isHorizontal, BufferedImage... imgs) throws IOException {
        // 生成新图片
        BufferedImage destImage = null;
        // 计算新图片的长和高
        int allw = 0, allh = 0, allwMax = 0, allhMax = 0;
        // 获取总长、总宽、最长、最宽
        for (int i = 0; i < imgs.length; i++) {
            BufferedImage img = imgs[i];
            allw += img.getWidth();
            allh += img.getHeight();
            if (img.getWidth() > allwMax) {
                allwMax = img.getWidth();
            }
            if (img.getHeight() > allhMax) {
                allhMax = img.getHeight();
            }
        }
        // 创建新图片
        if (isHorizontal) {
            destImage = new BufferedImage(allw, allhMax, BufferedImage.TYPE_INT_RGB);
        } else {
            destImage = new BufferedImage(allwMax, allh, BufferedImage.TYPE_INT_RGB);
        }
        // 合并所有子图片到新图片
        int wx = 0, wy = 0;
        for (int i = 0; i < imgs.length; i++) {
            BufferedImage img = imgs[i];
            int w1 = img.getWidth();
            int h1 = img.getHeight();
            // 从图片中读取RGB
            int[] ImageArrayOne = new int[w1 * h1];
            ImageArrayOne = img.getRGB(0, 0, w1, h1, ImageArrayOne, 0, w1); // 逐行扫描图像中各个像素的RGB到数组中
            if (isHorizontal) { // 水平方向合并
                destImage.setRGB(wx, 0, w1, h1, ImageArrayOne, 0, w1); // 设置上半部分或左半部分的RGB
            } else { // 垂直方向合并
                destImage.setRGB(0, wy, w1, h1, ImageArrayOne, 0, w1); // 设置上半部分或左半部分的RGB
            }
            wx += w1;
            wy += h1;
        }
        return destImage;
    }
}
