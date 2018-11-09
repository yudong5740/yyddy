<template>
  <div class="addWater" :style="[{'height':isMark?windowHeight:'100%'},{'overflow':isMark?'hidden':'inherit'}]">
    <div v-if="isMark"  @click="noMask" class="isMask" ></div>
    <m-heards></m-heards>
    <!-- <router-link to="/abouts">to bbox</router-link> -->
    <div class="contains">
      <div class="contains_title"> 
        <p><a href="https://www.pdf365.cn/">PDF365</a></p>
        <span>></span>
        <p>PDF加水印</p>
        <a target="_blank" href="http://file.foxitreader.cn/file/Channel/pdf365/PDF365Setup.exe" class="uploade"><img src="../assets/uploads.png"><span class="uploade_sp">下载客户端</span><span>，转换更轻松</span></a>
        <div class="clear"></div>
      </div>
        <m-add-water-list>
              <uploader :options="options" :file-status-text="statusText"  ref="uploader" @file-complete="fileComplete" @complete="complete" @files-added="adds" @file-success="fileSuccess"
                        @file-error="fileError"></uploader>

     </m-add-water-list>
      <template v-if="isFileList"> 
      <div class="entrance_content_icon" >
        <ul  >
          <template v-for="(item,index) in  entrance_content_icon">
            <li  >
              <img class="title_img" :src="item.imgs">
              <span style="">{{item.names}}</span>
            </li>
            <li v-if="index !=entrance_content_icon.length-1"  >
              <img class="title_icon" src="../assets/choice_icon.png" />
            </li>
          </template>
        </ul>
      </div>
      <!-- <div class="entrance_content_UserNum" >  暂时不要了
        PDF365已累计为<span>90,948</span>位用户处理<span>382,140</span>份文件
      </div> -->
      <div class="entrance_content_explain">
        <div class="explain_title clear">
          <i ></i>
          <h1 >在线PDF加水印</h1>
        </div>
        <div class="explain_content clear">
           <ul>
             <template v-for="(item,index) in explain_list">
               <li :class="{margins:index==0}"   >
                 <img :src="item.imgs"   :alt="item.alt">
                 <h3 style="">{{item.title}}</h3>
                 <p style="">{{item.text}}<a :href="item.urls">{{item.ahref}}</a><span>{{item.ahrefs}}</span></p>
               </li>
             </template>
           </ul>
        </div>
      </div>
      <div class="entrance_content_price clear">
        <i ></i>
        <h2>PDF加水印 服务价格
          <img src="../assets/free.png" alt="" class="pricelogo" v-if="isFreesName">
        </h2>
        <div class="price_table">
          <table >
            <thead>
            <tr>
              <th>文档大小</th>
              <th>消耗额度</th>
              <th>文档大小</th>
              <th>消耗额度</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>0.01~2.0M</td>
              <td>1/份</td>
              <td>2.01~3.0M</td>
              <td>2/份</td>
            </tr>
            <tr>
              <td>3.01~4.0M</td>
              <td>4/份</td>
              <td>4.01~5.0M</td>
              <td>8/份</td>
            </tr>
            <tr>
              <td>5.01~6.0M</td>
              <td>16/份</td>
              <td>6.01~7.0M</td>
              <td>30/份</td>
            </tr>
            <tr>
              <td>7.01~8.0M</td>
              <td>40/份</td>
              <td>8.01~9.0M</td>
              <td>50/份</td>
            </tr>
            <tr>
              <td>9.01~10.0M</td>
              <td>60/份</td>
              <td>10.01~30M</td>
              <td>99/份</td>
            </tr>
            <tr>
              <td>30.01~50M</td>
              <td>199/份</td>
              <td>≥50.01M</td>
              <td>299/份</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="entrance_content_Strategy clear" >
          <div class="Strategy_title clear">
            <i></i>
            <h2 >PDF加水印 使用攻略</h2>
          </div>
          <div  class="Strategy_content clear">
              <ul>
                <template v-for="(item, index) in Strategy_list">
                  <li  ><i></i><a target="_blank" :href="'https://www.pdf365.cn/help/'+item.id">{{item.title}}</a></li>
                </template>
              </ul>
          </div>
      </div>
      <div class="entrance_content_hot clear">
        <i></i>
        <h2>热门功能
        </h2>
        <div class="clear">
           <template v-for="(item,HotIndex) in hot_list">
             <a :href="item.url"  :key="HotIndex">{{item.name}}</a>
             <span class="split" v-if="HotIndex!=hot_list.length-1"  >|</span>
           </template>
        </div>
      </div>
      <div class="entrance_content_tips" >
         <div class="tips_list clear">
           <template v-for="(item,heards) in heards_c_lists">
             <ul  :key="heards">
               <li>{{item.names}}</li>
               <li v-for="(items,indexsItem) in item.list_li" :key="indexsItem" ><a :href="items.url">{{items.name}}</a></li>
             </ul>
           </template> 
         </div> 
      </div>
      </template> 
    </div>
    <m-footers></m-footers> 
  </div>
