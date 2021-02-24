import React, { Component, Fragment } from "react";

import "./style.css";

class VideoInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Id:1,
      author: "字节君",
      description: "字节跳动八周年，不忘初心，Always Day1.",
      tagList: ["#一个普通公司的8年", "#初心", "#使命"],
      likes: 586892,
      comments: 23456,
      date: "2021年2月4日",
    };
  }

  getDate() {}

  showTags() {
    // const TagSign = "#"
    return this.props.tagList.map((value, index) => {
      return <span># {value}</span>;
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="brief" id="firstBrief">
            <div id="author">{"@" + this.props.author}</div>
            <div id="date">
              {this.getDate()}
              {"  · " + this.state.date}
            </div>
          </div>
          <div className="brief" id="description">
            <p class="animate">{this.props.description}</p>
          </div>
          <div className="brief" id="tagList">
            {this.showTags()}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VideoInstruction;
