<template>
    <div class="abox">
        <!--<div >{{aa}}</div>-->

        <!--<div >{{list}}</div>-->
        <!--<div @click="clickFns">12133</div>-->
        <div>abox</div>
      <div  @click="clickFn">{{aa}}</div>
      <div  @click="goTobbox">{{qq}}</div>
        <div>{{aad}}</div>
        <router-link to="/box/bbox">to bbox</router-link>
    </div>
</template>

<script>
    export default {
        name: 'abox',
        data () {
            return {
                msg: 'this is from abouts.vue',
              aa:"1",
              aad:"",
              stu:{
                    q:1,
                e:56
              },
              qq:22
            }
        },
      created(){
            this.aa="yd"
      },
      methods:{
        clickFn:function () {
         this.aad="2121"
        },
        goTobbox:function () {
          this.$router.push({name:'bbox',params:this.stu})
        }
      }
    }
</script>

<style lang='scss' scoped>
    .about {
    }
</style>
