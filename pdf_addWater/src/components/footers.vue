<template>
    <div class="footers">
        <div class="foot_info">
          <div class="foot_infbox">
            <ul>
              <li>
                <a href="/smart" target="_blank">人工服务</a>
                <div class="point_logo hot"></div>
              </li>
              <li>
                <a href="/api" target="_blank" rel="nofollow">开放平台</a>
                <div class="point_logo new"></div>
              </li>
              <li>
                <a href="http://vip.foxitreader.cn/pdf365/pdf365_pay" target="_blank" rel="nofollow" id="shopImd">立即购买</a>
              </li>
              <li>
                <a href="/help" target="_blank">帮助中心</a>
              </li>
              <li>
                <a href="/resources/agreement.html" target="_blank" rel="nofollow">服务条款</a>
              </li>
              <li>
                <a href="/resources/about.html" target="_blank" rel="nofollow">关于我们</a>
              </li>
              <li id="foot_share">
                <span class="label">联系客服 &nbsp;:</span>
                <ul>
                  <li @click="toQQ">
                    <i class="sharebar-qq"></i>
                    <div class="sharebar-r">
                      <h3>在线QQ：</h3>
                      <p>2852373735
                      </p>
                      <p>周一到周五9:00~18:00</p>
                    </div>
                  </li>
                  <li>
                    <i class="sharebar-em"></i>
                    <div class="sharebar-r">
                      <h3>发送邮件咨询：</h3>
                      <p>po@foxitsoftware.com</p>
                      <p>周一到周五9:00~18:00</p>
                    </div>
                  </li>
                  <li>
                    <i class="sharebar-wx"></i>
                    <div class="sharebar-wx-r"></div>
                  </li>
                </ul>
              </li>
              <div class="clear"></div>
            </ul>
            <p>©2018 Foxit 闽ICP备17018324号-1</p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "footers",
  data() {
    return {
      msg: "this is from abouts.vue"
    };
  },
  methods: {
    toQQ() {
       var vcolorpicker
      if (!!window.ActiveXObject || "ActiveXObject" in window)
        document.getElementsByClassName("class_qidian_wpa")[1].contentWindow.document.getElementsByTagName("a")[0].click();
      else{
        if (document.getElementsByClassName("class_qidian_wpa").length > 1) {
          document.getElementsByClassName("class_qidian_wpa")[0].remove();
        }
        document
          .getElementById("qidian_wpa_2852066922_17")
          .contentWindow.document.getElementsByTagName("a")[0]
          .click();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.footers {
  min-width: 1200px;
  height: 80px;
  text-align: center;
  background: #3f4658;

  .foot_info {
    width: 70%;
    min-width: 1200px;
    margin: 0 auto;
    display: block;
    color: #777;
    font-size: 14px;
    text-align: left;
    .foot_infbox {
      padding-top: 30px;
      li {
        font-size: 14px;
        margin-right: 65px;
        display: inline-block;
        position: relative;
        a {
          color: #fff;
          text-decoration: none;
        }
        .point_logo {
          position: absolute;
          width: 22px;
          height: 11px;
          top: -8px;
          right: -22px;
        }
        .hot {
          background: url("../assets/footers/hot.png") no-repeat;
        }
        .new {
          background: url("../assets/footers/new.png") no-repeat;
        }
      }
      li a:hover {
        text-decoration: none;
        color: #ff8e68;
      }
      #foot_share {
        float: right;
        margin-right: 0;
        span {
          color: #fff;
          margin: 0 20px;
        }
        .label {
          margin: 0;
        }
        ul {
          float: right;
          margin-bottom: 0;
          overflow: visible;
          margin-top: -5px;
          li {
            position: relative;
            float: left;
            margin-left: 25px;
            margin-right: 0;
            i {
              display: block;
            }
            .sharebar-qq {
              background-image: url(../assets/footers/QQ.png);
              background-position: -28px -28px;
              width: 28px;
              height: 28px;
              cursor: pointer;
            }
            .sharebar-qq:hover {
              background-image: url(../assets/footers/QQ_h.png);
            }
            .sharebar-r {
              display: none;
              position: absolute;
              left: -75px;
              top: -90px;
              width: 170px;
              height: 85px;
              background: url(../assets/footers/QQandEmail.png) center no-repeat;
              h3 {
                font-size: 14px;
                color: #333;
                font-weight: 700;
                text-align: left;
                text-indent: 20px;
                margin: 13px 0 0 0;
              }
              p {
                font-size: 12px;
                color: #666;
                text-align: left;
                text-indent: 20px;
                margin-top: 2px;
              }
            }
            .sharebar-em {
              background: url(../assets/footers/EMAIL.png) no-repeat;
              width: 28px;
              height: 28px;
            }
            .sharebar-em:hover {
              background: url(../assets/footers/EMAIL_h.png) no-repeat;
            }
            .sharebar-wx {
              background-image: url(../assets/footers/WX.png);
              background-position: 0px -56px;
              width: 27px;
              height: 28px;
            }
            .sharebar-wx:hover {
              background-image: url(../assets/footers/WX_h.png);
            }
            .sharebar-wx-r {
              display: none;
              position: absolute;
              width: 100px;
              height: 110px;
              background: url(../assets/footers/NEWWX.png) 100% 100%;
              left: -40px;
              top: -115px;
            }
          }
          li:hover i + .sharebar-r,
          li:hover i + .sharebar-wx-r {
            display: block;
          }
        }
      }
      p{
        font-size: 12px;
      }
    }
  }
}
/*
  li

  #foot_share ul::after {
    content: '';
    display: block;
    height: 0;
    clear: both
  }


  #foot_share ul li

!*  #foot_share li:hover i+.sharebar-r,#foot_share li:hover i+.sharebar-wx-r {
    display: block
  }*!

  #foot_share

  .footer .foot_infbox #foot_share ul {
    margin-top: -5px
  }

  .footer .foot_infbox #foot_share ul li {
    margin-left: 25px;
    margin-right: 0
  }

  .foot_share .sharebar-r h3 {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    text-align: left;
    text-indent: 20px;
    margin: 13px 0 0 0
  }

  .foot_share .sharebar-r p {
    font-size: 12px;
    color: #666;
    text-align: left;
    text-indent: 20px;
    margin-top: 2px
  }

  .foot_share .sharebar-wx-r {
    display: none;
    position: absolute;
    width: 100px;
    height: 110px;
    background: url(../assets/footers/新二维码1.png) 100% 100%;
    left: -40px;
    top: -115px
  }
*/
</style>
