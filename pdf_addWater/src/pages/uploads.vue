<template>
    <div class="uploads">
<!--      <uploader :options="options" class="uploader-example">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p>Drop files here to upload to</p>
          <uploader-btn>select files</uploader-btn>
          <uploader-btn :attrs="attrs">select images</uploader-btn>
          <uploader-btn :directory="true">select folder0010110</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>-->
  <!--    <div style="width: 100px;height:100px;background: green"></div>-->
      <!-- <div class="uploader-example"> -->
        <!-- <img class="content-upload-i free_big" src="../assets/hot.png" alt="免费">
        <div class="choice_icon">npm
          <img src="../assets/addWater.png">
        </div>
        <div class="Choice_img" >选择文件</div> -->
        <uploader :options="options" :file-status-text="statusText"  ref="uploader" @file-complete="fileComplete" @complete="complete"></uploader>
      <!-- </div> -->
    </div>
</template>

<script>
    export default {
        name: 'uploads',
        data () {
            return {
                msg: 'this is from abouts.vue',
              options: {
               target: 'https://www.pdf365.cn/v3Api/upload?userIds="900035423"&type="watermarksss"',
                // target: 'https://jsonplaceholder.typicode.com/posts/',
                testChunks: false,

              },
              attrs: {
                accept: 'images/*'
              },
              watc: {
                success: '成功了',
                error: '出错了',
                uploading: '上传中',
                paused: '暂停中',
                waiting: '等待中'
              }
            }
        },
      methods: {
        complete () {
          debugger
          console.log('complete', arguments)
        },
        fileComplete () {

          console.log('file complete', arguments)
        }
      },
      mounted () {
        this.$nextTick(() => {
          window.uploader = this.$refs.uploader.uploader
        })
      }
    }
</script>

<style lang='scss' scoped>
  .uploader-example{
    width:1198px;
    margin: 0 auto;
    border: 1px dashed #ddd;
    background: #ffffff;
    position: relative;
    .free_big{
      position: absolute;
      right: -5px;
      top: -5px;
    }
    .choice_icon{
      width: 155px;
      margin: 100px auto 50px;
      position: relative;
      img{
        display: block;
        margin: 0 auto;
      }
    }
    .Choice_img{
      width: 210px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: #ff8e68;
      color: #fff;
      font-size: 16px;
      border-radius: 50px;
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      outline: 0;
    }
  }
  /*.uploader-example {*/
    /*width: 880px;*/
    /*padding: 15px;*/
    /*margin: 40px auto 0;*/
    /*font-size: 12px;*/
    /*box-shadow: 0 0 10px rgba(0, 0, 0, .4);*/
  /*}*/
  /*.uploader-example .uploader-btn {*/
    /*margin-right: 4px;*/
  /*}*/
  /*.uploader-example .uploader-list {*/
    /*max-height: 440px;*/
    /*overflow: auto;*/
    /*overflow-x: hidden;*/
    /*overflow-y: auto;*/
  /*}*/
  .uploader-btn{

  }
</style>
