
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
// import Player from 'griffith';
// import Player from 'xgplayer';
import 'xgplayer';
// import HlsPlayer from 'xgplayer-hls'
import FlvPlayer from 'xgplayer-flv';
import './style.css'
import Livecomments from './comments/liveComments'



class Live extends Component {

        state={
            userName:"张恒久",  
            liveNum:111,    
           
        }
    // getVideoJson () { 
    //     var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.props.sign
    //     axios.get(url)
    //         .then( (res) => {
    //             console.log(res)
    //             // console.log(res.data.data.video.id)
    //         })
    // }
        componentDidMount(){
            let player = new FlvPlayer({
                id: 'liveplay',
                url: 'http://tx2play1.douyucdn.cn/live/288016rlols5.flv?uuid=',
                poster: './poster.png',
                isLive: true,
                preloadTime: 30,
                minCachedTime: 5,
                cors: true
              })
            // let player = new HlsPlayer({
            //     id: 'liveplay',
            //     url: 'http://bytedancecamp.rooftopj.cn/hls/marui.m3u8',
            //     isLive: true,
            //     autoplay: true,
            //     playsinline: true,
            //     height: window.innerHeight,
            //     width: window.innerWidth
            // })
            // var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        // axios.get(url)
        //     .then( (res) => {
        //         console.log(res)
        //         if(res.data.code === 203) {
        //             // alert("请登录")
        //             this.props.history.push('/login');
        //         }
        //     })
        }
    render() {
        
        const {userName,liveNum} =this.state
        return (
           
            <Fragment>
                <div>
                  
                    {/* {this.getVideoJson()} */}
                    <div id="liveplay" />

                    <br></br>
                    <Livecomments userName={userName} liveNum={liveNum}/>
                    <Link to='/' >
                        <img className = "exit-btn" src= "./exit.png" alt = "退出"/>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default Live;
