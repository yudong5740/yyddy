<template>
    <div class="bbox">
      <div id="fa">
        <div class="fa_b">555</div>
      </div>
        <!--<div >{{aa}}</div>-->

        <!--<div >{{list}}</div>-->
        <!--<div @click="clickFns">12133</div>-->
        <div>我是 bbox</div>
        <!--<h3 @click="clickFn">{{msg}}</h3>-->
      <router-link to="/box">to box</router-link>
      <router-link to="/others?yud=12">to others</router-link>
      <m-menu></m-menu>

    </div>
</template>

<script>
  import MMenu from "../components/HelloWorld";
    export default {
        name: 'bbox',
        data () {
            return {
                msg: 'this is from abouts.vue'
            }
        },
      components: {
        "m-menu": MMenu,
      },
      created(){
        this.$route.params.name
      },
    }
</script>

<style lang='scss' scoped>
    .bbox {
      #fa{
        .fa_b{
          width:20px;
          height: 30px;
          background: gray;
        }
      }
    }
</style>
