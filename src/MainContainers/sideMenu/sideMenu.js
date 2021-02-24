import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./style.css";

import { Drawer } from "antd";
import icon_avatar from "./img/avatar.png";
import icon_islike from "./img/islike.png";
import icon_dislike from "./img/dislike.png";
import icon_comment from "./img/comment.png";
import icon_repost from "./img/repost.png";
import CommentHeader from "./comments/comment-header";
import CommentList from "./comments/comment-list";
import CommentInput from "./comments/comment-input";

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.getIconLikePath = this.getIconLikePath.bind(this);
    this.changeLike = this.changeLike.bind(this);

    this.state = {
      id: 0,
      sign: "",
      likes: 0,
      comment: 0,
      repost: 0,
      isLike: 0,
      iconLikePath: "",
      isCommentsOpen: false,
    };
  }

  getIconLikePath() {
    console.log(this.state.isLike);
    if (this.state.isLike === 1) {
      return <img src={icon_islike} alt="" className="icon"></img>;
    } else {
      return <img src={icon_dislike} alt="" className="icon"></img>;
    }
  }

  changeLike() {
    var url =
      "http://bytedancecamp.rooftopj.cn:8080/video/like/" +
      this.props.id +
      "/" +
      this.props.sign;
    axios.get(url).then((res) => {
      console.log(res);
      console.log(res.data.code);
      console.log("res.data.data.flag = " + res.data.data.flag);
      if (res.data.code === 203) {
        // alert("请登录")
        // this.props.history.push('/login');
        <a href="/login"></a>;
      }

      var tlikes = this.state.likes;
      if (res.data.data.flag) {
        tlikes += 1;
      } else {
        tlikes -= 1;
      }

      this.setState({
        isLike: res.data.data.flag,
        likes: tlikes,
      });
    });
    if (this.state.isLike === 1) {
      console.log("点赞");
      return <img src={icon_islike} alt="" className="icon"></img>;
    } else {
      console.log("取消点赞");
      return <img src={icon_dislike} alt="" className="icon"></img>;
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      sign: this.props.sign,
      likes: this.props.likes,
      comments: this.props.comments,
      repost: this.props.repost,
      isLike: this.props.isLike,
    });
  }
  setIsCommentsOpen = (newVal) => () => {
    console.log(newVal);
    this.setState({
      isCommentsOpen: newVal,
    });
  };
  render() {
    return (
      <Fragment>
        <div>
          <div className="sideMenus" id="avatar">
            <img src={icon_avatar} alt="" className="icon"></img>
          </div>
          <div className="sideMenus" id="like" onClick={this.changeLike}>
            {this.getIconLikePath()}
            {console.log("isLike = " + this.state.isLike)}
            <div id="Num">{this.state.likes}</div>
            {console.log("likes = " + this.state.likes)}
          </div>

          <div className="sideMenus" id="comment">
            <img
              src={icon_comment}
              alt=""
              className="icon"
              onClick={this.setIsCommentsOpen(true)}
            ></img>
            <div id="Num">{this.state.comments}</div>
          </div>
          <div className="sideMenus" id="repost">
            <img src={icon_repost} alt="" className="icon"></img>
            <div id="Num">{this.state.repost}</div>
          </div>
        </div>{" "}
        <div>
          <Drawer
            placement="bottom"
            closable={true}
            visible={this.state.isCommentsOpen}
            onClose={this.setIsCommentsOpen(false)}
            getContainer={false}
            height="70%"
            title={<CommentHeader videoId={this.props.id}></CommentHeader>}
            footer={<CommentInput videoId={this.props.id}></CommentInput>}
            destroyOnClose={true}
            // mask={false}
            style={{zIndex: 2000}}
          >
            <CommentList videoId={this.props.id}></CommentList>
          </Drawer>
        </div>
      </Fragment>
    );
  }
}

export default SideMenu;
