//package com.rooftopj.bytedancecamp.util;
//
//import net.coobird.thumbnailator.Thumbnails;
//import org.bytedeco.javacpp.opencv_core;
//import org.bytedeco.javacpp.opencv_core.IplImage;
//import org.bytedeco.javacv.FFmpegFrameGrabber;
//import org.bytedeco.javacv.Frame;
//import org.bytedeco.javacv.Java2DFrameConverter;
//import org.bytedeco.javacv.OpenCVFrameConverter;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.imageio.ImageIO;
//import java.awt.*;
//import java.awt.image.BufferedImage;
//import java.io.*;
//import java.util.ResourceBundle;
//
//public class VideoSprite {
//
//    public static void main(String[] args) throws Exception {
//        VideoSprite imgTools = new VideoSprite();
//        System.out.println(imgTools.getSprite
//                ("D:\\IDM下载\\视频\\【时代楷模】“八一”短视频《他在》 _好看视频.mp4"));
//    }
//
//    /**
//     * 获取视频缩略图
//     *
//     * @param filePath：视频路径
//     * @throws Exception
//     */
//    public static String randomGrabberFFmpegVideoImage(String filePath) throws Exception {
//        String targetFilePath = "";
//        FFmpegFrameGrabber ff = FFmpegFrameGrabber.createDefault(filePath);
//        ff.start();
//        //判断是否是竖屏小视频
//        String rotate = ff.getVideoMetadata("rotate");
//        int ffLength = ff.getLengthInFrames();
//        Frame f;
//        int i = 0;
//        int index = 3;//截取图片第几帧
//        while (i < ffLength) {
//            f = ff.grabImage();
//            if (i == index) {
//                if (null != rotate && rotate.length() > 1) {
//                    targetFilePath = doExecuteFrame(f, true);   //获取缩略图
//                } else {
//                    targetFilePath = doExecuteFrame(f, false);   //获取缩略图
//                }
//                break;
//            }
//            i++;
//        }
//        ff.stop();
//        return targetFilePath;  //返回的是视频第N帧
//    }
//
//    /**
//     * 截取缩略图，存入阿里云OSS（按自己的上传类型自定义转换文件格式）
//     *
//     * @param f
//     * @return
//     * @throws Exception
//     */
//    public static String doExecuteFrame(Frame f, boolean bool) throws Exception {
//        if (null == f || null == f.image) {
//            return "";
//        }
//        Java2DFrameConverter converter = new Java2DFrameConverter();
//        BufferedImage bi = converter.getBufferedImage(f);
//        if (bool == true) {
//            Image image = (Image) bi;
//            bi = rotate(image, 90);//图片旋转90度
//        }
//        ByteArrayOutputStream os = new ByteArrayOutputStream();
//        ImageIO.write(bi, "jpg", os);
//        InputStream input = new ByteArrayInputStream(os.toByteArray());
//        String url = OssUtil.getFileUrl(input, "temp.jpg");
//        return url;
//    }
//
//    /**
//     * 图片旋转角度
//     *
//     * @param src   源图片
//     * @param angel 角度
//     * @return 目标图片
//     */
//    public static BufferedImage rotate(Image src, int angel) {
//        int src_width = src.getWidth(null);
//        int src_height = src.getHeight(null);
//        // calculate the new image size
//        Rectangle rect_des = CalcRotatedSize(new Rectangle(new Dimension(
//                src_width, src_height)), angel);
//
//        BufferedImage res = null;
//        res = new BufferedImage(rect_des.width, rect_des.height,
//                BufferedImage.TYPE_INT_RGB);
//        Graphics2D g2 = res.createGraphics();
//        // transform(这里先平移、再旋转比较方便处理；绘图时会采用这些变化，绘图默认从画布的左上顶点开始绘画，源图片的左上顶点与画布左上顶点对齐，然后开始绘画，修改坐标原点后，绘画对应的画布起始点改变，起到平移的效果；然后旋转图片即可)
//
//        //平移（原理修改坐标系原点，绘图起点变了，起到了平移的效果，如果作用于旋转，则为旋转中心点）
//        g2.translate((rect_des.width - src_width) / 2, (rect_des.height - src_height) / 2);
//
//
//        //旋转（原理transalte(dx,dy)->rotate(radians)->transalte(-dx,-dy);修改坐标系原点后，旋转90度，然后再还原坐标系原点为(0,0),但是整个坐标系已经旋转了相应的度数 ）
//        g2.rotate(Math.toRadians(angel), src_width / 2, src_height / 2);
//
////        //先旋转（以目标区域中心点为旋转中心点，源图片左上顶点对准目标区域中心点，然后旋转）
////        g2.translate(rect_des.width/2,rect_des.height/ 2);
////        g2.rotate(Math.toRadians(angel));
////        //再平移（原点恢复到源图的左上顶点处（现在的右上顶点处），否则只能画出1/4）
////        g2.translate(-src_width/2,-src_height/2);
//
//
//        g2.drawImage(src, null, null);
//        return res;
//    }
//
//    /**
//     * 计算转换后目标矩形的宽高
//     *
//     * @param src   源矩形
//     * @param angel 角度
//     * @return 目标矩形
//     */
//    private static Rectangle CalcRotatedSize(Rectangle src, int angel) {
//        double cos = Math.abs(Math.cos(Math.toRadians(angel)));
//        double sin = Math.abs(Math.sin(Math.toRadians(angel)));
//        int des_width = (int) (src.width * cos) + (int) (src.height * sin);
//        int des_height = (int) (src.height * cos) + (int) (src.width * sin);
//        return new java.awt.Rectangle(new Dimension(des_width, des_height));
//    }
//
//    public static String getSprite(String filePath) throws Exception {
//        FFmpegFrameGrabber ff = FFmpegFrameGrabber.createDefault(filePath);
//        ff.start();
//        //判断是否是竖屏小视频
//        String rotate = ff.getVideoMetadata("rotate");
//        int ffLength = ff.getLengthInFrames();
//        if (ffLength < 50) {
//            throw new RuntimeException("视频过短！");
//        }
//        int interval = ffLength / 50;
//        Frame f;
//        int i = 0;
//        int cnt = 0;
//
//        BufferedImage[][] images = new BufferedImage[5][10];
//
//        while (i < ffLength && cnt < 50) {
//            f = ff.grabImage();
//            if ((i % interval) == 0) {
////                if (null != rotate && rotate.length() > 1) {
////                    targetFilePath = doExecuteFrame(f, true);   //获取缩略图
////                } else {
//                System.out.println("i: " + (i / 10) + "-j: " + (i % 10));
//                images[i / 10 / interval][(i / interval) % 10] = ImageIO.read(doExecuteFrameCompress(f));   //获取缩略图
//                cnt++;
////                }
//            }
//            i++;
//        }
//        ff.stop();
//
//        BufferedImage[] temp = new BufferedImage[5];
//        for (int j = 0; j < 5; j++) {
//            temp[j] = mergeImage(true, images[j]);
//        }
//        BufferedImage res = null;
//        res = mergeImage(false, temp);
//
//        ByteArrayOutputStream os = new ByteArrayOutputStream();
//        ImageIO.write(res, "jpg", os);
//        InputStream input = new ByteArrayInputStream(os.toByteArray());
//        String targetFilePath = OssUtil.getFileUrl(input, "temp.jpg");
//
//        return targetFilePath;  //返回的是视频第N帧
//    }
//
//    public static InputStream doExecuteFrameCompress(Frame f) throws Exception {
//
//        Java2DFrameConverter converter = new Java2DFrameConverter();
//        BufferedImage bi = converter.getBufferedImage(f);
//        ByteArrayOutputStream os = new ByteArrayOutputStream();
//        ImageIO.write(bi, "jpg", os);
//        InputStream input = new ByteArrayInputStream(os.toByteArray());
//
//        ByteArrayOutputStream ou = new ByteArrayOutputStream();
//        Thumbnails.of(input).size(160, 90).keepAspectRatio(false).toOutputStream(ou);
//
//        return new ByteArrayInputStream(ou.toByteArray());
//    }
//
//    /**
//     * 合并任数量的图片成一张图片
//     *
//     * @param isHorizontal
//     *            true代表水平合并，fasle代表垂直合并
//     * @param imgs
//     *            待合并的图片数组
//     * @return
//     * @throws IOException
//     */
//    private static BufferedImage mergeImage(boolean isHorizontal, BufferedImage... imgs) throws IOException {
//        // 生成新图片
//        BufferedImage destImage = null;
//        // 计算新图片的长和高
//        int allw = 0, allh = 0, allwMax = 0, allhMax = 0;
//        // 获取总长、总宽、最长、最宽
//        for (int i = 0; i < imgs.length; i++) {
//            BufferedImage img = imgs[i];
//            allw += img.getWidth();
//            allh += img.getHeight();
//            if (img.getWidth() > allwMax) {
//                allwMax = img.getWidth();
//            }
//            if (img.getHeight() > allhMax) {
//                allhMax = img.getHeight();
//            }
//        }
//        // 创建新图片
//        if (isHorizontal) {
//            destImage = new BufferedImage(allw, allhMax, BufferedImage.TYPE_INT_RGB);
//        } else {
//            destImage = new BufferedImage(allwMax, allh, BufferedImage.TYPE_INT_RGB);
//        }
//        // 合并所有子图片到新图片
//        int wx = 0, wy = 0;
//        for (int i = 0; i < imgs.length; i++) {
//            BufferedImage img = imgs[i];
//            int w1 = img.getWidth();
//            int h1 = img.getHeight();
//            // 从图片中读取RGB
//            int[] ImageArrayOne = new int[w1 * h1];
//            ImageArrayOne = img.getRGB(0, 0, w1, h1, ImageArrayOne, 0, w1); // 逐行扫描图像中各个像素的RGB到数组中
//            if (isHorizontal) { // 水平方向合并
//                destImage.setRGB(wx, 0, w1, h1, ImageArrayOne, 0, w1); // 设置上半部分或左半部分的RGB
//            } else { // 垂直方向合并
//                destImage.setRGB(0, wy, w1, h1, ImageArrayOne, 0, w1); // 设置上半部分或左半部分的RGB
//            }
//            wx += w1;
//            wy += h1;
//        }
//        return destImage;
//    }
//}