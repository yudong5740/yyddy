<template>
  <div id="app">
 <!--   <img src="./assets/logo.png">
    &lt;!&ndash;<div>不用路由也可以展示出来内容</div>&ndash;&gt;
    &lt;!&ndash;<div>这个是首页</div>&ndash;&gt;
    <router-link to="/index.html">to others111</router-link>-->

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',
  created(){

  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
body,ul,li,p,h1,h2{
  margin: 0;
  padding: 0;
  font-family: "微软雅黑,å¾®è½¯é›…é»‘";
}
a{
  text-decoration: none;
}
  li{
    list-style: none;
  }
  .clear{
    zoom:1;
    clear: both;
  }
  .clear:after{
    clear: both;
    content: "";
    display: block;
    width: 0;
    height: 0;
    visibility:hidden;
  }
</style>
