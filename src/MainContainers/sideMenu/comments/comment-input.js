import React, { createElement, useState } from "react";
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

export default function CommentInput() {
  return (
    <div className="comment-input">
      <Input allowClear={true} placeholder={"留下你精彩的评论吧"}></Input>
    </div>
  );
}
