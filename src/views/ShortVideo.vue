<template>
  <div id="content">
    <p>短视频列表</p>
    <button id="add" @click="showMenu()">添加视频</button>
    <div id="list">
      <div id="windows" v-for="(item, index) in list.records" :key="index">
        <div id="videowindow">
          <img :src="item.posterUrl" alt="" />
          <div id="info">
            <div id="tags">
              <div id="tag" v-for="(i, j) in item.tags" :key="j">{{ i }}</div>
            </div>
            <div id="time">{{ item.updateTime }}</div>
            <div id="operate" @click="showOpMenu(item.id)">
              <img src="../assets/operate.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="updatevideo" v-if="updateStatu">
      <div id="updatemenu">
        <p>选择视频文件（可不选）：<input type="file" id="name" @change="uploadVideo($event)"/></p>
        <br />
        <p>头像（可不选）：<input type="file" ref="avatar" id="pushName" @change="uploadAvatar()"/></p>
        <br />
        <p>
          发布者昵称：<input
            type="text"
            v-model="updatelist.authorName"
            id="isLive"
          />
        </p>
        <br />
        <p>描述：<input type="text" v-model="updatelist.description" /></p>
        <p>标签：<input type="text" v-model="updatelist.tag" /></p>
        <p>封面图（可不选）：<input type="file" ref="poster" @change="uploadPoster()"/></p>
        <input type="button" id="addLive" value="提交" @click="updateVideo()" />
        <div id="closemenu" @click="backOp()">⬅</div>
      </div>
    </div>
    <div id="addVideo" v-if="createStatus">
      <div id="addmenu">
        <p>
          选择视频文件：<input
            type="file"
            accept="video/mp4"
            id="video"
            @change="getVideo($event)"
          />
        </p>
        <p>
          头像：<input
            type="file"
            id="avatar"
            accept="image/*"
            ref="Imgfile"
            @change="uploadImage()"
          />
        </p>
        <br />
        <p>
          发布者昵称：<input
            type="text"
            v-model="addlist.info.authorName"
            id="pushName"
          />
        </p>
        <br />
        <p>
          描述：<input
            type="text"
            v-model="addlist.info.description"
            id="isLive"
          />
        </p>
        <br />
        <p>标签：<input type="text" v-model="addlist.info.tag" /></p>

        <input type="button" id="submit" value="提交" @click="addVideo()" />
        <div id="closemenu" @click="showMenu()">X</div>
      </div>
    </div>
    <div id="operateVideo" v-if="operateStatus">
      <div id="operatemenu">
        <input type="button" value="修改视频信息" @click="updateMenu()" />
        <input type="button" value="删除短视频" @click="deleteVideo()" />
        <div id="closemenu" @click="back()">X</div>
      </div>
    </div>
    <div id="pages">
      <div id="left" @click="pagecut"><</div>
      <div id="page">{{ page }}</div>
      <div id="right" @click="pageadd">></div>
    </div>
  </div>
</template>

