<template>
  <div id="app">
    <div id="nav">
      <div id="manage">
        <span>后台管理系统</span>
        <router-link to="/">直播间管理</router-link>
        <router-link to="/shortvideo">短视频管理</router-link>
        <router-link to="/comment">评论管理</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  background-color: #F8F8F9;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 23px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: #E6E8EB solid 1.5px;
  margin-bottom: 20px;
  #manage {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    span {
      border-right: rgba($color: #f0f1f2, $alpha: 1) 1.5px solid;
      font-weight: bold;
      color: #2c3e50;
      padding-right: 40px;
    }
    a {
      font-weight: bold;
      color: #2c3e50;
      margin-left: 40px;
      text-decoration: none;
      &.router-link-exact-active {
        color: #4f76ee;
      }
    }
  }
  #login{
    display: flex;
    align-content: center;
    justify-content: flex-start;
  }
}
</style>
