import React, { createElement, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

export default function CommentItem({ comment }) {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);
  const [liked, setLiked] = useState(false);

  const like = () => {
    setLikes(1);
    setAction("liked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={comment.username}
      content={<p>{comment.comment}</p>}
      datetime={
        <Tooltip title={comment.updateTime}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
}
