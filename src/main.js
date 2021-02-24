import React, { Component, Fragment } from 'react';

import axios from 'axios';
import Swiper from 'swiper/bundle';

import LiveEntrance from './MainContainers/header/liveEntrance';
import SideMenu from './MainContainers/sideMenu/sideMenu';
import VideoInstruction from './MainContainers/videoInstruction/videoInstruction';

import './style.css';
import { Link } from 'react-router-dom';

import { getLastVideoAPI, getNextVideoAPI } from "./data-access/api/main";
import { UserContext } from "./context";

import icon_avatar from './img/favicon2.png';


class Main extends Component {

    constructor(props) {
        super(props);

        this.setSign = this.setSign.bind(this);
        this.changeLike = this.changeLike.bind(this);
        this.getNextVideo = this.getNextVideo.bind(this);
        this.getLastVideo = this.getLastVideo.bind(this);

        this.state = {
            sign: '', 
            videoInstruction : "这是一个视频简介。",
            id: 0,
            authorAvatar: {icon_avatar},
            author: "你好,这里是Group8",
            url: "",
            description: "Hi!!!",
            tagList: ["helloworld"],
            likes: 999,
            comments: 999,
            isLike: 0,
            play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
        }
    }

    setSign(sign) {
        console.log("set sign = " + sign);
        this.setState({
            sign
        })
        console.log("this.state.sign = " + this.state.sign);
    }

    getLastVideo() {
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/lastVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {

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
                                authorAvatar: res.data.data.video.authorAvatar,
                            }
                        })
                        
                    }

                }
            })
    }

    getNextVideo(){
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {

                switch (res.data.code) {
                    case 203 : {
                        alert("请登录")
                        this.props.history.push('/');
                        break;
                    }
                    default : {                   
        
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
                                authorAvatar: res.data.data.video.authorAvatar,
                            }
                        })

                    }
                }
            })
    }

    changeLike(flag) {
        if(flag === 1 ) {
            this.setState({
                likes: this.state.likes + 1,
                isLike: 1,
            })
        }else {
            this.setState({
                likes: this.state.likes - 1,
                isLike: 0,
            })
        }
    }

    componentDidMount() {
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {

                switch (res.data.code) {
                    case 203 : {
                        alert("请登录")
                        this.props.history.push('/');
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
                        authorAvatar: res.data.data.video.authorAvatar,
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
                        console.log("mySwiper.translate = " + mySwiper.translate);
                    }

                    return false;
                },
            },
        })

    }



    render() {
        return (

            <UserContext.Consumer>
                {({ sign, setSign, username, setUsername }) => (
                    <Fragment>

                        <div className='header'>
                            <div className='liveEntrance'>
                                <LiveEntrance sign={sign} username={username} /></div>
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
                                    sign = {sign}
                                    setSign = {this.setSign}
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
                                        authorAvatarPath = {this.state.authorAvatar}
                                        isLike = {this.state.isLike}
                                        changeLikeFunc={this.changeLike}
                                />
                            </div>
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" id="mse">
                                        <video 
                                            className='video' 
                                            id='playWindow' 
                                            autoplay="autoplay" 
                                            loop="loop" 
                                            src={this.state.play_url } 
                                            controls
                                        >                                    
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
             </UserContext.Consumer>
        )
    }
}

export default Main;