</template>
<script>  
import $ from "jquery"; 
import heards from "../components/heards.vue";
import Mfooters from "../components/footers"; 
import Mabouts from "../pages/abouts"; 
import MSelects from "../business/selects";
import mst from "../business/seletcs_color.vue";
import MAddWaterList from "../components/addWaterList";
export default {
  name: "watermark",
  data() {
    return {
      isMark: false, //遮罩
      windowHeight: "0", //浏览器的窗口高度 
      isFileList: true, //控制选择页面的选择按钮  
      entrance_content_icon: [
        {
          imgs: require("../assets/choice_1.png"),
          names: "拖拽或选择文件"
        },
        {
          imgs: require("../assets/choice_5.png"),
          names: "输入文字或添加文件"
        },
        {
          imgs: require("../assets/choice_4.png"),
          names: "点击开始添加"
        },
        {
          imgs: require("../assets/choice_3.png"),
          names: "添加完成，下载文件"
        }
      ], 
      //在线PDF转Word 模块
      explain_list: [
        {
          imgs: require("../assets/explain_6.png"),
          alt:"PDF加水印效果",
          title: "加水印效果",
          text:
            "PDF加水印功能可快速直接地进行在线PDF加水印，支持PDF文字水印，PDF图片水印一键添加。"
        },
        {
          imgs: require("../assets/explain_2.png"),
          alt:"PDF加水印速度",
          title: "加水印速度",
          text: "上传PDF文档后，一键操作，仅需数秒便完成PDF加水印操作。"
        },
        {
          imgs: require("../assets/explain_3.png"),
          alt:"PDF加水印适用系统",
          title: "适用系统",
          text:
            "PDF加水印功能适用于所有计算机，包括Mac、Windows及Linux，无拘无束体验在线PDF加水印。"
        },
        {
          imgs: require("../assets/explain_4.png"),
          alt:"PDF加水印云端处理",
          title: "云端加水印",
          text:
            "拥有多个PDF加水印云端服务器，支持批量在线PDF加水印，非常的方便快捷。"
        },
        {
          imgs: require("../assets/explain_5.png"),
          alt:"PDF加水印温馨提示",
          title: "温馨提示",
          text:
            "当转换过的PDF文件太大，不好传输或者发邮件？可使用“",
            ahref:"PDF压缩",
            ahrefs:"”进行文档压缩。",
            urls:'https://www.pdf365.cn/pdf-compress'
        }
      ],
      //PDF转Word 使用攻略  模块
      Strategy_list: [
        {
          hrefs: "https://www.pdf365.cn/help/317",
          text:
            "在线PDF转Word在线PDF转Word在线PDF转Word在线PDF转Word在线PDF转Word，奏是这么简单"
        },
        {
          hrefs: "https://www.pdf365.cn/help/312",
          text:
            "在线PDF转Word在线PDF转Word在线PDF转Word在线PDF转Word在线PDF转Word，奏是这么简单"
        },
        {
          hrefs: "https://www.pdf365.cn/help/311",
          text: "手机上如何在线PDF转换成Word"
        }
      ],
      //热门功能  模块
      hot_list: [],  
      //热门功能 底部模块
      heards_c_lists: [], 
      // 上传功能参数   
      options: {
        // target:this.,
        target: "https://www.pdf365.cn/v3Api/upload",
        testChunks: false,
        chunkSize: 10 * 100 * 1024 * 1024,
        //      userIds: "900035423",
        query: {
          userIds: "",
          type: "watermark"
        }
      },
      //限制上传类型。 但是不是这边 在uploads
      attrs: {
        accept: "images/*"
      }, 
        // 上传功能参数
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      },
      isNumberTen: 10, //true  列表上面已经有十个成功的文件 上传0个成功，还可以上传10个文件
      isFreesName: "", //只有免费跟公测  是 免费的图标
      copyBbostlist:[]
    };
  },

  mounted() {
    const that = this;
    (window.onresize = () => {
      return (() => { 
        that.isOverFlow = true;
        window.fullHeight = document.documentElement.clientHeight;
        that.windowHeight = window.fullHeight + "px";
      })();
    }),
      this.$nextTick(() => {
        window.uploader = this.$refs.uploader.uploader;
      });
  },
  methods: {
    noMask() {
      this.isMark = false;
      this.$leoBus.$emit("noMask");
    },
    complete() {
      // alert("上传列表所有上传完毕")
      console.log("complete", arguments);
      this.$leoBus.$emit("allCompleteUpload");
      this.$leoBus.$emit("noUploadsOver"); //监听列表是没有文件在上传中
      // alert("上传完毕")
    },
    fileComplete() {
      console.log("file complete", arguments);
    }, 
    fileSuccess(rootFile, file, message, chunk) {
      //上传单个文件成功  
      if (JSON.parse(message).data) {
        var price = {
          price: JSON.parse(message).data.filePrice,
          docid: JSON.parse(message).data.docid
        };
        this.$leoBus.$emit(
          "consumptionFilePrice",
          JSON.parse(message).data.filePrice
        );
      } else {
        var price = {
          noServe: true,
          noServeMessage:JSON.parse(message).message
        };
      }
      Object.assign(file, price);
       if (!JSON.parse(message).data) { 
         var exceptionsList=this.copyBBostlist.filter(item=>(item.name||item.sieze))
           this.copyBBostlist.map(function(item){
               if(item.name==file.name&&item.sieze==file.sieze){
                   item.noServe=true,
                  item.noServeMessage=JSON.parse(message).message
               }
           })
            this.$leoBus.$emit("exceptions", this.copyBBostlist );
        }; 
        
        this.$leoBus.$emit("kes");
    },
    fileError(rootFile, file, message, chunk) {
      //上传失败
      // this.uploadFile.push(file);
      // this.$leoBus.$emit("uploadFile", this.uploadFile);
      var price = {
        noWeb: true
      };
      Object.assign(file, price);
      // console.log("complete", rootFile, file, message, chunk);
 var exceptionsList=this.copyBBostlist.filter(item=>(item.name||item.sieze))
           this.copyBBostlist.map(function(item){
               if(item.name==file.name&&item.sieze==file.sieze){
                   item.noWeb=true,
                  item.noWebMessage="网络无连接或请求超时,"
               }
           })
            this.$leoBus.$emit("exceptions", this.copyBBostlist );  
    },
    open4(value) {
      this.$message.error(value);
    },
    adds(files, fileList) {
      //上传文件 
       if((files.filter(item=>item.fileType=="application/pdf").length!=files.length)){
         
              files.ignored = true;
             this.open4("不支持该文件类型"); 
       }else if (files.length == 0) {
        files.ignored = true;
        this.open4("该文件已在列表中，不需要重复上传");
      } else if (files.length > 10) {
        files.ignored = true;
        this.open4("一次上传最多支持10个文件");
      } else if (files.length > this.isNumberTen) {
        files.ignored = true;
        var successNum = 10 - this.isNumberTen;
        if(successNum==10){
        this.open4(
                  "成功上传" +
                    successNum +
                    "个文件，已达上限"
                );
        }else{
           this.open4(
          "已成功上传" +
            successNum +
            "个文件，只允许再上传" +
            this.isNumberTen +
            "个文件"
        );
        }
      } else if (files.length != 0) {
        var isTrue = false;
        files.map(function(item) {
          if (item.size > 104857600) {
            isTrue = true;
          }
        });
        if (isTrue) {
          files.ignored = true;
          this.open4("最大支持100M文件处理，您可尝试压缩文档后重试");
        } else {
          this.$leoBus.$emit("sums", files.length); //上传的总数
          this.$leoBus.$emit("btnSarting_btnSarted"); //上传中开启置灰按钮   
          this.$leoBus.$emit("isUploadsOver"); //监听列表是有文件再上传中
        }
      }
    }, 
    //获取菜单栏信息
    getAllData() {
      var that = this;
      $.ajax({
        type: "get",
        url: "https://www.pdf365.cn/v3Api/getHeaderMenu",
        success: function(data) {
          var list = data.data;
          that.hot_list = list["hot"]; //热门功能
          that.heards_c_lists = [
            {
              names: "从PDF转换",
              list_li: list["from-PDF"]
            },
            {
              names: "转换成PDF",
              list_li: list["convert-PDF"]
            },
            {
              names: "合并与拆分",
              list_li: list["merge-split"]
            },
            {
              names: "更多功能",
              list_li: list["else"]
            }
          ];
          that.heards_c_lists = [
            {
              names: "从PDF转换",
              list_li: list["from-PDF"]
            },
            {
              names: "转换成PDF",
              list_li: list["convert-PDF"]
            },
            {
              names: "合并与拆分",
              list_li: list["merge-split"]
            },
            {
              names: "更多功能",
              list_li: list["else"]
            }
          ]; //底部的导航内容
        }
      });
      $.ajax({    //使用攻略
        type: "get",
        url: "https://www.pdf365.cn/v3Api/getFaqList",
        data: {
          type: "watermark"
        },
        success: function(data) {
          that.Strategy_list = data.data;
        }
      });
    }
  }, 
  created() {
    var that = this;
    //屏幕高度
    window.fullHeight = document.documentElement.clientHeight;
    that.windowHeight = window.fullHeight + "px";
    //初始化菜单栏信息
    this.getAllData();
    this.$leoBus.$on("user_info", params => { 
      //传递用户的id
      that.options.query.userIds = params.userId;
      
    });
     this.$leoBus.$on("copyBBostlist", params => {
      //监听功能是否有免费的
      that.copyBBostlist=params
    });
    this.$leoBus.$on("free_big", params => {
      //监听功能是否有免费的
      if (params == "free" || params == "beta") {
        that.isFreesName = params;
      } else {
        that.isFreesName = "";
      }
    });
    this.$leoBus.$on("successNum", params => {
      //还可以再上传几条
      that.isNumberTen = params;
    });
    this.$leoBus.$on("ModalNoMask", () => {
      //关闭背景
      that.isMark = false;
    });
    this.$leoBus.$on("ModalisMask", () => {
      //打开背景
      that.isMark = true;
    });    
    this.$leoBus.$on("fileLists", params => {
      //判断是选择页面 还是功能列表页面
      if (params) {
        that.isFileList = false;
      } else {
        that.isFileList = true;
      }
    }); 
  },
  components: { 
    "m-heards": heards,
    "m-footers": Mfooters,
    "m-abouts": Mabouts,
    "m-selects": MSelects,
    "m-mst": mst,
    "m-add-water-list": MAddWaterList
  }
};
</script>

