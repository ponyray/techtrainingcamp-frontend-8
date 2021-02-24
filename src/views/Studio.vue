<template>
  <div id="content">
    <p>直播列表</p>
    <button id="add" @click="showMenu()">新建直播</button>
    <div id="list">
      <div id="room" v-for="(item, index) in info.records" :key="index">
        <div id="liveroom">
          <img :src="item.coverUrl" alt="" />
          <div id="status" v-if="item.isLive">直播中</div>
          <div id="status" v-if="!item.isLive">未开播</div>
          <div id="info">
            <div id="title">{{ item.name }}</div>
            <div id="time">{{ item.updateTime }}</div>
            <div id="operate" @click.self="showOpMenu(item.id)">
              <img src="../assets/operate.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="updateLive" v-if="updateStatu">
      <div id="updatemenu">
        <p>
          直播间标题：<input type="text" v-model="liveFrontVO.name" id="name" />
        </p>
        <br />
        <p>
          发布者昵称：<input
            type="text"
            v-model="liveFrontVO.pushName"
            id="pushName"
          />
        </p>
        <br />
        <p>
          是否开启直播：<input
            type="checkbox"
            v-model="liveFrontVO.isLive"
            id="isLive"
          />
        </p>
        <br />
        <p>
          选择封面图片：<input
            type="file"
            accept="image/*"
            ref="file"
            @change="uploadImage()"
          />
        </p>
        <input type="button" id="addLive" value="提交" @click="updateLive()" />
        <div id="closemenu" @click="back()">⬅</div>
      </div>
    </div>
    <div id="createLive" v-if="createStatus">
      <div id="createmenu">
        <p>
          直播间标题：<input type="text" v-model="liveFrontVO.name" id="name" />
        </p>
        <br />
        <p>
          发布者昵称：<input
            type="text"
            v-model="liveFrontVO.pushName"
            id="pushName"
          />
        </p>
        <br />
        <p>
          是否开启直播：<input
            type="checkbox"
            v-model="liveFrontVO.isLive"
            id="isLive"
          />
        </p>
        <br />
        <p>
          选择封面图片：<input
            type="file"
            accept="image/*"
            ref="file"
            @change="uploadImage()"
          />
        </p>
        <input type="button" id="addLive" value="提交" @click="addLive()" />
        <div id="closemenu" @click="showMenu()">X</div>
      </div>
    </div>
    <div id="pages">
      <div id="left" @click="pagecut"><</div>
      <div id="page">{{ page }}</div>
      <div id="right" @click="pageadd">></div>
    </div>
    <div id="operateLive" v-if="operateStatus">
      <div id="operatemenu">
        <input type="button" value="修改直播间信息" @click="showUpdate()" />
        <input type="button" value="开/关直播" @click="OCLive()" />
        <input type="button" value="删除直播间" @click="deleteLive()" />
        <div id="closemenu" @click="closeOpMenu()">X</div>
      </div>
    </div>
  </div>
</template>

