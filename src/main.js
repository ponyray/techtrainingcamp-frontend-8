import React, { Component, Fragment } from "react";
import Player from "griffith";
import { Motion, spring } from "react-motion";
// import Player from 'xgplayer';
import axios from "axios";
import styled from "styled-components";

import LiveEntrance from "./MainContainers/header/liveEntrance";
// import Search from './MainContainers/header/search';
// import PlayWindow from './MainContainers/playWindow/playWindow';
import SideMenu from "./MainContainers/sideMenu/sideMenu";
import VideoInstruction from "./MainContainers/videoInstruction/videoInstruction";

import "./style.css";
import { Link } from "react-router-dom";

import { getLastVideoAPI, getNextVideoAPI } from "./data-access/api/main";
import { postCommentAPI } from "./data-access/api/video-comment";
import { UserContext } from "./context";
import { transform } from "typescript";
// let player = new Player({
//     id: 'vs',
//     url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
//   });

class Main extends Component {
  constructor(props) {
    super(props);

    this.getNextVideo = this.getNextVideo.bind(this);
    this.getLastVideo = this.getLastVideo.bind(this);

    this.state = {
      videoInstruction: "这是一个视频简介。",
      id: 1,
      author: "字节君",
      url: "x×.xx.xx/video / 1.mp4",
      description: "字节跳动8周年,不忘初心,Always Day1",
      tagList: ["一个普通公司的8年"],
      likes: 2,
      comments: 3,
      isLike: 0,

      sources: {
        sd: {
          // play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
          // play_url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
          // play_url: 'https://bytedancecamptiktok.oss-cn-hangzhou.aliyuncs.com/2021/02/01/5d196a71a5b1465a90b2e1842a35deb2%E7%AB%96%E7%89%88%E8%A7%86%E9%A2%91%E5%90%88%E9%9B%86.mp4'
          play_url:
            "https://bytedancecamptiktok.oss-cn-hangzhou.aliyuncs.com/2021/02/01/2e0c1a02037c418aa5f476ccfeff26a2竖版小视频飞机拍摄.mp4",
          // play_url : "123"
          // play_url: "123456"
        },
      },
    };
  }

  // getVideoInfo(){
  // }

  getLastVideo(sign) {
    // alert('正在获取上一个视频')

    getLastVideoAPI(sign)
      .then((data) => {
        console.log(data.video.id);
        console.log(data.video.url);

        console.log("url改变之前的url为");
        console.log(this.state.sources.sd.play_url);

        this.setState(() => {
          return {
            id: data.video.id,
            author: data.video.authorName,
            description: data.video.description,
            tagList: data.video.tags,
            likes: data.video.likeNum,
            isLike: data.video.isLike,
            comments: data.video.commentNum,
            sources: {
              sd: {
                play_url: data.video.url,
              },
            },
          };
        });
        console.log("url改变完成");
        console.log(this.state.sources.sd.play_url);
      })
      .catch((err) => console.log(err));
  }

  getNextVideo(sign) {
    getNextVideoAPI(sign)
      .then((data) => {
        console.log(data);

        this.setState(() => {
          return {
            id: data.video.id,
            author: data.video.authorName,
            description: data.video.description,
            tagList: data.video.tags,
            likes: data.video.likeNum,
            isLike: data.video.isLike,
            comments: data.video.commentNum,
            sources: {
              sd: {
                play_url: data.video.url,
              },
            },
          };
        });
        console.log("url改变完成");
        console.log(this.state.sources.sd.play_url);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const MainContainer = styled.div`
      /* display: flex; */
    `;

    const PlayerWrapper = styled.div`
      height: ${window.innerHeight}px;
      width: ${window.innerWidth}px;
      /* overflow: hidden; */
    `;

    const SidebarWrapper = styled.div`
      /* margin-top: auto; */
      position: absolute;
      width: 48px;
      height: 300px;
      right: 10px;
      bottom: 30px;
      z-index: 1000;
    `;

    const FooterWrapper = styled.div`
      position: absolute;
      bottom: 30px;
      width: 100vw;
      z-index: 10;
    `;

    return (
      <UserContext.Consumer>
        {({ sign, setSign, username, setUsername }) => (
          <Fragment>
            <MainContainer>
              <div className="header">
                <div className="liveEntrance">
                  <LiveEntrance sign={sign} username={username} />
                </div>
                <div className="notice">
                  <p className="text">关注</p>
                </div>
                <div className="getVideo">
                  <button
                    className="btn"
                    id="getLastVideo"
                    onClick={() => this.getLastVideo(sign)}
                  >
                    上
                  </button>
                  <button
                    className="btn"
                    id="getNextVideo"
                    onClick={() => this.getNextVideo(sign)}
                  >
                    下
                  </button>
                </div>
              </div>
              <PlayerWrapper>
                {console.log("视频加载开始")}
                <video
                  id="playWindow"
                  src={this.state.sources.sd.play_url}
                  controls
                ></video>
                {console.log("视频加载结束")}
                {/* <div className='play'>
                        {console.log('视频加载开始')}
                        <Player sources={this.state.sources} />
                        <video id='playWindow' src={this.state.sources.sd.play_url} controls></video>
                        {console.log('视频加载结束')}
                    </div> */}
              </PlayerWrapper>
              <SidebarWrapper>
                <SideMenu
                  id={this.state.id}
                  sign={sign}
                  likes={this.state.likes}
                  comments={this.state.comments}
                  repost={1235}
                  isLike={this.state.isLike}
                />
              </SidebarWrapper>
              <FooterWrapper>
                <VideoInstruction
                  author={this.state.author}
                  description={this.state.description}
                  tagList={this.state.tagList}
                />
              </FooterWrapper>
            </MainContainer>
          </Fragment>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Main;
