import React, { createElement, useContext, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Comment, Tooltip, Avatar, Input, Button } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  UpCircleFilled,
  UpCircleOutlined,
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
    <div
      className="comment-input"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Input
        size="large"
        allowClear={true}
        placeholder={"留下你精彩的评论吧"}
        onChange={(e) => {
          // setValue(value);
          value = e.target.value;
          // console.log(value);
        }}
        // style={{ height: "90%", width: "70%", marginRight: "10%" }}
        style={{ marginRight: "10%" }}
      ></Input>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<UpCircleOutlined />}
        onClick={onClick}
      />
    </div>
  );
}