<script>
let baseurl = "http://bytedancecamp.rooftopj.cn:8080/back/";
export default {
  name: "ShortVideo",
  data() {
    return {
      list: null,
      addlist: {
        file: null,
        info: {
          authorAvatar: null,
          authorName: null,
          description: null,
          tag: null,
        },
      },
      updatelist: {
        authorAvatar: null,
        authorName: null,
        description: null,
        posterUrl: null,
        tag: null,
        thumbnailUrl: null,
        url: null,
      },
      videoId: 0,
      createStatus: 0,
      operateStatus: 0,
      updateStatu: 0,
      uploadImgStatu: 0,
      uploadVideoStatu: 0,
      page: 1,
      s1: 0,
      s2: 0,
      s3: 0
    };
  },
  methods: {
    getVideo(e) {
      this.addlist.file = e.target.files[0];
    },
    pagecut() {
      if (this.page > 1) {
        this.page--;
        this.getVideoList();
      }
      console.log(this.page);
    },
    pageadd() {
      if (this.page * 10 < this.list.total) {
        this.page++;
        this.getVideoList();
      }
      console.log(this.page);
    },
    showMenu() {
      if (this.createStatus == 1) {
        this.createStatus = 0;
      } else {
        this.createStatus = 1;
      }
    },
    showOpMenu(id) {
      this.operateStatus = 1;
      this.videoId = id;
    },
    back() {
      this.operateStatus = 0;
      this.videoId = 0;
    },
    updateMenu() {
      this.updateStatu = 1;
      this.getVideoInfo();
    },
    backOp() {
      this.updateStatu = 0;
    },
    addVideo() {
      let list = this.addlist.info;
      if (
        list.authorName != null &&
        list.description != null &&
        list.tag != null
      ) {
        if (this.uploadImgStatu == 0 || this.addlist.file == null) {
          alert("文件正在上传中，请稍等");
        } else {
          document.getElementById("submit").value =
            "请求添加视频中，请稍后......";
          let formData = new FormData();
          formData.append("file", this.addlist.file);
          formData.append("authorAvatar", list.authorAvatar);
          formData.append("authorName", list.authorName);
          formData.append("description", list.description);
          formData.append("tag", list.tag);
          this.$axios
            .post(baseurl + "addVideo", formData, {
              "Content-Type": "multipart/form-data",
            })
            .then((res) => {
              console.log(res);
              this.createStatus = 0;
            })
            .catch((err) => {
              console.log(err);
            })
            .finally((fin) => {
              this.getVideoList();
              this.list.file = null;
              list.authorAvatar = null;
              list.authorName = null;
              list.description = null;
              list.tag = null;
              this.uploadImgStatu = 0;
              this.createStatus = 0;
            });
        }
      } else {
        alert("请输入完整信息！");
        console.log(this.addlist);
      }
    },
    getVideoInfo() {
      this.$axios
        .get(baseurl + "getVideo/" + this.videoId)
        .then((res) => {
          let list = res.data.data.record;
          console.log(res);
          this.updatelist.authorAvatar = list.authorAvatar;
          this.updatelist.posterUrl = list.posterUrl;
          this.updatelist.thumbnailUrl = list.thumbnailUrl;
          this.updatelist.url = list.url;
          this.updatelist.authorName = list.authorName;
          this.updatelist.tag = list.tag;
          this.updatelist.description = list.description;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((fin) => {});
    },
    updateVideo() {
      if(this.s1==0&&this.s2==0&&this.s3==0){
        this.$axios
        .post(
          baseurl + "updateVideo/" + this.videoId,
          {
            authorAvatar: this.updatelist.authorAvatar,
            authorName: this.updatelist.authorName,
            description: this.updatelist.description,
            posterUrl: this.updatelist.posterUrl,
            tag: this.updatelist.tag,
            thumbnailUrl: this.updatelist.thumbnailUrl,
            url: this.updatelist.url,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          this.getVideoList();
          console.log(res);
          console.log(this.updatelist);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((fin) => {
          this.updatelist = {
            authorAvatar: null,
            authorName: null,
            description: null,
            posterUrl: null,
            tag: null,
            thumbnailUrl: null,
            url: null,
          };
          this.updateStatu = 0;
        });
      }else{
        alert("文件仍在上传中！请稍后");
      }
    },
    deleteVideo() {
      this.$axios
        .get(baseurl + "deleteVideo/" + this.videoId)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((fin) => {
          this.back();
          this.getVideoList();
        });
    },
    getVideoList() {
      this.$axios
        .get(baseurl + "listVideos/" + this.page)
        .then((response) => {
          this.list = response.data.data;
          let dataArr = this.list.records;
          for (let i = 0; i < dataArr.length; i++) {
            let splitArr = dataArr[i].updateTime.split(":");
            dataArr[i].updateTime = splitArr[0] + ":" + splitArr[1];
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    uploadImage() {
      let formData = new FormData();
      formData.append("file", this.$refs.Imgfile.files[0]);
      this.$axios
        .post(baseurl + "uploadImage", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          this.addlist.authorAvatar = res.data.data.url;
          this.uploadImgStatu = 1;
        })
        .catch((error) => {
          console.log(error);
          alert("图片上传失败！请再次上传！");
        })
        .finally((fin) => {});
    },
    uploadVideo(e) {
      this.s1 = 1;
      formData.append("file", e.target.files[0]);
      this.$axios
        .post(baseurl + "uploadImage", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          
          this.updatelist.url = res.data.data.url;
        })
        .catch((error) => {
          console.log(error);
          alert("视频上传失败！请再次上传！");
        })
        .finally((fin) => {
          this.s1 = 0;
        });
    },
    uploadAvatar(){
      this.s2 = 1;
      let formData = new FormData();
      formData.append("file", this.$refs.avatar.files[0]);
      this.$axios
        .post(baseurl + "uploadImage", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          this.updatelist.authorAvatar = res.data.data.url;
        })
        .catch((error) => {
          console.log(error);
          alert("头像上传失败！请再次上传！");
        })
        .finally((fin) => {
          this.s2 = 0;
        });
    },
    uploadPoster(){
      this.s3 = 1;
      let formData = new FormData();
      formData.append("file", this.$refs.poster.files[0]);
      this.$axios
        .post(baseurl + "uploadImage", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          this.updatelist.authorAvatar = res.data.data.url;
          console.log("yes");
        })
        .catch((error) => {
          console.log(error);
          alert("封面上传失败！请再次上传！");
        })
        .finally((fin) => {
          this.s3 = 0;
        });
    }
  },
  mounted() {
    this.getVideoList();
  },
};
</script>

<style lang="scss">
#content {
  width: 95%;
  min-width: 1100px;
  background-color: #fff;
  height: 80%;
  min-height: 550px;
  margin: auto;
  padding: 10px 28px 0 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  p {
    text-align: left;
    font-weight: bold;
    color: #2c3e50;
  }
  button {
    background-color: #4c74ee;
    color: white;
    width: 100px;
    border: none;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border-radius: 5px;
  }
  #list {
    width: 100%;
    height: 75%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    #windows {
      width: 18%;
      height: 40%;
      margin-right: 2%;
      flex-wrap: wrap;
      #videowindow {
        width: 100%;
        height: 100%;
        position: relative;
        border: #e6e8eb 1px solid;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        #info {
          box-sizing: border-box;
          padding: 5px 0px;
          width: 100%;
          position: absolute;
          bottom: 0px;
          height: 33%;
          background-color: white;
          text-align: left;
          border-top: #e6e8eb solid 1px;
          font-size: 15px;
          #tags {
            padding-left: 20px;
            padding-bottom: 5px;
            color: white;
            font-size: 12px;
            display: flex;
            #tag {
              width: 45px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              margin-right: 10px;
              border-radius: 5px;
              background-color: #e56048;
            }
          }
          #time {
            padding-left: 20px;
            color: #636a76;
          }
          #operate {
            position: absolute;
            right: 10px;
            bottom: 15px;
            cursor: pointer;
            width: 10%;
            height: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 50%;
              max-height: 50%;
            }
          }
        }
      }
    }
  }
  #updatevideo {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-width: 1000px;
    min-height: 550px;
    z-index: 3;
    #updatemenu {
      width: 30%;
      height: 70%;
      background: #dee1e6;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 20px;
      border-radius: 10px;
      position: relative;
      #addLive {
        border: none;
        background: #4c74ee;
        height: 40px;
        border-radius: 10px;
        cursor: pointer;
      }
      #closemenu {
        position: absolute;
        left: 10px;
        top: 10px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  }
  #addVideo {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-width: 1000px;
    min-height: 550px;
    z-index: 2;
    #addmenu {
      width: 30%;
      height: 60%;
      background: #dee1e6;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 20px;
      border-radius: 10px;
      position: relative;
      #submit {
        border: none;
        background: #4c74ee;
        height: 40px;
        border-radius: 10px;
        cursor: pointer;
      }
      #closemenu {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  }
  #pages {
    position: absolute;
    bottom: 10px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    #right,
    #left {
      cursor: pointer;
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
    #page {
      width: 40px;
      height: 40px;
      background-color: #ecf3fd;
      color: #466fee;
      line-height: 40px;
    }
  }
  #operateVideo {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-direction: column;
    min-width: 1000px;
    min-height: 550px;
    #operatemenu {
      width: 30%;
      height: 70%;
      background: #dee1e6;
      display: flex;
      justify-content: space-around;
      align-items: center;
      align-content: center;
      flex-direction: column;
      padding: 20px;
      border-radius: 10px;
      position: relative;
      input {
        width: 40%;
        height: 10%;
        background-color: #4c74ee;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        border: none;
      }
      #closemenu {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  }
}
</style>