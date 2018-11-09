<template>
    <div class="box">
        <!--<div >{{aa}}</div>-->

        <!--<div >{{list}}</div>-->
        <!--<div @click="clickFns">12133</div>-->
        <div>box</div>
        <router-link to="/box/abox">to 1box</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'box',
        data () {
            return {
                msg: 'this is from abouts.vue'
            }
        }
    }
</script>

<style lang='scss' scoped>
    .about {
    }
</style>
