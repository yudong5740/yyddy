<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started">
      <uploader-unsupport></uploader-unsupport>
     <div   class="uploader-examples" v-show='isFileList'>
        <img class=" free_big" :src="free_big[free_big_name]" alt="免费" v-if="free_big_name&&free_big[free_big_name]">
        <div class="choice_icon">
          <img src="../../../assets/addWater.png" alt="PDF加水印">
        </div>
        <template >
          <!-- <p>Drop files here to upload or</p> -->
          <uploader-btn class="Choice_img"  :attrs="attrs"  v-show="isdrop">选择文件</uploader-btn>
          <!-- <uploader-btn>select files1111</uploader-btn>
          <uploader-btn :directory="true">select folder111</uploader-btn> -->
        </template>
           <div class="choice_expan" >一次上传最多支持10个文件</div>
        <!-- <div class="choice_guide">  暂时不要
          <p style="  ">如果您的文档包含扫描页面，请使用</p>
          <img src="../../../assets/point_right.png" alt="箭头">
          <a href="https://www.pdf365.cn/smart" target="_blank">人工服务</a>
        </div> -->



         <!-- <uploader-drop>   拖拽
      </uploader-drop> -->
      </div>
        <div  v-if='!isFileList' >
            <!-- 不在转换阶段 btnSarting-->
            <template v-if="!btnSarting">   
              <!-- btnSarting_btnSarted 上传中禁止-->
              <template v-if="btnSarting_btnSarted">
                  <div  class="btnSarting_btnSarted" >+添加文件</div>
              </template>
               <!-- btnSarting_btnSarts  上传后开启-->
             
                   <uploader-btn    style="position: absolute;width: 118px;height: 40px;right:1px;top:-116px;text-align: center;line-height: 40px;font-size: 12px;color: #ff6833;border: 1px solid #ff6833;border-radius: 5px;cursor: pointer;padding:0" :style="{background:bg}"  :attrs="attrs" v-show="btnSarting_btnSarts">+ 添加文件</uploader-btn>
             
            </template>  
                <!-- 转换完成后开启 btnSarted-->
            <template v-if='btnSarted'>
              <div  class="Choice_img_child" ><a href="https://www.pdf365.cn/watermark">+ 继续添加</a></div>
            </template>
              <!-- 转换中开启 btnSarted-->
             <template v-if='btnSarteds'>
                <!-- <div  class="btnSarting_btnSarted" >+继续添加</div> -->
            </template>
        </div>

      <div style="    width:1086px;
    margin: 0 auto;
    padding-left:33px;
    background: #ffffff;
    position: relative;">     <uploader-list></uploader-list></div>
    </slot>
  </div>
</template>

<script>
import Uploader from "simple-uploader.js";
import { kebabCase } from "../common/utils";
import UploaderBtn from "./btn.vue";
import UploaderDrop from "./drop.vue";
import UploaderUnsupport from "./unsupport.vue";
import UploaderList from "./list.vue";
import UploaderFiles from "./files.vue";
import UploaderFile from "./file.vue";

const COMPONENT_NAME = "uploader";
const FILE_ADDED_EVENT = "fileAdded";
const FILES_ADDED_EVENT = "filesAdded";
const UPLOAD_START_EVENT = "uploadStart";

