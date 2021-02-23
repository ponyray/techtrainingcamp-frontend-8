import React, { ReactDOM } from "react";
import { ListView } from "antd-mobile";
import CommentItem from "./comment-item";
import { getCommentsAPI } from "../../../data-access/api/video-comment";
import CommentHeader from "./comment-header";

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

let pageIndex = 1;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];

let commentsNum = -1;

function getComments(videoId, pIndex = 0) {
  console.log(pageIndex);
  pIndex--;
  const sectionName = `Page ${pIndex}`;
  sectionIDs.push(sectionName);
  dataBlobs[sectionName] = sectionName;
  rowIDs[pIndex] = [];

  return getCommentsAPI(videoId, pIndex).then((resData) => {
    commentsNum = resData.total;
    resData.comments.forEach((element, index) => {
      const rowName = `Page ${pIndex} Comment ${index}`;
      rowIDs[pIndex].push(rowName);
      dataBlobs[rowName] = element;
    });
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
  });
}

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      hasMore: true,
      height: (document.documentElement.clientHeight * 3) / 4,
    };

    this.loadData = this.loadData.bind(this)
    this.loadNextPage = this.loadNextPage.bind(this)
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    // simulate initial Ajax

    console.log(`pageIndex = ${pageIndex}`);
    if (pageIndex === 1) {
      this.loadNextPage();
    }
    this.loadData(dataBlobs, sectionIDs, rowIDs);
  }

  loadData (dataBlobs, sectionIDs, rowIDs) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        dataBlobs,
        sectionIDs,
        rowIDs
      ),
      isLoading: false,
    });
  };

  loadNextPage () {
    this.setState({ isLoading: true });
    console.log("start loading");
    getComments(this.props.videoId, pageIndex++).then(() => {
      this.loadData(dataBlobs, sectionIDs, rowIDs);

      console.log("loading finished");

      if ((pageIndex - 1) * 10 >= commentsNum) {
        this.setState({
          hasMore: false,
        });
      }
    });
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }

    this.loadNextPage();
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      // console.log(rowData);
      // console.log(sectionID);
      // console.log(rowID);

      return <CommentItem key={rowID} comment={rowData}></CommentItem>;
    };

    return (
      <ListView
        ref={(el) => (this.lv = el)}
        style={{
          height: "500px",
          overflow: "auto",
        }}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: "center" }}>
            {this.state.isLoading ? "Loading..." : "Loaded"}
          </div>
        )}
        renderBodyComponent={() => <MyBody />}
        renderRow={row}
        renderSeparator={separator}
        pageSize={12}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={300}
      />
    );
  }
}
