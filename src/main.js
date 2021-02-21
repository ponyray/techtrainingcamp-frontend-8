import React, { Component, Fragment } from 'react';
import Player from 'griffith';
// import Player from 'xgplayer';
import axios from 'axios';

import LiveEntrance from './MainContainers/header/liveEntrance';
// import Search from './MainContainers/header/search';
// import PlayWindow from './MainContainers/playWindow/playWindow';
import SideMenu from './MainContainers/sideMenu/sideMenu';
import VideoInstruction from './MainContainers/videoInstruction/videoInstruction';

import './style.css';
import { Link } from 'react-router-dom';

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
            sign: '90f47aab-181d-447a-835a-4430bf27f14c11185932311118593231',
            videoInstruction : "这是一个视频简介。",
            id: 1,
            author: "字节君",
            url: "x×.xx.xx/video / 1.mp4",
            description: "字节跳动8周年,不忘初心,Always Day1",
            tagList: ["一个普通公司的8年"],
            likes: 2,
            comments: 3,
            isLike: 0,
            userName:"游客",//新增

            sources : {
                sd: {
                // play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
                // play_url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
                // play_url: 'https://bytedancecamptiktok.oss-cn-hangzhou.aliyuncs.com/2021/02/01/5d196a71a5b1465a90b2e1842a35deb2%E7%AB%96%E7%89%88%E8%A7%86%E9%A2%91%E5%90%88%E9%9B%86.mp4'
                play_url: 'https://bytedancecamptiktok.oss-cn-hangzhou.aliyuncs.com/2021/02/01/2e0c1a02037c418aa5f476ccfeff26a2竖版小视频飞机拍摄.mp4'
                // play_url : "123"
                // play_url: "123456"
                },
            }
        }
    }
    
    // getVideoInfo(){
    // }

    getLastVideo() {
        // alert('正在获取上一个视频')
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/lastVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {
                console.log(res)

                console.log(res.data.code)

                switch (res.data.code) {
                    case 203: {
                        alert("请登录")
                        this.props.history.push('/login');
                        break;
                    }
                    case 202: {
                        alert(res.data.message);
                        break;
                    }
                    default : {
                        console.log(res.data.data.video.id)
                        console.log(res.data.data.video.url)
                        
                        console.log("url改变之前的url为")
                        console.log(this.state.sources.sd.play_url)                    
        
                        this.setState( () => {
                            return {
                                id: res.data.data.video.id,
                                author: res.data.data.video.authorName,
                                description: res.data.data.video.description,
                                tagList: res.data.data.video.tags,
                                likes: res.data.data.video.likeNum,
                                isLike: res.data.data.video.isLike,
                                comments: res.data.data.video.commentNum,
                                sources: {
                                    sd: {
                                        play_url: res.data.data.video.url
                                    }
                                }
                            }
                        })                    
                        console.log('url改变完成')
                        console.log(this.state.sources.sd.play_url)
                    }

                }
            })
    }

    getNextVideo(){
        // alert('正在获取下一个视频')
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {
                console.log(res)

                console.log(res.data.code)

                switch (res.data.code) {
                    case 203 : {
                        alert("请登录")
                        this.props.history.push('/login');
                        break;
                    }
                    default : {
                        console.log(res.data.data.video.id)
                        console.log(res.data.data.video.url)
                        
                        console.log("url改变之前的url为")
                        console.log(this.state.sources.sd.play_url)                    
        
                        this.setState( () => {
                            return {
                                id: res.data.data.video.id,
                                author: res.data.data.video.authorName,
                                description: res.data.data.video.description,
                                tagList: res.data.data.video.tags,
                                likes: res.data.data.video.likeNum,
                                isLike: res.data.data.video.isLike,
                                comments: res.data.data.video.commentNum,
                                sources: {
                                    sd: {
                                        play_url: res.data.data.video.url
                                    }
                                }
                            }
                        })                    
                        console.log('url改变完成')
                        console.log(this.state.sources.sd.play_url)
                    }
                }
            })
    }


    componentWillMount() {

        console.log('componentWillMount')
        // console.log(this.state.sources.sd.play_url)

        // var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        // axios.get(url)
        //     .then( (res) => {
        //         console.log(res)
        //         console.log(res.data.data.video.id)

        //         console.log(res.data.data.video.url)
                
        //         console.log("url改变之前的url为")
        //         console.log(this.state.sources.sd.play_url)
                

        //         this.setState( () => {
        //             return {
        //                 Id: res.data.data.video.id,
        //                 author: res.data.data.video.authorName,
        //                 description: res.data.data.video.description,
        //                 tagList: res.data.data.video.tags,
        //                 likes: res.data.data.video.likeNum,
        //                 comments: res.data.data.video.commentNum,
        //                 sources: {
        //                     sd: {
        //                         play_url: res.data.data.video.url
        //             }
        //         }
        //             }
        //         })
                
        //         console.log('url改变完成')
        //         console.log(this.state.sources.sd.play_url)
        //     })
    }

    componentDidMount() {
        // var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        // axios.get(url)
        //     .then( (res) => {
        //         console.log(res)

        //         console.log(res.data.code)

        //         switch (res.data.code) {
        //             case 203 : {
        //                 alert("请登录")
        //                 this.props.history.push('/login');
        //                 break;
        //             }
        //         }
        //     })
    }

    render() {
        return (
            <Fragment>
                <div className='header'>
                    <div className='liveEntrance'>
                        <LiveEntrance sign={this.state.sign} userName={this.state.userName}/></div>
                    <div className='notice'>
                        <p className='text'>关注</p>
                    </div>
                    <div className='getVideo'>
                        <button className='btn' id='getLastVideo' onClick={this.getLastVideo}>上</button>
                        <button className='btn' id='getNextVideo' onClick={this.getNextVideo}>下</button>
                    </div>
                </div>
                <div class='videoPlay' id='vs'>
                    {console.log('视频加载开始')}
                    <video id='playWindow' src={this.state.sources.sd.play_url} controls></video>
                    {console.log('视频加载结束')}
                    {/* <div className='play'>
                        {console.log('视频加载开始')}
                        <Player sources={this.state.sources} />
                        <video id='playWindow' src={this.state.sources.sd.play_url} controls></video>
                        {console.log('视频加载结束')}
                    </div> */}
                    <div className='videoInstruction'>
                        <VideoInstruction 
                            author = {this.state.author}
                            description = {this.state.description}
                            tagList = {this.state.tagList}
                            
                        />
                    </div>
                    <div className='sideMenu'>
                        <SideMenu
                                id = {this.state.id}
                                sign = {this.state.sign}
                                likes = {this.state.likes}
                                comments = {this.state.comments}
                                repost  = {1235}
                                isLike = {this.state.isLike}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Main;