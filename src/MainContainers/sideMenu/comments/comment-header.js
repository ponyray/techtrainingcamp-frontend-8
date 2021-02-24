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
import styled from "styled-components";

export default function CommentHeader({ videoId }) {
  const [commentNum, setCommentNum] = useState(null);

  getCommentsAPI(videoId, 1).then((resData) => {
    setCommentNum(resData.total);
    console.log(`commentNum = ${commentNum}`);
  });

  const CommentHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const CommentHeaderContainer = styled.span`
    font-weight: bold;
  `;
  return (
    <CommentHeaderWrapper>
      <CommentHeaderContainer>{commentNum} 条评论</CommentHeaderContainer>
      {/* <button onClick={closeComments}>close</button> */}
    </CommentHeaderWrapper>
  );
}