export default {
  name: COMPONENT_NAME,
  provide() {
    return {
      uploader: this
    };
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    fileStatusText: {
      type: Object,
      default() {
        return {
          success: "success",
          error: "error",
          uploading: "uploading",
          paused: "paused",
          waiting: "waiting"
        };
      }
    }
  },
  data() {
    return {
      isFileList: true, //控制选择页面的选择按钮
      btnSarting_btnSarted:false,   //上传中
      btnSarting_btnSarts:true,   //开始上传前后
      started: false,
      files: [],
      fileList: [],
      bg: "",
      isdrop: true,
      attrs: {
        accept: "application/pdf"
      },
      free_big_name: "",
      free_big: {
        free: require("@/assets/free_big.png"),
        "free-limit": require("@/assets/free-limit.png"),
        hot: require("@/assets/hot.png"),
        recommend: require("@/assets/recommend.png"),
        charge: require("@/assets/charge.png"),
        beta: require("@/assets/beta.png")
      },
      btnSarting: false, //还未开始转换
      btnSarted: false, //处理完成后 开启重新选择图片按钮
      btnSarteds:false //处理中
    };
  },
  methods: {
    uploadStart() {
      this.started = true;
    },
    fileAdded(file) {
      this.$emit(kebabCase(FILE_ADDED_EVENT), file);
      if (file.ignored) {
        // is ignored, filter it
        return false;
      }
    },
    filesAdded(files, fileList) {
      this.$emit(kebabCase(FILES_ADDED_EVENT), files, fileList);
      if (files.ignored || fileList.ignored) {
        // is ignored, filter it
        return false;
      }
    },
    fileRemoved(file) {
      debugger;
      this.files = this.uploader.files;
      this.fileList = this.uploader.fileList;
    },
    filesSubmitted(files, fileList) {
      this.files = this.uploader.files;
      this.fileList = this.uploader.fileList;
      if (this.autoStart) {
        this.uploader.upload();
      }
    },
    allEvent(...args) {
      const name = args[0];
      const EVENTSMAP = {
        [FILE_ADDED_EVENT]: true,
        [FILES_ADDED_EVENT]: true,
        [UPLOAD_START_EVENT]: "uploadStart"
      };
      const handler = EVENTSMAP[name];
      if (handler) {
        if (handler === true) {
          return;
        }
        this[handler].apply(this, args.slice(1));
      }
      args[0] = kebabCase(name);
      this.$emit.apply(this, args);
    }
  },
  watch: {
    fileList: {
      handler: function(newVal) {
        //监听是选择页面 还是功能列表页面
        this.$leoBus.$emit("boxlist", newVal); 
      },
      deep: true
    }
  },
  created() {
    var that = this;
     this.$leoBus.$on("fileLists", params => {
      //判断是选择页面 还是功能列表页面
      if (params) {
       this.isFileList = false;
      } else {
        this.isFileList = true;
      }
    }); 
    this.$leoBus.$on("btnSarting_btnSarted", () => {
      //上传中开启  置灰按钮
      that.btnSarting_btnSarted = true;
      that.btnSarting_btnSarts = false; 
    });
    this.$leoBus.$on("btnSarting_btnSarts", () => {
      //上传后开启 上传按钮
      that.btnSarting_btnSarted = false;
      that.btnSarting_btnSarts = true; 
    });
    this.$leoBus.$on("onBbtnSarting", () => {
      //开始转换  处理完成后 开启重新选择图片按钮
      that.btnSarting = true; 
      that.btnSarteds = true; 
      that.btnSarted = false;
    });
    this.$leoBus.$on("btnSarted", () => {
      //处理完成后 开启重新选择图片按钮 
      that.btnSarted = true;
      that.btnSarteds=false 
    }); 
    this.$leoBus.$on("free_big", params => {
      //获取传递的参数并进行操作
      that.free_big_name = params;
    }); 
    this.options.initialPaused = !this.autoStart;
    const uploader = new Uploader(this.options);
    this.uploader = uploader;
    this.uploader.fileStatusText = this.fileStatusText;
    uploader.on("catchAll", this.allEvent);
    uploader.on(FILE_ADDED_EVENT, this.fileAdded);
    uploader.on(FILES_ADDED_EVENT, this.filesAdded);
    uploader.on("fileRemoved", this.fileRemoved);
    uploader.on("filesSubmitted", this.filesSubmitted); 
  },
  destroyed() {
    const uploader = this.uploader;
    uploader.off("catchAll", this.allEvent);
    uploader.off(FILE_ADDED_EVENT, this.fileAdded);
    uploader.off(FILES_ADDED_EVENT, this.filesAdded);
    uploader.off("fileRemoved", this.fileRemoved);
    uploader.off("filesSubmitted", this.filesSubmitted);
    this.uploader = null;
  },
  components: {
    UploaderBtn,
    UploaderDrop,
    UploaderUnsupport,
    UploaderList,
    UploaderFiles,
    UploaderFile
  }
};
</script>

<style lang='scss' scoped>
.uploader {
  position: relative;
  .Choice_img_child {
    position: absolute;
    width: 118px;
    height: 40px;
    right: 1px;
    top: -116px;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #ff6833;
    border: 1px solid #ff6833;
    border-radius: 5px;
    cursor: pointer;
    padding: 0;
    a {
      color: #ff6833;
    }
  }
  .Choice_img_child:hover {
    background: #ff8e68 !important;
    a {
      display: block;
      color: #fff;
    }
  }
  .btnSarting_btnSarted {
    position: absolute;
    width: 118px;
    height: 40px;
    right: 1px;
    top: -116px;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #ff6833;
    border-radius: 5px;
    background: #f2f2f2;
    padding: 0; 
      color: #a1a1a1;
      cursor: not-allowed;
  }
}

.uploader-examples {
  width: 1198px;
  margin: 0 auto;
  border: 1px dashed #ddd;
  background: #ffffff;
  position: relative;
  text-align: center;
  padding-bottom: 100px;
  .free_big {
    position: absolute;
    right: -5px;
    top: -5px;
  }
  .choice_icon {
    width: 155px;
    margin: 100px auto 50px;
    position: relative;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .Choice_img {
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
    border: none;
    padding: 0;
  }

  uploader-btn:hover {
    background: #ff8e68 !important;
  }
  .choice_expan {
    text-align: center;
    margin-top: 15px;
    color: #666;
  }
  .choice_guide {
    width: 100%;
    border-top: 1px dashed #ddd;
    margin-top: 100px;
    overflow: hidden;
    height: 66px;
    p {
      float: left;
      font-size: 16px;
      color: #666;
      line-height: 66px;
      margin-left: 410px;
    }
    img {
      float: left;
      margin: 24px 10px 0;
    }
    a {
      float: left;
      display: block;
      width: 84px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #ff8e68;
      font-size: 14px;
      color: #ff8e68;
      margin-top: 14px;
    }
  }
}
</style>