<style lang='scss' scoped>
.addWater {
  background: #f5f5f5;
  .isMask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 2;
    opacity: 0.3;
  }
  .actice:focus {
    border-color: #ff8e68 !important;
  }
  .actives::after {
    border-color: #ff8e68 !important;
  }
  .contains {
    min-width: 1200px;
    margin: 0 auto;
    .contains_title {
      width: 1200px;
      min-width: 1200px;
      margin: 29px auto 14px;
      p {
        display: inline-block;
        float: left;
        font-size: 12px;
        color: #666;
        line-height: 27px;
        a {
          text-decoration: none;
          color: #666;
          display: block;
          line-height: 27px;
        }
        a:hover {
          color: #f60;
        }
      }
      span {
        float: left;
        font-size: 14px;
        color: #666;
        margin: 0 8px;
        line-height: 24px;
      }
      .uploade {
        display: inline-block;
        float: right;
        cursor: pointer;
      }

      .uploade img {
        width: 13px;
        height: 13px;
        float: left;
        margin-top: 5px;
        margin-right: 5px;
        border: none;
      }

      .uploade span {
        font-size: 12px;
        color: #666;
        margin: 0;
      }

      .uploade span.uploade_sp {
        color: #ff8e68;
      }

      .uploade:hover span.uploade_sp {
        text-decoration: underline;
      }
    }
    .entrance_contains_content {
      width: 1198px;
      margin: 0 auto;
      border: 1px dashed #ddd;
      background: #ffffff;
      position: relative;
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
    .entrance_content_icon {
      width: 1200px;
      padding: 45px 0;
      margin: 0 auto;
      ul {
        display: inline-flex;
        display: -webkit-flex;
        display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox; /* TWEENER - IE 10 */
        display: -webkit-flex; /* NEW - Chrome */
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        li {
          .title_img {
            margin: 0 18px 0 0;
            float: left;
          }
          span {
            color: #666;
            display: block;
            float: left;
            margin-top: 16px;
          }
          .title_icon {
            margin-top: 20px;
          }
        }
      }
    }
    .entrance_content_UserNum {
      width: 1200px;
      padding: 20px 0 70px;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      color: #333333;
      span {
        font-size: 34px;
        color: #ff8e67;
        margin: 0 8px;
      }
    }
    .entrance_content_explain {
      width: 100%;
      background: #fff;
      min-width: 1200px;
      .explain_title {
        width: 1200px;
        padding: 60px 0 0;
        margin: 0 auto;
        i {
          width: 5px;
          height: 26px;
          background: #ff8e67;
          display: block;
          float: left;
          margin: 3px 12px 0 0;
        }
        h1 {
          position: relative;
          float: left;
          font-weight: 400;
          font-style: normal;
          font-size: 24px;
          color: #333;
        }
      }
      .explain_content {
        width: 1200px;
        margin: 0 auto;
        li {
          width: 220px;
          padding-top: 65px;
          padding-bottom: 66px;
          float: left;
          img {
            margin: 0 auto 30px;
            display: block;
          }
          h3 {
            font-weight: 700;
            font-size: 18px;
            color: #666;
            text-align: center;
            margin-bottom: 15px;
          }
          p {
            font-size: 14px;
            color: #999;
            text-align: left;
            padding: 0 22px 0 32px;
            line-height: 24px;
            a{
               color: #999;
            }
            a:hover{
              color:#ff8e67
            }
          }
        }
        .margins {
          margin-left: 50px;
        }
      }
    }
    .entrance_content_price {
      width: 1200px;
      margin: 60px auto 0;
      i {
        width: 5px;
        height: 26px;
        background: #ff8e67;
        display: block;
        float: left;
        margin: 3px 12px 0 0;
      }
      h2 {
        position: relative;
        float: left;
        font-weight: 400;
        font-style: normal;
        font-size: 24px;
        color: #333;
        .pricelogo {
          position: absolute;
          top: -10px;
          right: -35px;
          width: 34px;
          height: 19px;
        }
      }
      .price_table {
        overflow: hidden;
        float: left;
        margin-top: 30px;
        margin-bottom: 20px;

        /*  table,td,th {
          border: 1px solid #ededed;
          text-align: center;
          border-collapse: collapse;
          border-spacing: 0;
          table-layout: fixed;
          width: 100%;
          word-wrap: break-word
        }

         table thead tr {
          background: #f8f8f8
        }

         table th {
          font-weight: 700;
          font-style: normal;
          color: #515151;
          font-size: 13px;
          width: 25%
        }

        table tbody tr:nth-child(odd) {
          background: #fff
        }

       table tbody tr:first-child {
          background: #fff
        }

        table tbody tr:first-child+tr+tr {
          background: #fff
        }

         table tbody tr:first-child+tr+tr+tr+tr {
          background: #fff
        }

         table tbody tr:nth-child(even) {
          background: #f8f8f8
        }

        table td {
          font-weight: 400;
          !* font-size:13px; *!
          font-style: normal;
          color: #515151;
        }

         table th,td {
          padding: 21px 0;
        }*/

        table {
          border: 1px solid #ededed;
          text-align: center;
          border-collapse: collapse;
          border-spacing: 0;
          table-layout: fixed;
          width: 100%;
          word-wrap: break-word;
          th,
          td {
            padding: 21px 0;
            border: 1px solid #ededed;
            text-align: center;
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
            width: 100%;
            word-wrap: break-word;
          }
          thead {
            display: table-header-group;
            vertical-align: middle;
            border-color: inherit;
            tr {
              background: #f8f8f8;
              th {
                font-weight: 700;
                font-style: normal;
                color: #515151;
                font-size: 13px;
                width: 25%;
              }
            }
          }
          tbody {
            display: table-row-group;
            vertical-align: middle;
            border-color: inherit;
            tr:nth-child(even) {
              background: #f8f8f8;
            }
            tr:nth-child(odd) {
              background: #fff;
            }
            tr {
              font-weight: 400;
              font-size: 13px;
              font-style: normal;
              color: #515151;
            }
          }
        }
      }
    }
    .entrance_content_Strategy {
      width: 100%;
      background: #fff;
      .Strategy_title {
        width: 1200px;
        margin: 55px auto 0;
        padding-top: 63px;
        i {
          width: 5px;
          height: 26px;
          background: #ff8e67;
          display: block;
          float: left;
          margin: 3px 12px 0 0;
        }
        h2 {
          position: relative;
          float: left;
          font-weight: 400;
          font-style: normal;
          font-size: 24px;
          color: #333;
          margin-bottom: 40px;
        }
      }
      .Strategy_content {
        width: 1200px;
        margin: 0 auto;
        padding: 0 80px 62px;

        ul li {
          display: inline-block;
          width: 435px;
          height: 24px;
          line-height: 24px;
          padding-right: 165px;
          padding-right: 80px\0;
          padding-left: 81px;
          margin-bottom: 20px;
          font-size: 16px;
          color: #666;
          a {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #666;
            display: block;
          }
          a:hover {
            color: #ff8e67;
            text-decoration: underline;
          }
          i {
            width: 4px;
            height: 4px;
            background: #999;
            display: block;
            float: left;
            margin: 10px 10px 0 0;
            border-radius: 20px;
          }
        }
        ul li:nth-child(even) {
          padding-right: 0;
          padding-left: 0;
        }
        @media all and (min-width: 0) {
          ul li {
            padding-right: 165px;
          }
        }
      }
    }
    .entrance_content_hot {
      width: 1200px;
      margin: 63px auto 0;
      i {
        width: 5px;
        height: 26px;
        background: #ff8e67;
        display: block;
        float: left;
        margin: 3px 12px 0 0;
      }
      h2 {
        position: relative;
        float: left;
        font-weight: 400;
        font-style: normal;
        font-size: 24px;
        color: #333;
        margin-bottom: 35px;
      }
      a {
        margin: 0 27px;
        font-size: 16px;
        color: #777;
      }
      a:first-child {
        margin-left: 0;
      }
      span.split {
        color: #a5a5a5;
        margin: 0 2.5px;
      }
      a:hover {
        color: #ff8e68;
      }
    }
    .entrance_content_tips {
      width: 100%;
      background: #fff;
      .tips_list {
        width: 1200px;
        margin: 63px auto 0;
        padding: 66px 0 50px 0;
        ul {
          float: left;
          width: 25%;
          li {
            font-size: 14px;
            color: #999;
            margin-bottom: 20px;
            text-align: left;
            text-indent: 114px;
            cursor: pointer;
            a {
              color: #999;
            }
          }
          li:first-child {
            font-size: 16px;
            color: #666;
            font-weight: 700;
            margin-bottom: 25px;
            cursor: default;
          }
          li:first-child:hover {
            color: #666;
          }
          li a:hover,
          li:hover {
            color: #ff8e67;
          }
        }
      }
    }
    /*    .contains_content{
      width:1119px;
      margin: 0 auto;
      background: #ffffff;
      padding: 46px 49px 137px  32px ;
      position: relative;
      .contains_content_Otitle{
        .circularOne{
          width: 33px;
          height: 33px;
          display: inline-block;
          background:#ff8e68 ;
          line-height: 33px;
          text-align: center;
          color: #ffffff;
          border-radius: 24px;
          margin-right: 18px;
          font-style: normal;
          font-size: 14px;
        }
        span{
          font-size: 18px;
          color:#666666
        }
      }
      .Processing_state{
        margin-top: 18px;
        margin-bottom: 24px;
        .el-icon-loading{

          margin-left: 50px;
        }
         span{
           font-size: 14px;
           color:#666666
         }
      }
      .contents_message{
        margin-left: 33px;
        li:nth-child(odd){
          background: #f8f8f8;
        }
        li{
          height: 40px;
       !*   height: 40px;
          line-height: 40px;*!
          font-size: 12px;
          background: #ffffff;
          .message_names{
            padding-left: 17px;
            margin-right: 130px;
            width: 260px;
            display: inline-block;
            height: 40px;
            overflow: hidden;
            line-height: 40px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #5e5e5e;
          }
          .message_states{
            margin-right: 130px;
            width: 302px;
            display: inline-block;
            height: 40px;
            overflow: hidden;
            line-height: 40px;
            color: #5e5e5e;
            .message_states_Ones{
              margin-right: 65px;
            }
            .message_states_Twos{
              color:#ed4343;
              letter-spacing: 1px;
            }
            .circle{
              display: inline-block;
              margin-bottom: 0;
              background: #e4e4e4;
              height: 6px;
              border-radius: 3px;
              width: 108px;
              margin-right: 15px;
              .circle_children{
                background: #ff6833;
                height: 6px;
                width: 57%;
                border-radius: 3px;
              }
            }
            .message_states_fours{}
            !*width: 292px;*!
            !*height: 40px;*!
            !*display: inline-block;*!
            !*background: green;*!
            !*.states_one{*!
              !*display: inline-block;*!
            !*}*!
          }
          .loading_states{
            display: inline-block;
            height: 40px;
            overflow: hidden;
            line-height: 40px;
            width: 120px;
            float: right;
            color: #5e5e5e;
          }
        }

      }
      .contains_content_Ttitle{
        margin-top: 45px;
        .circularOne{
          width: 33px;
          height: 33px;
          display: inline-block;
          background:#ff8e68 ;
          line-height: 33px;
          text-align: center;
          color: #ffffff;
          border-radius: 24px;
          margin-right: 18px;
          font-style: normal;
          font-size: 14px;
        }
        span{
          font-size: 18px;
          color:#666666
        }
      }
      .Water_types{
        margin-left: 90px;
        margin-top: 14px;
        span{
          margin-right: 20px;
        }
      }
      .Water_inputWord{
        margin-top: 25px;
        margin-left: 59px;
        textarea{
          margin-left: 26px;vertical-align: top;width:214px; height: 46px;resize: none;padding: 8px;
          border-color: #d2d2d2;
          outline: none;
        }
      }
      .Water_font{
        margin-left: 89px;
        margin-top: 25px;
        .selects{
          color: #333333;
   !*       font-size: 14px;*!
          margin-left: 26px;
          display: inline-block;
        }
        .inputText{
          width: 42px;
          position: relative;
          height: 32px;
          line-height: 29px;
          text-align: center;
          border: 0.5px solid #378888;
          border-color: #d2d2d2;
          border-right:none;
          top:-1px;

        }

        input:focus{outline:none;}
        .unit{
          display: inline-block;
          width: 36px;
          height: 35px;
          background: #efefef;
          color: #666666;
          line-height: 30px;
          text-align: center;
          position: relative;
          top: -3px;
          left: -5px;
        }
        .bgColorS{
          display: inline-block;
          width: 36px;
          height: 35px;
          background: #666666;
          line-height: 30px;
          text-align: center;
          position: relative;
          top: 12px;
          left: -4px;
        }
      }
      .transparency{
        margin-left: 74px;
        margin-top: 25px;
        .selects{
          color: #333333;
   !*       font-size: 14px;*!
          margin-left: 26px;
          border-color: #d2d2d2;
          outline: none;
          display: inline-block;
        }
        span{
          position: relative;
          top: -2px;
        }
      }
      .Placing_layer{
        margin-left: 74px;
        margin-top: 25px;
        span{
          margin-right: 20px;
        }
      }
      .upImg{
        margin-left: 58px;
        margin-top: 25px;
        .chose_img{
          display: inline-block;
          border: 1px solid #dbdbe1;
          width: 111px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          color: #333333;
          font-size: 14px;
          margin-left: 26px;
          background: #f5f5f7;
          cursor: default;
        }
        .tips{
          font-size: 12px;color:#797979;
          position: relative;
          top: 11px;
        }
      }
      .btnStart{
        width: 136px;
        height: 47px;
        line-height: 48px;
        text-align: center;
        margin-left: 64px;
        margin-top: 30px;
        color:#a2a1a2;
        background:#f3f3f3 ;
        letter-spacing:1px;
        border-radius: 4px;
        font-size: 15px;
      }
      .btnStart.active{
        color: #ffffff;
        background: #ff8e68;
      }

    }*/
  }
}
</style>