<script>
let baseurl = "http://bytedancecamp.rooftopj.cn:8080/back/";
export default {
  name: "Studio",
  data() {
    return {
      info: null,
      page: 1,
      rqpage: 1,
      liveId: 0,
      liveFrontVO: {
        coverUrl: null,
        isLive: 0,
        name: null,
        pushName: null,
      },
      uploadStatu: 0,
      createStatus: 0,
      operateStatus: 0,
      updateStatu: 0,
    };
  },
  methods: {
    showMenu() {
      if (this.createStatus == 1) {
        this.createStatus = 0;
      } else {
        this.createStatus = 1;
      }
      this.coverUrl = null;
      this.isLive = 0;
      this.name = null;
      this.pushName = null;
    },
    showOpMenu(id) {
      if (this.operateStatus == 1) {
        this.operateStatus = 0;
      } else {
        this.operateStatus = 1;
      }
      this.liveId = id;
      console.log(this.liveId);
    },
    closeOpMenu() {
      this.liveId = 0;
      if (this.operateStatus == 1) {
        this.operateStatus = 0;
      } else {
        this.operateStatus = 1;
      }
      console.log(this.liveId);
    },
    showUpdate() {
      this.updateStatu = 1;
    },
    back() {
      this.updateStatu = 0;
      this.coverUrl = null;
      this.isLive = 0;
      this.name = null;
      this.pushName = null;
    },
    getLiveList() {
      this.$axios
        .get(baseurl + "listLives/" + this.rqpage)
        .then((response) => {
          let dataArr = response.data.data.records;
          if (dataArr.length > 0) {
            this.info = response.data.data;
            console.log(this.info);
            for (let i = 0; i < dataArr.length; i++) {
              let splitArr = dataArr[i].updateTime.split(":");
              dataArr[i].updateTime = splitArr[0] + ":" + splitArr[1];
            }
            if (this.rqpage > this.page) {
              this.page++;
            } else {
              if(this.page!=1){
                this.page--;
              }
            }
            console.log(this.page, this.rqpage, 3);
          } else {
            if (this.rqpage != this.page) {
              this.rqpage = this.page;
            }
            console.log(this.page, this.rqpage, 4);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    pagecut() {
      if (this.rqpage > 1) {
        this.rqpage--;
        this.getLiveList();
      }
      console.log(this.page, this.rqpage, 0);
    },
    pageadd() {
      this.rqpage++;
      this.getLiveList();
      console.log(this.page, this.rqpage, 1);
    },
    addLive() {
      if (this.liveFrontVO.name != null && this.liveFrontVO.pushName != null) {
        if (this.uploadStatu == 0) {
          alert("图片正在上传中，请稍等");
        } else {
          if (this.liveFrontVO.isLive == true) {
            this.liveFrontVO.isLive = 1;
          } else {
            this.liveFrontVO.isLive = 0;
          }
          this.$axios
            .post(
              baseurl + "addLive",
              {
                coverUrl: this.liveFrontVO.coverUrl,
                isLive: this.liveFrontVO.isLive,
                name: this.liveFrontVO.name,
                pushName: this.liveFrontVO.pushName,
              },
              {
                "Content-Type": "application/json",
              }
            )
            .then((res) => {
              console.log(res);
              this.createStatus = 0;
              this.getLiveList();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally((fin) => {
              this.coverUrl = null;
              this.isLive = 0;
              this.name = null;
              this.pushName = null;
              this.uploadStatu = 0;
            });
        }
      } else {
        alert("请填写完整信息！");
      }
    },
    updateLive() {
      if (this.liveFrontVO.name != null && this.liveFrontVO.pushName != null) {
        if (this.uploadStatu == 0) {
          alert("图片正在上传中，请稍等");
        } else {
          if (this.liveFrontVO.isLive == true) {
            this.liveFrontVO.isLive = 1;
          } else {
            this.liveFrontVO.isLive = 0;
          }
          this.$axios
            .post(baseurl + "updateLive/" + this.liveId, {
              coverUrl: this.liveFrontVO.coverUrl,
              isLive: this.liveFrontVO.isLive,
              name: this.liveFrontVO.name,
              pushName: this.liveFrontVO.pushName,
            })
            .then((res) => {
              console.log(res);
              this.updateStatu = 0;
              this.getLiveList();
              this.operateStatus = 0;
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.coverUrl = null;
              this.isLive = 0;
              this.name = null;
              this.pushName = null;
              this.uploadStatu = 0;
            });
        }
      } else {
        alert("请填写完整信息！");
      }
    },
    OCLive() {
      this.$axios.get(baseurl + "changeStatus/" + this.liveId).then((res) => {
        console.log(res);
        this.closeOpMenu();
        this.getLiveList();
      });
    },
    deleteLive() {
      this.$axios.get(baseurl + "deleteLive/" + this.liveId).then((res) => {
        console.log(res);
        this.closeOpMenu();
        this.getLiveList();
      });
    },
    uploadImage() {
      let formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      this.$axios
        .post(baseurl + "uploadImage", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          this.liveFrontVO.coverUrl = res.data.data.url;
          this.uploadStatu = 1;
        })
        .catch((error) => {
          console.log(error);
          alert("图片上传失败！请再次上传！");
        })
        .finally((fin) => {});
    }
  },
  mounted() {
    this.getLiveList();
  },
  computed: {},
};
</script>

<style lang="scss">
#content {
  width: 95%;
  min-width: 1000px;
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
    #room {
      width: 18%;
      height: 40%;
      margin-right: 2%;
      flex-wrap: wrap;
      #liveroom {
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
        #status {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: #78c2c4;
          color: white;
          padding: 5px 8px;
          border-radius: 5px;
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
          #title {
            padding-left: 20px;
            padding-bottom: 5px;
            font-weight: 600;
            color: #2a2f36;
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
  #createLive {
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
    #createmenu {
      width: 30%;
      height: 50%;
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
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  }
  #updateLive {
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
      height: 50%;
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
  #operateLive {
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
      height: 50%;
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