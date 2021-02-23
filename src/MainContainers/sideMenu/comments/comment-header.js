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
import { getCommentsAPI } from "../../../data-access/api/video-comment";

export default function CommentHeader({ videoId }) {
  const [commentNum, setCommentNum] = useState(null);

  getCommentsAPI(videoId, 1).then((resData) => {
    setCommentNum(resData.total);
    console.log(`commentNum = ${commentNum}`);
  });
  return (
    <div className="comment-header">
      <div>
        <span>{commentNum}</span>
      </div>
      {/* <button onClick={closeComments}>close</button> */}
    </div>
  );
}
