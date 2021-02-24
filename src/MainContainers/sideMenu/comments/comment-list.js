import React from "react";
// import 'antd/dist/antd.css';
import { List, message, Avatar, Spin } from "antd";

import { getCommentsAPI } from "../../../data-access/api/video-comment";
import InfiniteScroll from "react-infinite-scroller";
import CommentItem from "./comment-item";
import styled from "styled-components";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

class CommentList extends React.Component {
  state = {
    data: [],
    pageIndex: 1,
    totalCommentsNum: -1,
    loading: false,
    hasMore: true,
  };

  componentDidMount() {
    console.log(`videoId = ${this.props.videoId}`);
    console.log(`pageIndex = ${this.state.pageIndex}`);
    getCommentsAPI(this.props.videoId, this.state.pageIndex).then((resData) => {
      this.setState({
        data: resData.comments,
        pageIndex: this.state.pageIndex + 1,
        totalCommentsNum: resData.total,
      });
      console.log("resData = ");
      console.log(resData);
      console.log(this.state.data);
      console.log(this.state.totalCommentsNum);
    });
  }

  handleInfiniteOnLoad = () => {
    if (this.state.hasMore === false) {
      return
    }
    console.log("infinite-----");
    let { data, pageIndex, totalCommentsNum } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length >= totalCommentsNum) {
      console.log(`no more ${data.length}`);
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }

    getCommentsAPI(this.props.videoId, pageIndex).then((resData) => {
      data = data.concat(resData.comments);
      console.log(data);
      this.setState({
        data,
        loading: false,
        pageIndex: pageIndex + 1,
      });
    });
    console.log(totalCommentsNum)
  };

  render() {
    const InfiniteContainer = styled.div`
      height: 100%;
      padding: 8px 24px;
      overflow: auto;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
    `;
    return (
      <InfiniteContainer>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
          loader={<Spin />}
        >
          <List
            dataSource={this.state.data}
            renderItem={(item) => {
              // console.log("item = ");
              // console.log(item);
              return (
                <List.Item key={item.id}>
                  <CommentItem comment={item}></CommentItem>
                </List.Item>
              );
            }}
            bordered
            style={{ height: "100%" }}
          >
            {/* {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )} */}
          </List>
        </InfiniteScroll>
      </InfiniteContainer>
    );
  }
}

export default CommentList;
