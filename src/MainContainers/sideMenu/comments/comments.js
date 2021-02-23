import React, { createElement, useEffect, useState } from "react";
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
import CommentHeader from "./comment-header";
import CommentList from "./comment-list";
import CommentInput from "./comment-input";
import { transform } from "typescript";
import styled from "styled-components";
import { Drawer } from "antd";

export default function Comments({ videoId, closeComments }) {
  const CommentsWrapper = styled.div`
    border-radius: 5% 5% 0% 0%;
    background-color: red;
  `;
  return (
    <Drawer
      placement="bottom"
      closable={true}
      visible={this.state.isCommentsOpen}
      onClose={closeComments}
      height="70%"
      header={() => (
        <CommentHeader
          videoId={videoId}
        ></CommentHeader>
      )}
      footer={() => <CommentInput videoId={videoId}></CommentInput>}
    >
      <Comments
        videoId={videoId}
        closeComments={closeComments}
      ></Comments>
    </Drawer>
    // <CommentsWrapper>
    //   <CommentHeader
    //     videoId={videoId}
    //     closeComments={closeComments}
    //   ></CommentHeader>
    //   <CommentList videoId={videoId}></CommentList>
    //   <CommentInput videoId={videoId}></CommentInput>
    // </CommentsWrapper>
  );
}
