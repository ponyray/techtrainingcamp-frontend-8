import React, { Component, Fragment } from 'react';
import Player from 'xgplayer';
import axios from 'axios';
import Swiper from 'swiper/bundle';

import LiveEntrance from './MainContainers/header/liveEntrance';
import SideMenu from './MainContainers/sideMenu/sideMenu';
import VideoInstruction from './MainContainers/videoInstruction/videoInstruction';

import './style.css';
import { Link } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);

        this.getNextVideo = this.getNextVideo.bind(this);
        this.getLastVideo = this.getLastVideo.bind(this);

        this.state = {
            // sign: '05f79045-1608-4c3d-b4ba-f078e140c7851141351484211413514842',
            sign : '',
            videoInstruction : "这是一个视频简介。",
            id: 1,
            author: "Group8你好",
            url: "",
            description: "Hi!!!",
            tagList: ["helloworld"],
            likes: 1234,
            comments: 5467,
            isLike: 0,
            play_url: 'https://bytedancecamptiktok.oss-cn-hangzhou.aliyuncs.com/2021/02/01/2e0c1a02037c418aa5f476ccfeff26a2竖版小视频飞机拍摄.mp4',
            // play_url: '',
        }
    }

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
                        // console.log(res.data.data.video.id)
                        // console.log(res.data.data.video.url)
                        
                        // console.log("url改变之前的url为")
                        // console.log(this.state.play_url)                    
        
                        this.setState( () => {
                            return {
                                id: res.data.data.video.id,
                                author: res.data.data.video.authorName,
                                description: res.data.data.video.description,
                                tagList: res.data.data.video.tags,
                                likes: res.data.data.video.likeNum,
                                isLike: res.data.data.video.isLike,
                                comments: res.data.data.video.commentNum,
                                play_url: res.data.data.video.url,
                            }
                        })                    
                        // console.log('url改变完成')
                        // console.log(this.state.play_url)
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
                        // console.log(res.data.data.video.id)
                        // console.log(res.data.data.video.url)
                        
                        // console.log("url改变之前的url为")
                        // console.log(this.state.play_url)                    
        
                        this.setState( () => {
                            return {
                                id: res.data.data.video.id,
                                author: res.data.data.video.authorName,
                                description: res.data.data.video.description,
                                tagList: res.data.data.video.tags,
                                likes: res.data.data.video.likeNum,
                                isLike: res.data.data.video.isLike,
                                comments: res.data.data.video.commentNum,
                                play_url: res.data.data.video.url
                            }
                        })
                        // console.log('url改变完成')
                        // console.log(this.state.play_url)
                    }
                }
            })
    }

    componentWillMount() {
        // console.log('componentWillMount')

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
                        // console.log(res.data.data.video.id)
                        // console.log(res.data.data.video.url)
                        
                        // console.log("url改变之前的url为")
                        // console.log(this.state.play_url)                    
        
                        this.setState( () => {
                            return {
                                id: res.data.data.video.id,
                                author: res.data.data.video.authorName,
                                description: res.data.data.video.description,
                                tagList: res.data.data.video.tags,
                                likes: res.data.data.video.likeNum,
                                isLike: res.data.data.video.isLike,
                                comments: res.data.data.video.commentNum,
                                play_url: res.data.data.video.url
                            }
                        })
                        // console.log('url改变完成')
                        // console.log(this.state.play_url)
                    }
                }
                
            })
    }

    componentDidMount() {
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
                }

                this.setState( () => {
                    return {
                        id: res.data.data.video.id,
                        author: res.data.data.video.authorName,
                        description: res.data.data.video.description,
                        tagList: res.data.data.video.tags,
                        likes: res.data.data.video.likeNum,
                        comments: res.data.data.video.commentNum,
                        play_url: res.data.data.video.url,
                    }
                })

            })

        var this_temp = this;
        var mySwiper = new Swiper ('.swiper-container', {
            
            direction: 'vertical', // 垂直切换选项
            on: {
                touchEnd: function(swiper, event) {

                    if(mySwiper.translate > 10) {
                        this_temp.getLastVideo();

                    }else if(mySwiper.translate < -10){
                        this_temp.getNextVideo();
                    }else {
                        console.log("mySwiper.translate = ");
                        console.log(mySwiper.translate);
                    }

                    return false;
                },
            },
        })

    }

    render() {
        return (
            <Fragment>
                <div className='header'>
                    <div className='liveEntrance'>
                        <LiveEntrance sign={this.state.sign} /></div>
                    <div className='notice'>
                        <p className='text'>关注</p>
                    </div>
                    {/* <div className='getVideo'>
                        <button className='btn' id='getLastVideo' onClick={this.getLastVideo}>上</button>
                        <button className='btn' id='getNextVideo' onClick={this.getNextVideo}>下</button>
                    </div> */}
                </div>
                
                <div className='videoPlay' id='vs'>
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
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide" id="mse">
                                <video 
                                    className='video' 
                                    id='playWindow' 
                                    // autoplay="autoplay" 
                                    // loop="loop" 
                                    src={this.state.play_url } 
                                    controls
                                >                                    
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default Main;