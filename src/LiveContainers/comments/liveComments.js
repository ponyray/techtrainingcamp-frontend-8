import React, { Component } from 'react'
import WebSocketR from '../socket/webSocketR'
import { debounce, isScrollBottom } from './utils'
// import '../pic/flutter-hearts-zmt'
import './style.css';

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
        const { msg } = this.state.content
        let newcontent = {
            type: 1,
            msg: {
                sendName: msg.sendName,
                msg: target.value,
                liveNum: msg.liveNum
            }
        }
        this.state.ws.send(JSON.stringify(newcontent))
        console.log(newcontent)
        target.value = ''
    }
    like = (event) => {
        const { msg } = this.state.content
        let newcontent = {
            type: 4,
            msg: {
                sendName: msg.sendName,
                msg: "点赞",
                liveNum: msg.liveNum
            }
        }
        this.state.ws.send(JSON.stringify(newcontent))
        console.log(newcontent)

    }

    componentDidMount() {
        let marui = ! function (t, e) {
            // "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : 
            t.BubbleHearts = e()
            console.log(t)
        }(window, function () {
            "use strict";
            function t(t, n, r) {
                var i = e.uniformDiscrete(89, 91) / 100,
                    o = 1 - i,
                    u = (e.uniformDiscrete(45, 60) + e.uniformDiscrete(45, 60)) / 100,
                    a = function (t) {
                        return t > i ? Math.max(((1 - t) / o).toFixed(2), .1) * u : u
                    },
                    c = e.uniformDiscrete(-30, 30),
                    f = function (t) {
                        return c
                    },
                    h = 10,
                    s = n.width / 2 + e.uniformDiscrete(-h, h),
                    d = (n.width - Math.sqrt(Math.pow(t.width, 2) + Math.pow(t.height, 2))) / 2 - h,
                    l = e.uniformDiscrete(.8 * d, d) * (e.uniformDiscrete(0, 1) ? 1 : -1),
                    m = e.uniformDiscrete(250, 400),
                    w = function (t) {
                        return t > i ? s : s + l * Math.sin(m * (i - t) * Math.PI / 180)
                    },
                    v = function (e) {
                        return t.height / 2 + (n.height - t.height / 2) * e
                    },
                    p = e.uniformDiscrete(14, 18) / 100,
                    g = function (t) {
                        return t > p ? 1 : 1 - ((p - t) / p).toFixed(2)
                    };
                return function (e) {
                    if (!(e >= 0)) return !0;
                    r.save();
                    var n = a(e),
                        i = f(e),
                        o = w(e),
                        u = v(e);
                    r.translate(o, u)
                    r.scale(n, n)
                    r.rotate(i * Math.PI / 180)
                    r.globalAlpha = g(e)
                    r.drawImage(t, -t.width / 2, -t.height / 2, t.width, t.height)
                    r.restore()
                }
            }
            var e = function (t) {
                var e = t,
                    n = Math.floor,
                    r = Math.random;
                return t.uniform = function (t, e) {
                    return t + (e - t) * r()
                }, t.uniformDiscrete = function (t, r) {
                    return t + n((r - t + 1) * e.uniform(0, 1))
                }, t
            }({}),
                n = function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                },
                r = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            let a = (r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                            )
                        }
                    }
                    return function (e, n, r) {
                        return n && t(e.prototype, n), r && t(e, r), e
                    }
                }(),
                i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
                    return setTimeout(t, 16)
                },
                o = function () {
                    function o() {
                        n(this, o);
                        var t = this.canvas = document.createElement("canvas"),
                            e = this.context = t.getContext("2d"),
                            r = this._children = [],
                            u = function n() {
                                i(n)
                                e.clearRect(0, 0, t.width, t.height);
                                for (var o = 0, u = r.length; o < u;) {
                                    var a = r[o];
                                    let b = (a.render.call(null, (a.timestamp + a.duration - new Date) / a.duration) ? (r.splice(o, 1), u--) : o++
                                    )
                                }
                            };
                        i(u)
                    }
                    return r(o, [{
                        key: "bubble",
                        value: function (n) {
                            console.log("1111", this)
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.uniformDiscrete(2400, 3600),
                                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t(n, this.canvas, this.context);
                            return this._children.push({
                                render: i,
                                duration: r,
                                timestamp: +new Date
                            }), this
                        }
                    }]), o
                }();
            return o
        });


        // 图片地址在此处更换  可换成你的图片
        var assets = [
            './1.png',
            './2.png',
            './3.png',
            './4.png',
            './5.png',
        ];
        assets.forEach(function (src, index) {
            assets[index] = new Promise(function (resolve) {
                var img = new Image;
                img.onload = resolve.bind(null, img);
                img.src = src;
            });
        });

        Promise.all(assets).then(function (images) {

            var random = {
                uniform: function (min, max) {
                    return min + (max - min) * Math.random();
                },
                uniformDiscrete: function (i, j) {
                    return i + Math.floor((j - i + 1) * random.uniform(0, 1));
                },
            };
            var stage = new window.BubbleHearts();
            var canvas = stage.canvas;
            canvas.width = 170;
            canvas.height = 300;
            canvas.style['width'] = '170px';
            canvas.style['height'] = '300px';
            document.body.appendChild(canvas);
            //journal-reward 为赏桃的按钮 
            document.getElementsByClassName('journal-reward')[0].addEventListener('click', function () {
                //随机飘动

                stage.bubble(images[random.uniformDiscrete(0, images.length - 1)]);
            }, false);

        });
        const { userName } = this.state
        const { type, msg } = this.state.content
        this.setState({
            content: {
                type: 1,
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
    bubbleUpdate = () => {
        console.log("点赞更新")
        let marui = ! function (t, e) {
            t.BubbleHearts = e()
            console.log(t)
        }(window, function () {
            "use strict";
            function t(t, n, r) {
                var i = e.uniformDiscrete(89, 91) / 100,
                    o = 1 - i,
                    u = (e.uniformDiscrete(45, 60) + e.uniformDiscrete(45, 60)) / 100,
                    a = function (t) {
                        return t > i ? Math.max(((1 - t) / o).toFixed(2), .1) * u : u
                    },
                    c = e.uniformDiscrete(-30, 30),
                    f = function (t) {
                        return c
                    },
                    h = 10,
                    s = n.width / 2 + e.uniformDiscrete(-h, h),
                    d = (n.width - Math.sqrt(Math.pow(t.width, 2) + Math.pow(t.height, 2))) / 2 - h,
                    l = e.uniformDiscrete(.8 * d, d) * (e.uniformDiscrete(0, 1) ? 1 : -1),
                    m = e.uniformDiscrete(250, 400),
                    w = function (t) {
                        return t > i ? s : s + l * Math.sin(m * (i - t) * Math.PI / 180)
                    },
                    v = function (e) {
                        return t.height / 2 + (n.height - t.height / 2) * e
                    },
                    p = e.uniformDiscrete(14, 18) / 100,
                    g = function (t) {
                        return t > p ? 1 : 1 - ((p - t) / p).toFixed(2)
                    };
                return function (e) {
                    if (!(e >= 0)) return !0;
                    r.save();
                    var n = a(e),
                        i = f(e),
                        o = w(e),
                        u = v(e);
                    r.translate(o, u)
                    r.scale(n, n)
                    r.rotate(i * Math.PI / 180)
                    r.globalAlpha = g(e)
                    r.drawImage(t, -t.width / 2, -t.height / 2, t.width, t.height)
                    r.restore()
                }
            }
            var e = function (t) {
                var e = t,
                    n = Math.floor,
                    r = Math.random;
                return t.uniform = function (t, e) {
                    return t + (e - t) * r()
                }, t.uniformDiscrete = function (t, r) {
                    return t + n((r - t + 1) * e.uniform(0, 1))
                }, t
            }({}),
                n = function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                },
                r = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            let a = (r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                            )
                        }
                    }
                    return function (e, n, r) {
                        return n && t(e.prototype, n), r && t(e, r), e
                    }
                }(),
                i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
                    return setTimeout(t, 16)
                },
                o = function () {
                    function o() {
                        n(this, o);
                        var t = this.canvas = document.createElement("canvas"),
                            e = this.context = t.getContext("2d"),
                            r = this._children = [],
                            u = function n() {
                                i(n)
                                e.clearRect(0, 0, t.width, t.height);
                                for (var o = 0, u = r.length; o < u;) {
                                    var a = r[o];
                                    let b = (a.render.call(null, (a.timestamp + a.duration - new Date) / a.duration) ? (r.splice(o, 1), u--) : o++
                                    )
                                }
                            };
                        i(u)
                    }
                    return r(o, [{
                        key: "bubble",
                        value: function (n) {
                            console.log("1111", this)
                            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.uniformDiscrete(2400, 3600),
                                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t(n, this.canvas, this.context);
                            return this._children.push({
                                render: i,
                                duration: r,
                                timestamp: +new Date
                            }), this
                        }
                    }]), o
                }();
            return o
        });


        // 图片地址在此处更换  可换成你的图片
        var assets = [
            './1.png',
            './2.png',
            './3.png',
            './4.png',
            './5.png',
        ];
        assets.forEach(function (src, index) {
            assets[index] = new Promise(function (resolve) {
                var img = new Image;
                img.onload = resolve.bind(null, img);
                img.src = src;
            });
        });

        Promise.all(assets).then(function (images) {

            var random = {
                uniform: function (min, max) {
                    return min + (max - min) * Math.random();
                },
                uniformDiscrete: function (i, j) {
                    return i + Math.floor((j - i + 1) * random.uniform(0, 1));
                },
            };
            var stage = new window.BubbleHearts();
            var canvas = stage.canvas;
            canvas.width = 170;
            canvas.height = 300;
            canvas.style['width'] = '170px';
            canvas.style['height'] = '300px';
            document.body.appendChild(canvas);
            //journal-reward 为赏桃的按钮 
            stage.bubble(images[random.uniformDiscrete(0, images.length - 1)]);
        });

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
            <div>
                <div className="comment">
                    <WebSocketR commentUpdate={this.commentUpdate} bubbleUpdate={this.bubbleUpdate}{...this.state} />
                    <div className="comment-wrap" >
                        <ul className="list" >
                            {
                                this.state.comment.map((commentObj, index) => {
                                    return <li key={index}>
                                        <span style={{ color: 'aqua', fontSize: '20px' }}>{commentObj.msg.sendName} : </span>
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
                <img src="./footer.png" className="footer" /><img src="./like.png" className="journal-reward" onClick={this.like} />
                
            </div>


        )
    }
}

