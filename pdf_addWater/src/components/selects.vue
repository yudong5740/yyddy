<template>
    <div class="abouts">
        <!--<div >{{aa}}</div>-->

        <!--<div >{{list}}</div>-->
        <!--<div @click="clickFns">12133</div>-->
        <div>abouts</div>
        <h3 @click="clickFn">{{msg}}</h3>
        <router-link to="/others">to others</router-link>
    </div>
</template>

<script>
    export default {
        name: 'abouts',
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
