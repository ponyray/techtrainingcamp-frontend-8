import request from "../request";

export function likeAPI(sign, videoId) {
  // console.log(request);
  return request({
    method: "get",
    url: `/video/like/${videoId}/${sign}`,
  });
}

export function getCommentsAPI(videoId, curPage) {
  return request({
    method: "get",
    url: `/video/getComments/${videoId}/${curPage}`,
  });
}
export function postCommentAPI(sign, videoId, content) {
  return request({
    method: "post",
    url: "/video/comment",
    data: {
        sign: sign,
        videoId: videoId,
        comment: content
    },
  });
}
