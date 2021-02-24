import React, { createElement, useContext, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Comment, Tooltip, Avatar, Input } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { postCommentAPI } from "../../../data-access/api/video-comment";
import { UserContext } from "../../../context";

export default function CommentInput({ videoId }) {
  // const [value, setValue] = useState(null);
  let { sign } = useContext(UserContext);
  let value = "";
  let onClick = () => {
    postCommentAPI(sign, videoId, value);
  };
  return (
    <div className="comment-input">
      <Input
        allowClear={true}
        placeholder={"留下你精彩的评论吧"}
        onChange={(e) => {
          // setValue(value);
          value = e.target.value;
          // console.log(value);
        }}
      ></Input>
      <button onClick={onClick}>13213212</button>
    </div>
  );
}
