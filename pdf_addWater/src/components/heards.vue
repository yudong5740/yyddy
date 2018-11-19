<template>
    <div class="heards">
      <div class="heards_l">
          <div class="heards_l_icon">
             <img src="@assets/heards/hears_icon.png"/>
          </div>
         <div class="heards_l_list">
            <ul>
              <li v-for="item in heards_l_lists">
                   <a :href="item.hrefs" rel="nofollow" >
                     <img v-bind:src="item.imgs"/>
                   </a>
              </li>
            </ul>
         </div>
      </div>
      <div class="heards_c">
        <ul>
          <li v-for="item in heards_c_lists">
            <div  class="heards_c_lists_title">
              {{item.names}}<div class="arrow">
              <div class="arrow_c"></div>
            </div>
            </div>
            <div class="title_list">
              <a v-for="items in item.list_li" :href="items.url">
                <div class="img_ALL" >
                  <img class="img" :src="items.pic_a"/>
                  <img class="imgs_h" :src="items.pic_h"/>
                </div>{{items.name}}
              </a>
            </div>
          </li>
        </ul>
      </div>
      <!-- :style="user_Name?('    margin-right': '29px'):''"  -->
      <div class="heards_r" :style="{'margin-right':(user_Name?'30px':'')}"   >
         <template v-if="!user_Name">
            <div class="heards_Noload" > 
              <div class="To_register" @click="ToLogin">注册</div>
              <i class="i">|</i> 
              <div class="To_load" @click='ToLogin'>登录</div>
            </div>
         </template>
         <template v-else>
            <div class="heards_Noload"  > 
              <div class="toBuy" style=""><a style=""  href="http://vip.foxitreader.cn/pdf365/pdf365_pay" rel="nofollow" target="_blank">我要购买</a></div>
               <div class="user_info_message"  @mouseenter="mouseEnters" @mouseleave="mouseLeaves" >
                  <img class="user_imgs" :src="figure?figure:figures" />
                  <span class="user_names" >{{user_Name}}</span>
                  <div class="direction_log" style="   "><img class="direction_tips" :src="isMove?small_up:small_down" ></div>
                   <!--  -->
                  <div class="user_message_list"  v-show="isMove" > 
                     <div class="user_info" >
                          <a class="user_info_img"  href="http://vip.foxitreader.cn/userCenter" target="_blank">
                            <img :src="figure?figure:big_figures" >
                          </a>
                          <p class="user_info_name" >  
                            <a href="http://vip.foxitreader.cn/userCenter" target="_blank">
                               <span >{{user_Name}}</span>      
                            </a>
                            
                          </p>
                          <div class="user_info_id" >
                            <a href="http://vip.foxitreader.cn/userCenter" target="_blank"> 
                            <span >ID：</span><span id="user-id" >{{user_ID}}</span>
                            </a>
                          </div>
                     </div>
                     <div class="menu_list"  >
                       <ul>
                         <li  > 
                           <a href="https://www.pdf365.cn/myOrders?tab=1"  target="_blank">我的订单</a>
                         </li>
                         <li  > 
                           <a  href="http://vip.foxitreader.cn/pdf365/applyInvoice" rel="nofollow" target="_blank" >申请发票</a>
                         </li>
                         <li > 
                           <a  href="https://sso.foxitreader.cn/forgot" target="_blank" rel="nofollow"   >修改密码</a>
                         </li>
                         <li > 
                           <a href="JavaScript:;"   class="row-1" rel="nofollow"  @click="logOut">退出</a>
                         </li>
                       </ul>
                     </div>
                  </div>
               </div>
            </div>
         </template>
      </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "heards",
  data() {
    return {
      isMove: false,
      user_Name: "",
      figures:require("@assets/heards/user_img.png"),
      big_figures:require("@assets/heards/user_info.png"),
      figure:"",
      user_ID: "",
      msg: "this is from abouts.vue",
      small_up: require("../assets/heards/small_up.png"),
      small_down: require("../assets/heards/small_down.png"),
      heards_l_lists: [
        {
          hrefs: "https://www.pdf365.cn/",
          imgs: require("@assets/heards/hears_list_1.png")
        },
        {
          hrefs:
            "http://file.foxitreader.cn/file/Channel/pdf365/PDF365Setup.exe",
          imgs: require("@assets/heards/hears_list_2.png")
        },
        {
          hrefs: "https://www.pdf365.cn/smart",
          imgs: require("@assets/heards/hears_list_3.png")
        }
      ],
      heards_c_lists: [
        {
          names: "从PDF转换",
          list_li: [
            {
              lis: " PDF转Word",
              imgs: require("../assets/heards/Pdf2word.png"),
              imgs_h: require("../assets/heards/Pdf2word_h.png")
            },
            {
              lis: " PDF转图片",
              imgs: require("../assets/heards/Pdf2img.png"),
              imgs_h: require("../assets/heards/Pdf2img_h.png")
            },
            {
              lis: " PDF转PPT",
              imgs: require("../assets/heards/PDF2PPT.png"),
              imgs_h: require("../assets/heards/PDF2PPT_h.png")
            },
            {
              lis: " PDF转Excel",
              imgs: require("../assets/heards/PDF2Excel.png"),
              imgs_h: require("../assets/heards/PDF2Excel_h.png")
            },
            {
              lis: " PDF转Html",
              imgs: require("../assets/heards/PDF2Html.png"),
              imgs_h: require("../assets/heards/PDF2Html_h.png")
            }
          ]
        },
        {
          names: "转换成PDF",
          list_li: [
            {
              lis: " Word转PDF",
              imgs: require("../assets/heards/Word2PDF.png"),
              imgs_h: require("../assets/heards/Word2PDF_h.png")
            },
            {
              lis: " 图片转PDF",
              imgs: require("../assets/heards/Img2pdf.png"),
              imgs_h: require("../assets/heards/Img2pdf_h.png")
            },
            {
              lis: " PPT转PDF",
              imgs: require("../assets/heards/PPT2PDF.png"),
              imgs_h: require("../assets/heards/PPT2PDF_h.png")
            },
            {
              lis: " Excel转PDF",
              imgs: require("../assets/heards/Excel2PDF.png"),
              imgs_h: require("../assets/heards/Excel2PDF_h.png")
            }
          ]
        },
        {
          names: "合并与拆分",
          list_li: [
            {
              lis: " PDF合并",
              imgs: require("../assets/heards/PDFmerge.png"),
              imgs_h: require("../assets/heards/PDFmerge_h.png")
            },
            {
              lis: " PDF拆分",
              imgs: require("../assets/heards/PDFsplit.png"),
              imgs_h: require("../assets/heards/PDFsplit_h.png")
            }
          ]
        },
        {
          names: "更多功能",
          list_li: [
            {
              lis: " PDF旋转",
              imgs: require("../assets/heards/PDFroate.png"),
              imgs_h: require("../assets/heards/PDFroate_h.png")
            },
            {
              lis: " PDF加密",
              imgs: require("../assets/heards/Encryption.png"),
              imgs_h: require("../assets/heards/Encryption_h.png")
            },
            {
              lis: " PDF去除密码",
              imgs: require("../assets/heards/Cipher.png"),
              imgs_h: require("../assets/heards/Cipher_h.png")
            },
            {
              lis: " PDF压缩",
              imgs: require("../assets/heards/Compress.png"),
              imgs_h: require("../assets/heards/Compress_h.png")
            }
          ]
        },
        {
          names: "免费功能",
          list_li: [
            {
              lis: " Excel转PDF",
              imgs: require("../assets/heards/Excel2PDF.png"),
              imgs_h: require("../assets/heards/Excel2PDF_h.png")
            },
            {
              lis: " PPT转PDF",
              imgs: require("../assets/heards/PPT2PDF.png"),
              imgs_h: require("../assets/heards/PPT2PDF_h.png")
            },
            {
              lis: " PDF转HTML",
              imgs: require("../assets/heards/PDF2Html.png"),
              imgs_h: require("../assets/heards/PDF2Html_h.png")
            }
          ]
        }
      ]
    };
  },
  created() {
    var that = this;
    this.getAllData();
    this.$leoBus.$on("user_info", params => {
      //获取传递的参数并进行操作
      that.user_Name = params.nickName;
      that.user_ID = params.userId;
      that.figure = params.figure;
    });
  },
  methods: {
    mouseEnters() {
      this.isMove = true;
    },
    mouseLeaves() {
      this.isMove = false;
    },
    //退出登入
    logOut() {
      sessionStorage.clear() 
      this.$leoBus.$emit("logout");
      window.open("/logout","_self")
    },
    ToLogin() {
      // var url = window.location.href;  encodeURI   encodeURIComponent  http://vip.foxitreader.cn
      var url = window.location.href;
      window.location.href = "/userLogin?url=" + encodeURIComponent(url);
    },
    getAllData() {
      var that = this;
      $.ajax({
        type: "get",
        url: "https://www.pdf365.cn/v3Api/getHeaderMenu",
        success: function(data) {
          var list = data.data;
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
            },
            {
              names: "免费功能",
              list_li: list["free"]
            }
          ];
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.heards {
  min-width: 1000px;
  width: 100%;
  height: 48px;
  /*margin: 0 auto;*/
  background: #3f4658;
  font-size: 13px;
  .heards_l {
    float: left;
    width: 49px;
    display: inline-block;
    .heards_l_icon {
      width: 49px;
      height: 48px; 
    }
    .heards_l_list {
      margin-top: 1px;
      display: none;
      top: 48px;
      position: absolute;
      z-index: 999999;
      padding-right: 25px;
      height: 170px;
      border: 1px solid #bcbcbc;
      border-top: none;
      -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.349019607843137);
      -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.349019607843137);
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.349019607843137);
      background: #fff;
      ul li {
        width: 120px;
        height: 120px;
        background: #ff8e68;
        display: block;
        margin: 25px 0 0 25px;
        position: relative;
        float: left;
        cursor: pointer;
        a {
          display: block;
          width: 120px;
          height: 120px;
          cursor: pointer;
          img{
            border: none
          }
        }
      }
    }
  }
  .heards_l:hover .heards_l_list {
    display: block;
  }
  .heards_c {
    display: inline-block;
    float: left;
    height: 48px;
    li {
      float: left;
      width: 131px;
      text-align: center;
      .heards_c_lists_title {
        cursor: default;
        color: #fff;
        display: inline-block;
        width: 131px;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        .arrow {
          display: inline-block;
          position: relative;
          top: 0px;
          right: -3px;
          width: 0;
          height: 0;
          border-top: 6px solid #f2f2f2;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
        }
        .arrow .arrow_c {
          position: absolute;
          width: 0;
          height: 0;
          top: -6px;
          left: -5px;
          border-top: 5px solid #3f4658;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
        }
      }
      .title_list {
        display: none;
        width: 215px;
        border: 1px solid #ddd;
        position: absolute;
        top: 48px;
        z-index: 100;
        background: #fff;
        a {
          display: none;
          position: relative;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          color: #666;
          padding: 16px 0;
          text-indent: 75px;
          .imgs_h {
            display: none;
            width: 100%;
            height: 100%;
          }
          .img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .img_ALL {
            position: absolute;
            display: inline-block;
            width: 28px;
            height: 24px;
            top: 50%;
            left: 30px;
            margin-top: -12px;
            img {
              border: none;
            }
          }
        }
        a:hover {
          color: #ff8e68;
          background: #f2f2f2;
          .imgs_h {
            display: block;
          }
          .img {
            display: none;
          }
        }
      }
    }
    li:hover {
      background: #2b3141;
      .arrow {
        top: 0px;
        border-top: none;
        border-bottom: 6px solid #fff;
      }
      .arrow .arrow_c {
        top: 1px;
        border-top: none;
        border-bottom: 6px solid #2b3141;
      }
      .title_list {
        display: block;
        a {
          display: block;
        }
      }
    }
  }
  .heards_r {
    float: right;
    margin-right: 50px;
    line-height: 48px;
    .heards_Noload {
      cursor: pointer;
      .To_load {
        float: right;
        font-style: normal;
        font-size: 12px;
        color: #f2f2f2;
        font-weight: 400;
      }
      .i {
        float: right;
        font-style: normal;
        font-size: 12px;
        color: #f2f2f2;
        font-weight: 400;
        margin: 0 5px;
      }
      .To_register {
        float: right;
        font-style: normal;
        font-size: 12px;
        color: #f2f2f2;
        font-weight: 400;
      }
      .toBuy {
        display: inline-block;
        width: 99px;
        height: 32px;
        line-height: 32px;
        background: yellow;
        text-align: center;
        font-weight: 400;
        font-style: normal;
        background: #fff;
        border-radius: 50px;
        a {
          display: block;
          color: #ff7300;
        }
      }
      .toBuy:hover {
        background: #ff8e67;
        color: #fff;
        a {
          color: #fff;
        }
      }
      .user_info_message {
        display: inline-block;
        float: right;
        .user_imgs {
          margin-right: 15px;
          float: left;
          margin: 8px 15px 0 25px;
          border-radius: 15px;
          width: 30px;
          height: 30px;
        }
        .user_names {
          color: #f2f2f2;
        }
        .direction_log {
          display: inline-block;
          width: 19px;
          // margin: 0px -24px 0 0px;
          .direction_tips {
            margin: 0px -25px 0 5px;
          }
        }

        .user_message_list {
          width: 205px;
          height: 200px;
          position: absolute;
          z-index: 9999999;
          right: 64px;
          top: 48px;
          background: red;
          .user_info {
            background: #ff8e68;
            padding: 19px 0px 19px 17px;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            -moz-box-shadow: 0px 0px 5px #ccc;
            -webkit-box-shadow: 0px 0px 5px #ccc;
            box-shadow: 0px 0px 5px #ccc;
            display: block;
            height: 55px;
            .user_info_img {
              display: inline-block;
              margin-top: 3px;
              float: left;
              img {
                border: none;
                width: 54px;
                height: 54px;
              }
            }
            .user_info_name {
              overflow: hidden;
              margin: -2px 36px 0 0;
              width: 81px;
              float: right;
              line-height: 24px;
              span {
                width: 57px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                float: left;
                font-family: 微软雅黑;
                font-weight: 400;
                font-style: normal;
                font-size: 12px;
                color: rgb(255, 255, 255);
              }
            }
            .user_info_id {
              float: right;
              line-height: 16px;
              width: 117px;
              margin-top: 1px;
              span {
                display: block;
                float: left;
                font-family: 微软雅黑;
                font-weight: 400;
                font-style: normal;
                font-size: 12px;
                color: rgb(255, 255, 255);
              }
            }
          }
          .menu_list {
            background: #fff;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            -moz-box-shadow: 0 0 5px #ccc;
            -webkit-box-shadow: 0 0 5px #ccc;
            box-shadow: 0 1px 5px #ccc;
            padding-bottom: 7px;
            padding-top: 6px;
            border: 1px solid #ccc;
            filter: progid:DXImageTransform.Microsoft.Shadow(color='#cccccc', Direction=155, Strength=4);
            border-top: none;
            li {
              overflow: hidden;
              cursor: default;
              line-height: 26px;
              a {
                width: 68px;
                text-indent: 13px;
                text-align: left;
                display: inline-block;
                cursor: pointer;
                color: #555;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis
              }
            }
          }
        }
      }
    }
  }
}
</style>
