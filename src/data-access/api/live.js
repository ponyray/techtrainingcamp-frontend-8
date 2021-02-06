import axios from 'axios';
import request from '../request'

export function getNextVideoAPI(sign) {
  // console.log(request);
  return request({
    method: 'get',
    url: `/video/getNewVideo/${sign}`,
  })
}