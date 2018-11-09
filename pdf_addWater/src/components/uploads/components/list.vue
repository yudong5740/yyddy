<template>
  <div class="uploader-list">
    <slot :file-list="fileList">
      <ul>
        <li v-for="file in fileList" :key="file.id" >
          <uploader-file :file="file" :list="true" ref="lia"></uploader-file>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
  import { uploaderMixin } from '../common/mixins'
  import UploaderFile from './file.vue'

  const COMPONENT_NAME = 'uploader-list'

  export default {
    name: COMPONENT_NAME,
    mixins: [uploaderMixin],
    computed: {
      fileList () {
        return this.uploader.fileList
      }
    },
    created(){
        var that=this
      this.$leoBus.$on("uploadersss", parms => {
        //删除 

        that.$refs.lia[parms].remove()
      });
      this.$leoBus.$on("retryss", parms => {
        //重试  
        that.$refs.lia[parms].retry()
      });
    },
    components: {
      UploaderFile
    },
  }
</script>

<style lang='scss' scoped>
  .uploader-list {
    position: relative;
  }
  .uploader-list > ul {
    list-style: none;
    margin: 0;
    padding: 0
  }
  .uploader-list ul  li{
    color:#5e5e5e
  }
  .uploader-list ul  li:nth-child(odd){
            background: #f8f8f8;
  }
</style>
