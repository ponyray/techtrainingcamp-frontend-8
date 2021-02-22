
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'xgplayer';
import HlsPlayer from 'xgplayer-hls'
import './style.css'
import Livecomments from './comments/liveComments'


class Live extends Component {

    state = {
        liveNum: 111,
    }
    componentDidMount() {
        let player = new HlsPlayer({
            id: 'liveplay',
            url: 'http://bytedancecamp.rooftopj.cn/hls/hello.m3u8',
            isLive: true,
            autoplay: true,
            playsinline: true,
            height: window.innerHeight,
            width: window.innerWidth,
            controls: false
        })
    }
    render() {
        console.log("渲染了一次")
        const { liveNum } = this.state
        const { userName } = this.props.location.state
        return (
            <Fragment>
                <div>
                    <div className="header">
                        <img className="headerLeft" src="./header-left.png" />
                    </div>
                    <div id="liveplay" />
                    <Livecomments userName={userName} liveNum={liveNum} />
                    <Link to='/' >
                        <img className="exit-btn" src="./exit.png" alt="退出" />
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default Live;
