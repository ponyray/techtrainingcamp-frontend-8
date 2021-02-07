import React, { Component } from 'react'
 import smoothscroll from 'smoothscroll-polyfill';
import WebSocketR from '../socket/webSocketR'
import { debounce, isScrollBottom } from './utils'
import './style.css';
smoothscroll.polyfill();
export default class Livecomments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ws: new WebSocket("ws://bytedancecamp.rooftopj.cn:9999/ws"),
            comment: [],
            restComment: 0,
            wrapperHeight: 0,
            userName: this.props.userName,
            content: {
                type: 1,
                msg: {
                    sendName: "",
                    msg: "",
                    liveNum: this.props.liveNum
                }
            }
        }
        this.restNums = 0
        this.isBindScrolled = true
    }
    addComment = (event) => {
        const { keyCode, target } = event
        if (keyCode !== 13) return
        if (target.value.trim() === '') {
            alert('输入不能为空')
            return
        }
        const { type, msg } = this.state.content
        let newcontent = {
            type: type,
            msg: {
                sendName: msg.sendName,
                msg: target.value,
                liveNum: msg.liveNum
            }
        }
        this.state.ws.send(JSON.stringify(newcontent))
        target.value = ''
    }
    componentDidMount() {
        const { userName } = this.state
        const { type, msg } = this.state.content
        this.setState({
            content: {
                type: type,
                msg: {
                    sendName: userName,
                    msg: msg.msg,
                    liveNum: msg.liveNum
                }
            }
        })

    }
    addScroll() {
        debounce(this.listScroll(), 200)
        this.isBindScrolled = true;
    }
    listScroll = () => {
        const wrapperDom = document.querySelector('.comment-wrap')
        const ele = wrapperDom
        const isBottom = isScrollBottom(ele, ele.clientHeight)
        if (isBottom) {
            this.restNums = 0
            this.setState({
                restComment: 0
            })
        }
    }
    commentUpdate = (Obj) => {
        const { comment } = this.state
        if (comment.length >= 150) {
            comment.splice(0, 50);
        }
        this.setState({
            comment: [...comment, Obj]
        })
        this.renderComment()
    }
    renderComment() {
        // console.log(this.state.listDom)
        const listDom = document.querySelector('.list')
        const wrapperDom = document.querySelector('.comment-wrap')
        const wrapperHeight = wrapperDom.offsetHeight
        const listHight = listDom.offsetHeight;
        const diff = listHight - wrapperHeight; // 列表高度与容器高度差值
        const top = wrapperDom.scrollTop; // 列表滚动高度
        if (diff - top < 50) {
            if (diff > 0) {
                if (this.isBindScrolled) {
                    this.isBindScrolled = false;
                    wrapperDom.removeEventListener("scroll", () => { this.addScroll() });
                }
                wrapperDom.scrollTo({
                    top: diff + 10,
                    left: 0,
                    behavior: "smooth"
                });
                this.restNums = 0;
            }
        } else {
            ++this.restNums;
            if (!this.isBindScrolled) {
                this.isBindScrolled = true;
                wrapperDom.addEventListener("scroll", () => { this.addScroll() });
            }
        }
        this.setState({ restComment: this.restNums >= 99 ? '99+' : this.restNums })
    }
    scrollBottom = () => {
        const listDom = document.querySelector('.list')
        const wrapperDom = document.querySelector('.comment-wrap')
        this.restNums = 0; // 清除剩余消息
        wrapperDom.scrollTo({
            top: listDom.offsetHeight,
            left: 0,
            behavior: "smooth"
        });
        this.setState({
            restComment: 0
        })
    }
    render() {
        const { restComment } = this.state
        return (
            <div className="comment">
                <WebSocketR commentUpdate={this.commentUpdate}{...this.state} />
                <div className="comment-wrap" >
                    <ul className="list" >
                        {
                            this.state.comment.map((commentObj, index) => {
                                return <li key={index}>
                                    <span style={{ color: 'aqua', fontSize: '29px' }}>{commentObj.msg.sendName} : </span>
                                    <span style={{ color: 'white' }}>{commentObj.msg.msg}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
                {
                    !!restComment && <div className="rest-nums" onClick={this.scrollBottom}>{restComment}未读</div>}
                <input className="commentinput" onKeyUp={this.addComment} type="text" placeholder="说点什么" />
            </div>

        )
    }
}

