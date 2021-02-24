<template>
  <div id="content">
    <div id="search">
      <input
        type="text"
        placeholder="请输入所需查询评论的视频ID"
        v-model="videoId"
      />
      <button @click="getComment()">查询</button>
      <button @click="showMenu()">发表新评论</button>
    </div>
    <div id="commentlist">
      <div id="empty" v-if="list.total == null || list.total == 0">
        所查询的视频没有评论！
      </div>
      <div id="comment" v-for="(item, index) in list.comments" :key="index">
        <div id="username">{{ item.username }}:</div>
        <div id="text">{{ item.comment }}</div>
        <div id="delete" @click="deleteComment(item.id)">删除</div>
      </div>
    </div>
    <div id="cpages" v-if="list.total != 0 && list.total != undefined">
      <div id="left" @click="pagecut()"><</div>
      <div id="page">{{ page }}</div>
      <div id="right" @click="pageadd()">></div>
    </div>
    <div id="addmenu" v-if="addStatus">
      <div id="menu">
        <p>评论视频ID：<input type="text" v-model="commentVideoId" /></p>
        <p>昵称：<input type="text" v-model="name" /></p>
        <p>评论内容：<input type="text" v-model="comment" /></p>
				<input type="button" value="提交" @click="addComment()">
        <div id="closemenu" @click="showMenu()">X</div>
      </div>
    </div>
  </div>
</template>

<script>
let baseurl = "http://bytedancecamp.rooftopj.cn:8080/back/";
export default {
  name: "Comment",
  data() {
    return {
      list: {},
      commentId: 0,
      videoId: null,
      page: 1,
      comment: null,
      commentVideoId: null,
      name: null,
      addStatus: 0,
    };
  },
  methods: {
    pagecut() {
      if (this.page > 1) {
        this.page--;
      }
      this.getComment();
    },
    pageadd() {
      if (this.page * 10 < this.list.total) {
        this.page++;
      }
      this.getComment();
    },
    showMenu() {
      if (this.addStatus == 0) {
        this.addStatus = 1;
      } else {
        this.addStatus = 0;
        this.comment = null;
        (this.commentVideoId = null), (this.name = null);
      }
    },
		addComment(){
			this.$axios
			.post(baseurl + "comment",{
				comment: this.comment,
				name: this.name,
				videoId: this.commentVideoId
			})
			.then((res) =>{
				console.log(res);
				this.getComment();
			})
			.catch((err) =>{
				console.log(err);
				alert("发表失败！请重新发表！");
			})
			.finally((fin) =>{
				this.addStatus = 0;
			})
		},
    deleteComment(id) {
      this.$axios
        .get(baseurl + "deleteComment/" + id)
        .then((res) => {
          console.log(res);
          this.getComment();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((fin) => {});
    },
    getComment() {
      this.$axios
        .get(baseurl + "getComments/" + this.videoId + "/" + this.page)
        .then((res) => {
          console.log(res);
          this.list = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((fin) => {});
    },
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
  position: relative;
  align-content: center;

  #search {
    padding: 20px;
    display: flex;
    justify-content: center;
    input {
      width: 40%;
      height: 30px;
      margin-right: 20px;
    }
    button {
      height: 30px;
      margin-right: 20px;
    }
  }
  #commentlist {
    width: 90%;
    height: 80%;
    margin: auto;
    #comment {
      height: 8%;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #fed2d1;
      border-radius: 5px;
      margin-bottom: 5px;
      position: relative;
      #username {
        margin-left: 10px;
        color: #a6a6a6;
        margin-right: 10px;
      }
      #delete {
        position: absolute;
        right: 20px;
        height: 60%;
        width: 50px;
        border-radius: 5px;
        background: #ff6275;
        cursor: pointer;
      }
    }
  }
  #cpages {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    position: initial;
    margin-bottom: 20px;
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
      background-color: #fed2d1;
      color: #ff6275;
      line-height: 40px;
    }
  }
	#addmenu{
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
		#menu{
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
      >input {
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