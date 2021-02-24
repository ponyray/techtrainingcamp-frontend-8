<template>
  <div id="liveroom">
    <img :src="src" alt="" />
    <div id="status">{{ status }}</div>
    <div id="info">
      <div id="title">{{ title }}</div>
      <div id="time">{{ time }}</div>

      <div id="operate" @click.self="clickop">
        <img src="../assets/operate.png" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LiveWindow",
  props: {
    src: {
      type: String,
      default: function () {
        return "../assets/logo.png";
      },
    },
    status: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      defalut: "",
    },
    time: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    clickop(){
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss">
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
</style>