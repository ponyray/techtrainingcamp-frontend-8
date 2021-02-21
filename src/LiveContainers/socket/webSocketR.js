import React, { Component } from 'react'

export default class WebSocketR extends Component {
    constructor(props) {
        super(props);
        this.props.ws.onopen = this.onOpen.bind(this);//绑定的是R
        this.props.ws.onclose = this.onClose.bind(this);
        this.props.ws.onmessage = this.onMessage.bind(this);
        this.props.ws.onerror = this.onError.bind(this);
    }
    onOpen(evt) {
        // console.log(this)
        this.props.ws.send(JSON.stringify({
             type: 0,
             msg: {
                 sendName: this.props.userName,
                 msg: "进入直播间",
                 liveNum: 111
             }
         }))
         console.log("open",this.props.userName)
     }
     onClose(evt) {
         console.log("Disconnected");
     }
     onMessage(evt) {
        //  console.log(1)
         console.log('Retrieved data from server: ' + evt.data);
         let now = JSON.parse(evt.data)
         if (now.type === 1){//如果type为1需要把一些东西放在content对象里
            this.props.commentUpdate(now)
         } else if (now.type === 0) {//{"msg":{"liveNum":111,"msg":"进入直播间","sendName":"孙悟空"},"type":0}
            console.log("aaaaaaa")
         } else if (now.type === 4) {
             console.log("tiaotiao")
             this.props.bubbleUpdate()
         }
     }
     onError(evt) {
         console.log('Error occured: ' + evt.data);
     }
    render() {
        return (
            <div >
                
            </div>
        )
    }
}
