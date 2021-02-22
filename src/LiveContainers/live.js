import axios from 'axios';
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';

// import Swiper from "swiper";
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

// import "../dist/css/swiper.css";
// import 'swiper/swiper.scss';
// import 'swiper/swiper.scss';
// import Swiper from "../dist/js/swiper.js";
// import "../../dist/css/swiper.min.css"

class Live extends Component {
    constructor(props) {
        super(props);

        this.state = {
                // sign : 'a82d0d5e-9c55-4186-b443-c891f1221995114135149123114135149123'

        }
    }

    getVideoJson () {
        
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.props.sign
        axios.get(url)
            .then( (res) => {
                console.log(res)
                // console.log(res.data.data.video.id)
            })
    }

    componentWillMount() {
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {
                console.log(res)
                if(res.data.code === 203) {
                    // alert("请登录")
                    // this.props.history.push('/login');
                }
            })
    }

    componentDidMount(){
        var mySwiper = new Swiper ('.swiper-container', {
            
            direction: 'vertical', // 垂直切换选项

            on: {
                // touchStart: function(swiper,event){
                //   alert('事件触发了;');
                // },
                touchMove: function(swiper, event){
                    // alert('上下拉');
                    // alert(mySwiper.width);
                    var i = mySwiper.translate;
                    setTimeout(function() {
                        var z = mySwiper.translate;
                        // alert("z.mySwiper.translate = ");
                        
                        if (z>i) {
                            // alert('下拉');
                            // console.log('下拉');
                        }else{
                            // alert('上滑');
                            // console.log('上滑');
                            
                        }
                    },0.001);
                  },

                touchEnd: function(swiper, event) {
                    console.log("onTouchEnd");
                    var _viewHeight = document.getElementsByClassName('swiper-wrapper').offsetHeight;
                    var _contentHeight = document.getElementsByClassName('swiper-slide').offsetHeight;
                    // 上拉加载

                    console.log("mySwiper.translate = ");
                    console.log(mySwiper.translate);

                    if(mySwiper.translate > 0) {
                        console.log("下拉");
                    }else if(mySwiper.translate < 0){
                        console.log("上滑");
                    }
                    return false;
                },
            },
        })

    }


    render() {
        return (
            <Fragment>
                <div>
                    Live
                    {this.getVideoJson()}
                    <br></br>

                    <div className="swiper-container"
                        style={
                            {height: 350}
                        }
                    >
                    {/* <div className="swiper-container"> */}
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">Slide 1</div>
                            <div className="swiper-slide">Slide 2</div>
                            <div className="swiper-slide">Slide 3</div>
                        </div>

                    </div>
                    <Link to='/'>
                        <button >返回点播</button>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default Live;
