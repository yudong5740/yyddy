<template>
    <div class="addWater_list">

      <div :class="{contains_content:NoFileList}">


               <!-- <div style="position: absolute;width: 118px;height: 40px;right:50px;top:26px;text-align: center;line-height: 40px;font-size: 12px;color: #ff6833;border: 1px solid #ff6833;border-radius: 5px;cursor: pointer">+ 添加文件</div> -->
           <template v-if="NoFileList">
 <div class="contains_content_Otitle">
              用户额度{{balance_total}}
          <i class="circularOne">1</i>
          <span>
             <template v-if="isDelates">
                 <template v-if="delateing">
                   正在处理 
                 </template>
                 <template v-else> 
                   处理完成
                 </template> 
             </template>
             <template v-else>
               正在上传
             </template>
          </span>
        </div>
        <div class="Processing_state">
          <ul v-if="bbostlist.length>0">
            <li v-for="(item,index) in bbostlist" >{{item}}<span @click="delates(index)" style="color:red">删除</span></li>
          </ul> 

             <template v-if="isDelates">
                 <template v-if="delateing">
                    <i class="el-icon-loading"></i>
                    <span>正在处理文件（{{delatedNum}}/{{key}}），已消耗{{delated_blance}}额度</span>
                 </template>
                 <template v-else> 
                    <i class="el-icon-delate_success"></i>
                    <span  class="Processing_delate_success">
                       当前成功处理文件{{delatedNum}}个，已消耗{{delated_blance}}额度，剩余{{balance_total-delated_blance}}额度，<a href="http://vip.foxitreader.cn/pdf365/pdf365_pay" target="_blank" >立即充值</a>
                    </span> 
                 </template> 
             </template>
             <template v-else>
                <template v-if="allComplete">  <!--allComplete-->
                  <span  class="Processing_state_success">
                  {{key}}个文件等待处理，需要消耗{{consume_balance}}额度
                  </span>
                </template>
                <template v-else-if="isUploading">  <!--isUploading-->
                  <i class="el-icon-loading"></i>
                  <span>正在上传（{{key}}/{{sum}}），需要消耗{{consume_balance}}额度</span>
                </template>
             </template> 
        </div>

           </template>
          <slot>888</slot>
             <template v-if="NoFileList">
        <div class="contents_message">
           <ul>
             <!-- molis bbostlist-->
            <li v-for="(item,index) in bbostlist">   
             <!--<li v-for="(item,index) in bbostlist">-->
              <div class="message_names">{{item.name}}</div>
              <div class="message_states">
                <template v-if='index_u_status'>
                  <template v-if="item.price">
                  <span class="message_states_Ones">{{sizeChange(item["_prevUploadedSize"])}}</span>
                  <span >{{item.price}}额度</span>
                  <!--<template v-if="item.price">

                    </template>
                    <template v-else-if="false">
                      <span class="message_states_Twos">最大支持100M文件处理，您可尝试压缩文档后重试</span>
                    </template>
                    <template v-else-if="false">
                      <div class="circle">
                        <div class="circle_children"></div>
                      </div>
                      <span class="message_states_fours">正在上传</span>
                    </template>
                    <template v-else-if="false">
                      <span>最大支持100M文件处理，您可尝试压缩文档后重试</span>
                    </template>-->
                  </template>
                  <template v-else-if="item.noWeb">
                    <span>网络无连接或请求超时，<span @click="retry(index)" style="color:blue">请重试</span></span>
                  </template>
                  <template v-else-if="item.singleComplete||item.noServe">
                    <span>服务异常，请联系客服或重试{{item.noServe}},{{item.status}},{{item.singleComplete}},</span>
                  </template>
                  <template v-else>
                    <!-- <span>正在上传</span> -->
                    <div style="display: inline-block;margin-top:18px">
                      <m-progress :widths="'198px'" :endPro='90'></m-progress>
                    </div>
                  </template>
                </template>
                <template v-else>
                    <template v-if="item.index_u==4">
                    <span class="message_states_Ones">{{sizeChange(item["_prevUploadedSize"])}}</span>
                    <span >{{item.price}}额度</span> 
                    </template>
                    <template v-else-if="item.index_u==1">
                      <span>{{item.message_y}}</span>
                    </template> 
                    <template v-else> 
                      <div style="display: inline-block;margin-top:18px">
                        <m-progress :widths="'198px'" :endPro='90'></m-progress>
                      </div>
                    </template>
                </template>

              </div>
              <div class="loading_states">
               <template v-if='index_u_status'> 
                  <template v-if="item.noWeb">
                    <span  @click="delates(index,'无网络删除')" class="delates" >删除</span>
                  </template>
                  <template v-else-if="item.price||item.singleComplete||item.noServe">
                    <span  @click="delates(index,'删除')" class="delates" >删除</span>
                  </template>
                  <template v-else>
                    <span  @click="delates(index,'取消上传')" >取消上传</span>
                  </template> 
                </template>
                <template v-else> 
                    <template v-if="item.index_u==4">
                      <span><a :href="item.url_d" >下载</a></span>
                    </template>
                    <template v-else-if="item.index_u==1">
                      <!-- <span  @click="delates(index,'删除')" class="delates" >删除</span> -->
                    </template>
                    <template v-else>
                      <!-- <span  @click="delates(index)" >取消上传</span> -->
                    </template> 
                </template>
              </div>
            </li>
          </ul>
          <!-- 出现异常的列表 -->
          <!-- <ul><li v-for="item in uploadFile_list">{{item}}</li></ul>    -->
          <!--<ul>  模板
            <li v-for="item in messageList">
              <div class="message_names">这个是文件名是解放开绿灯撒经这个是文件名是解放开绿灯撒经这个是文件名是解放开绿灯撒经这个是文件名是解放开绿灯撒经</div>
              <div class="message_states">
                <template v-if="false">
                  <span class="message_states_Ones">1 M</span>
                  <span style="    display: inline-block;
    background: blue;">1 额度</span>
                </template>
                <template v-else-if="true">
                   <span class="message_states_Twos">最大支持100M文件处理，您可尝试压缩文档后重试</span>
                  &lt;!&ndash;<div style="height:20px;background:red;width:200px;">&ndash;&gt;
                     &lt;!&ndash;<div style="height:20px;background: blue;" :style="{width:numColors()}"></div>&ndash;&gt;
                  &lt;!&ndash;</div>&ndash;&gt;
                </template>
                <template v-else-if="false">
                  <div class="circle">
                    <div class="circle_children"></div>
                  </div>
                  <span class="message_states_fours">正在上传</span>
                </template>
                <template v-else-if="false">
                  <span>最大支持100M文件处理，您可尝试压缩文档后重试</span>
                </template>
              </div>
              <div class="loading_states">
                <template v-if="false">
                  <span>下载</span>
                </template>
                <template v-else-if="false">
                  <span>下载</span>
                </template>
                <template v-else>
                  <span>删除</span>
                </template>
              </div>
            </li>
          </ul>-->
        </div>
        <div class="contains_content_Ttitle">
          <i class="circularOne">2</i><span>水印内容</span>
        </div>
        <div class="Water_types">
          <span class="title">类型:</span>
          <template v-if="changesOver">
              <label>
                <input type="radio" name="radios" value="1" checked   @click="checks(1)"/> <span  :class="{OnAcitve:isOnFont}">文字</span>
              </label>
              <label>
                <input type="radio" name="radios" value="2"      @click="checks(2)"/> <span :class="{OnAcitve:!isOnFont}">图片</span>
              </label>
          </template>
          <template v-else>
              <label  style="cursor: not-allowed">
                <input type="radio" name="radios" value="1" checked   @click="checks(1)"  disabled/> <span  :class="{OnAcitve:isOnFont}">文字</span>
              </label>
              <label style="cursor: not-allowed">
                <input type="radio" name="radios" value="2"      @click="checks(2)" disabled /> <span :class="{OnAcitve:!isOnFont}">图片</span>
              </label>
          </template>
        </div>
        <!--<m-selects></m-selects>-->
        <div  v-show="isOnFont" >
          <div class="Water_inputWord">
            <span class="title">水印文字:</span>
            <template v-if="changesOver">
              <textarea      class="actives"  placeholder="输入内容..."  v-model="textContent"  :class="{acticess:textareaColor}" @mouseenter="mouseEnters('textareaColor')" @mouseleave="mouseLeaves('textareaColor')"></textarea>
            </template>
            <template v-else>
              <textarea   disabled  class="actives  changesOver"   v-model="textContent"   ></textarea>
            </template>
          </div>
          <div class="Water_font">
            <span class="title">字体:</span>
            <div class="selects ">
               <template v-if="changesOver">
                    <m-selects :itemList='fontList'  :message='fontListSure.fontMessage' @selectOk="fontSelect"></m-selects>
               </template>
               <template v-else>
                    <div class="changesOver" style=" ">{{fontListSure.fontMessage}}  <img src="@assets/input_down.png" style=" "></div>
               </template>
            </div>
            <template v-if="changesOver">
              <input  type="text" class="inputText actices" :class="{acticess:inputTextColor}"  v-model="fontSize" @mouseenter="mouseEnters('inputTextColor')" @mouseleave="mouseLeaves('inputTextColor')">
            </template>
            <template v-else>
              <input  disabled type="text" class="inputText actices" :class="{acticess:inputTextColor}"  v-model="fontSize" @mouseenter="mouseEnters('inputTextColor')" @mouseleave="mouseLeaves('inputTextColor')" style="cursor: not-allowed">
            </template>
            <div class="unit">pt</div>
            <div class="bgColorS">
              <template v-if="changesOver">
                <m-selects_color :itemList='colorList'  :message='colorListSure.colorMessage' @selectOk="colorSelect"></m-selects_color>
              </template>
              <template v-else>
              
                 <div class="changesOver"  >
    
       <div >
    <img src="@assets/input_down.png"  >
    </div>
    </div>
              </template>
            </div>
          </div>
        </div>
        <div  v-show="!isOnFont" >
          <div class="upImg">
            <span class="title">上传图片:</span>
            <template v-if="changesOver">
               <div class="chose_img" :class="{acticess:chose_imgColor}" @mouseenter="mouseEnters('chose_imgColor')" @mouseleave="mouseLeaves('chose_imgColor')">  
          <el-upload
          ref="uploadExcel"
          action="https://www.pdf365.cn/v3Api/uploadImg"
          :multiple="false"
          :auto-upload="true"
          :before-upload="beforeUploadFile"
          :show-file-list="false" 
          :on-success="handleSuccess"
          :data="datas"
          :on-error="handleError"
          :accept="'image/png,image/jepg'"
          :file-list="fileList"> 
          <el-button    class="chose_img_btn">选择文件</el-button>  
        </el-upload>
            </div>
            </template>
            <template v-else>
 <div class="changesOver">选择图片</div>
            </template>

            <span class="tips"  v-if="fileLists.length==0">JPG或PNG格式的图片（最大300KB）</span>
            <span class="imgName" v-if="fileLists.length>0"><img  :src="chose_img_btn[chose_img_btn_status]" >{{fileLists[fileLists.length-1].name}}</span>
           <!-- <span class="tips"  v-if="fileLists.length==0">JPG或PNG格式的图片（最大300KB）<span v-if="fileLists.length>0">{{fileLists[0].name}}</span></span> --> <!--fileLists 临时的   filelist_ss正式的  -->
          </div>
          <div class="roteImg ">
            <span class="title">选择角度:</span>
            <div class="selects ">
         
             <template v-if="changesOver">
                 <m-selects :itemList='roteList'  :message='roteListSure.roteMessage' @selectOk="roteSelect"></m-selects>
            </template>
            <template v-else>
                     <div class="changesOver" style=" ">{{roteListSure.roteMessage}}<img src="@assets/input_down.png" style=" "></div>
            </template>
            </div>
          </div>
        </div>
        <div class="transparency">
          <span class="title">透明度:</span>
          <div class="selects">
            <template v-if="changesOver">
                <m-selects  :itemList='opcityList' :message='opcityListSure.opcityMessage' @selectOk="opcitySelect"></m-selects>
            </template>
            <template v-else>
                     <div class="changesOver" style=" ">{{opcityListSure.opcityMessage}}<img src="@assets/input_down.png" style="  "></div>
            </template>
          </div>
        </div>
        <div class="Placing_layer">
          <span class="title">放置层:</span>
          <template v-if="changesOver">
            <label>
              <input type="radio" name="radio" value="1"   checked  @click="placeW(1)"/> <span  :class="{OnAcitve:isOnPlace}">PDF文字内容上方</span>
            </label>
            <label>
              <input type="radio" name="radio" value="2"   @click="placeW(2)"/> <span   :class="{OnAcitve:!isOnPlace}">PDF文字内容下方</span>
            </label>
          </template>
          <template v-else>
            <label style="cursor: not-allowed">
              <input type="radio" name="radio" value="1"   checked  @click="placeW(1)" disabled/> <span  :class="{OnAcitve:isOnPlace}">PDF文字内容上方</span>
            </label>
            <label style="cursor: not-allowed">
              <input type="radio" name="radio" value="2"   @click="placeW(2)"  disabled/> <span   :class="{OnAcitve:!isOnPlace}">PDF文字内容下方</span>
            </label>
          </template>
        </div>
            <template v-if='!isBtnStartChanges'>
                <div class="btnStart"   >立即开始</div>
            </template>
            <template v-else>
               <div class="btnStart" :class="{active:isBtnStartChanges}"  @click="btnStart">立即开始</div>
            </template>

       </template>
      </div>
      <!-- <div>{{urlss}}</div> -->

      <!--isModal-->
      <div v-if="isModal"  class="Modal"  >
         <div class="header" >
           <span class="header_title" >
             <template v-if="less_than">
               额度消耗提示
             </template>
             <template v-else>
               额度不足
             </template>
           </span>
           <span class="header_modal_close"   @click="noMask">x</span>
         </div>
        <div class="content">
           <p>
             <template v-if="less_than">
               本次转换需要消耗额度{{consume_balance}}，点击确认开始转换
             </template>
             <template v-else>
               本次转换需要消耗额度{{consume_balance}}，您的剩余额度不足，请充值
             </template>
           </p>
          <div class="content_Btns" >
            <template v-if="less_than">
              <div class="btn_l"  @click="GoChanges">确定</div>
            </template>
            <template v-else>
              <div class="btn_l" >
                <a  href="http://vip.foxitreader.cn/pdf365/pdf365_pay" target="_blank"  @click="NoChagenes">立即充值</a>
              </div>
            </template>
            <div class="btn_r"   @click="noMask">取消</div>
          </div>
          <div class="footer">
            <p  >现在充值，立享充值优惠</p>
            <a  href="http://vip.foxitreader.cn/pdf365/pdf365_pay" target="_blank" @click="NoChagenes">我要充值</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from "jquery";
import MSelects from "../business/selects";
import MSelectsColor from "../business/seletcs_color.vue"; 
import MProgress from "../business/progress";
export default {
  name: "addWater_list",
  data() {
    return {
      changesOver:true,   //水印内容可编辑
        isLogings:false,    //是否登录  
        colorListSure: {
        colorMessage: "#000000", //字体类型
        value: "#000000"
      },
      colorList: [
        {
          names: "#000000",
          value: "#000000"
        },
        {
          names: "#ffffff",
          value: "#ffffff"
        },
        {
          names: "#ff0000",
          value: "#ff0000"
        },
        {
          names: "#ffd800",
          value:  "#ffd800"
        },
        {
          names: "#0084ff",
          value:  "#0084ff"
        },
        {
          names: "#35af0a",
          value:  "#35af0a"
        }
      ],
      isDelates:false,         //是否开始转换
      delateing:true,        //开始处理中   处理完成 false
      delatedNum:0,         //  处理成功的文件
      index_u_status: true,
      molis: [
        {
          isFolder: false,
          isRoot: false,
          id: 2,
          fileType: "application/pdf",
          name: "0.01M - 副本.pdf",
          size: 14887,
          relativePath: "0.01M - 副本.pdf",
          paused: false,
          error: false,
          allError: false,
          aborted: false,
          averageSpeed: 0,
          currentSpeed: 0,
          _lastProgressCallback: 1541267023815,
          _prevUploadedSize: 14887,
          _prevProgress: 1,
          uniqueIdentifier: "14887-001M-pdf",
          status: "success",
          _progeressId: 0,
          price: 1,
          docid: "dc9c3eca-3903-4dc2-ae0a-3d0d048886b2",
          singleComplete: true
        },
        {
          isFolder: false,
          isRoot: false,
          id: 3,
          fileType: "application/pdf",
          name: "0.01M.pdf",
          size: 14887,
          relativePath: "0.01M.pdf",
          paused: false,
          error: false,
          allError: false,
          aborted: false,
          averageSpeed: 0,
          currentSpeed: 0,
          _lastProgressCallback: 1541267023689,
          _prevUploadedSize: 14887,
          _prevProgress: 1,
          uniqueIdentifier: "14887-001Mpdf",
          status: "success",
          _progeressId: 0,
          price: 1,
          docid: "b063d463-eb5d-49f0-b3f8-69a272043921",
          singleComplete: true
        },
        {
          isFolder: false,
          isRoot: false,
          id: 4,
          fileType: "application/pdf",
          name: "2.0M测试 - 副本1.pdf",
          size: 2096160,
          relativePath: "2.0M测试 - 副本1.pdf",
          paused: false,
          error: false,
          allError: false,
          aborted: false,
          averageSpeed: 0,
          currentSpeed: 0,
          _lastProgressCallback: 1541267028420,
          _prevUploadedSize: 2096160,
          _prevProgress: 1,
          uniqueIdentifier: "2096160-20M-1pdf",
          status: "success",
          _progeressId: 0,
          price: 1,
          docid: "4d251c21-e9f5-453e-94f4-6d638222bb55",
          singleComplete: true
        },
        {
          isFolder: false,
          isRoot: false,
          id: 5,
          fileType: "application/pdf",
          name: "2.0M测试.pdf",
          size: 2096160,
          relativePath: "2.0M测试.pdf",
          paused: false,
          error: false,
          allError: false,
          aborted: false,
          averageSpeed: 0,
          currentSpeed: 0,
          _lastProgressCallback: 1541267028600,
          _prevUploadedSize: 2096160,
          _prevProgress: 1,
          uniqueIdentifier: "2096160-20Mpdf",
          status: "success",
          _progeressId: 0,
          price: 1,
          docid: "8f22f0db-3698-459d-bc00-793952bff59c",
          singleComplete: true
        },
        {
          isFolder: false,
          isRoot: false,
          id: 6,
          fileType: "application/pdf",
          name: "4.01M(3).pdf",
          size: 4205814,
          relativePath: "4.01M(3).pdf",
          paused: false,
          error: false,
          allError: false,
          aborted: false,
          averageSpeed: 0,
          currentSpeed: 0,
          _lastProgressCallback: 1541267046080,
          _prevUploadedSize: 0,
          _prevProgress: 0,
          uniqueIdentifier: "4205814-401M3pdf"
        }
      ],
      less_than: true, //  余额是否充足     充足 true
      isModal: false, //额度消耗的弹窗
      chose_img_btn_status: "success", //水印内容的选择图片之后的状态
      chose_img_btn: {
        //水印内容的选择图片之后的状态类型
        loading: require("../assets/loading.png"),
        success: require("../assets/success.png"),
        error: require("../assets/error.png")
      },
      isUploading: true, //在上传图片阶段 
      isUplodSucess: false, //上传列表上传展示上传完毕或者错误
      chose_imgColor: false,
      textareaColor: false,
      inputTextColor: false,
      color: "#ff0000",
      limitNum: 1,
      formLabelWidth: "80px",
      form: {
        file: ""
      },
      datas: {
        file: "",
        type: "watermark",
        userIds: "900035423"
      },
      //      fileList: [],
      fileImageId: "",
      filelist_ss: [],
      fileListss: [],
      fileLists: [],
      acitons: "https://www.pdf365.cn/v2Api/foxitUpload",
      actionss: "https://www.pdf365.cn/v3Api/upload",
      actionsss: "https://jsonplaceholder.typicode.com/posts/",

      urlss: "",
      uploadFile_list: [], //需要上传的列表信息
     
      sum: 0,
      key: 0,

      //额度
      consume_balance: 0, //上传需要消耗额度
      balance_total: 0, // 用户拥有总额度 
      delated_blance:0,     //处理成功的额度

     //立即开始按钮
      isBtnStartChangesNoback: false, //立即开始后  置灰按钮出来 
      isBtnStart: false, //消除按钮多次触发
      isBtnStartChanges: false, //是否允许开始转换





      fontSize: "42",
      textContent: "", //文字类型的 内容
      NoFileList: true, //加水印功能页面的内容展示
      message: "",
      msg: "this is from commons.vue",
      aa: "",
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],
      messageList: [
        {
          naems: "这个是文件名是解放开绿灯撒经这个是文件名"
        },
        {
          naems: "这个是文件名是解放开绿灯撒经这个是文件名"
        },
        {
          naems: "这个是文件名是解放开绿灯撒经这个是文件名"
        },
        {
          naems: "这个是文件名是解放开绿灯撒经这个是文件名"
        }
      ],
      radio: "1",
      radio1: "",
      isOnFont: true, //字体   true为文字类型
      isOnPlace: true, //方式层 上方
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      fontListSure: {
        fontMessage: "宋体", //字体类型
        value: "SimSun"
      },
      fontList: [
        {
          names: "宋体",
          value: "SimSun"
        },
        {
          names: "黑体",
          value: "SimHei"
        },
        {
          names: "仿宋",
          value: "FangSong"
        },
        {
          names: "楷体",
          value: "KaiTi"
        }
      ],
      opcityListSure: {
        opcityMessage: "不透明度", //透明度
        value: "1"
      },
      opcityList: [
        {
          names: "不透明度",
          value: "1"
        },
        {
          names: "75%",
          value: "0.75"
        },
        {
          names: "50%",
          value: "0.5"
        },
        {
          names: "25%",
          value: "0.25"
        }
      ],
      roteListSure: {
        roteMessage: "不旋转", //旋转角度
        value: "0"
      },
      roteList: [
        {
          names: "不旋转",
          value: "0"
        },
        {
          names: "45°",
          value: "45"
        },
        {
          names: "90°",
          value: "90"
        },
        {
          names: "180°",
          value: "180"
        },
        {
          names: "270°",
          value: "270"
        }
      ],
      bbostlist: [],
      ydydydy: "",
      allComplete: false, //是否上传列表都上传完毕,
      ResultList: [
        // {
        //   index_R:0,  //哪个数据装换成功的标识
        //   docid_R:0,  //哪个数据文档id
        //   jobid_R:0,  //哪个数据的任务id
        //   urls_R:null  //哪个数据的下载地址
        // }
      ], //提交订单-提交任务-查询接口 的数据
      numlists: 0,
      ResultNumList: [],
      lastList: [],
      uploadsOver:false,   //列表中没有任何的上传文件 
      getTimeList:[]     //定时器个数存储
    };
  },
  watch: {
    allComplete(val) {
      //上传完成
      debugger;
      if (
        val &&
        ((this.textContent && this.isOnFont) ||
          (this.fileLists.length > 0 && !this.isOnFont))
      ) {
        this.isBtnStartChanges = true;
      } else {
        this.isBtnStartChanges = false;
      }
    },
    textContent(val) {
      //文字内容
      if (val && this.allComplete) {
        this.isBtnStartChanges = true;
      } else {
        this.isBtnStartChanges = false;
      }
    },
    isOnFont(val) {
      //水印类型
      if (
        this.allComplete &&  ((this.textContent && this.isOnFont) ||  (this.fileLists.length > 0 && !this.isOnFont))
      ) {
        this.isBtnStartChanges = true;
      } else {
        this.isBtnStartChanges = false;
      }
    },
    fileLists(val) {
      //选择图片
      if (
        this.allComplete && (this.fileLists.length > 0)
      ) {
        this.isBtnStartChanges = true;
      } else {
        this.isBtnStartChanges = false;
      }
    },
    fontSize() {
      if (this.fontSize > 100 || this.fontSize < 0 || this.fontSize == 0) {
        this.fontSize = 0;
      } else if (!Number(this.fontSize)) {
        this.fontSize = 0;
      } else {
        this.fontSize = Number(this.fontSize);
      }
    },
    bbostlist(val){
      var nums= val.filter(item=>item.price)
      if(nums==this.key){
          if ( ((this.textContent && this.isOnFont) ||(this.fileLists.length > 0 && !this.isOnFont))
      ) {
        this.allComplete=true;
        this.isBtnStartChanges = true;
      } else {
        this.isBtnStartChanges = false;
      }
    }
  }
  },
  created() {
    var that=this
    this.getUserInfo();
    this.getTypeInfo();
     window.onbeforeunload = function(){
	    if(that.uploadsOver){
	    	return "刷新当前页，正在上传的文件将无法保存，请确认！";
	    } 
	 }
  },
  mounted() {
    var that = this; 
    this.$leoBus.$on("isUploadsOver", () => {
      //监听列表有文件再上传中 
      that.uploadsOver = true;    
    });
    this.$leoBus.$on("noUploadsOver", () => { 
      //监听列表没有有文件再上传中 
      that.uploadsOver = false;    
    });
    this.$leoBus.$on("noMask", () => {
      //获取传递的参数并进行操作
      that.isModal = false;
      that.isBtnStart = false;   //关闭多次触发  开关
    });
    this.$leoBus.$on("allCompleteUpload", () => {
      //所有文件都上传完成
      //获取传递的参数并进行操作
      debugger;
      var statusList = [];
      that.bbostlist.map(function(item) {
        if (item.price) {
          item.singleComplete = true;
        }
        statusList.push(item.price);
      });  
      if (statusList.length == that.key) {
        that.allComplete = true;
      } else {
        that.allComplete = false;
      }
      if(that.key==10){
           
      }
       // 所有文件都上传完毕，开启上传按钮
       var waitingList=that.bbostlist.filter(item=>item['status']==="waiting")
       if(waitingList.length==0){
        this.$leoBus.$emit("btnSarting_btnSarts")
      }
     //判断是否有十个成功文件  成功的个数
        var successNum=that.bbostlist.filter(item=>item['status']==="success")
       this.$leoBus.$emit("successNum",(10-successNum.length))
 


       
    });
    /*    this.$leoBus.$on("allComplete", () => {   //所有都正常上传完毕
      //获取传递的参数并进行操作
      that.allComplete = true;
    });*/
    this.$leoBus.$on("boxlist", params => {
      //每次控件上传列表变化，页面展示也跟着变 (单个文件)  
      that.bbostlist = params;   
    });
    this.$leoBus.$on("fileLists", params => {
      //获取传递的参数并进行操作
      if (params) {
        that.NoFileList = true;
      } else {
        that.NoFileList = false;
      }
    });
    this.$leoBus.$on("sums", nums => {
      //上传总个数
      //获取传递的参数并进行操作
      debugger;
      that.sum += nums;
      that.allComplete = false;
    });
    this.$leoBus.$on("kes", () => {
      //上传完成个数
      //获取传递的参数并进行操作
      debugger;
      that.key++;
    });
    this.$leoBus.$on("consumptionFilePrice", nums => {
      //上传总个数
      //获取传递的参数并进行操作
      debugger;
      that.consume_balance += nums;
    });
    this.$leoBus.$on("uploadFile", nums => {
      //复制订单数据
      //获取传递的参数并进行操作
      debugger;

      var hash = {};
      that.uploadFile_list = nums.reduce(function(item, next) {
        hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
        return item;
      }, []);
    });
  },
  methods: {
  
    //水印内容区域
    mouseEnters(name) {
      this[name] = true;
    },
    mouseLeaves(name) {
      this[name] = false;
    },
    // 选择图片上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      let size = file.size;
      var isTure = true;
      if (size > 31457280) {
        isTure = false;
        this.$message.error("图片最大不允许超过300KB");
      }
      return isTure;
    },
    // 选择图片上传成功时的钩子
    handleSuccess(res, file, fileListss) {
      if (res.httpStatus == 200 && !res.code) {
        this.fileImageId = res.data.imgId;
        this.fileLists.push(file);
      } else {
        this.$message.error(res.message);
      }
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileListss) {
      this.$message.error(err.message);
    },
    //文件列表
    sizeChange(value) {
      if (value < 1024) {
        return value + " byte";
      } else if ((value > 1024 || value == 1024) && value < 1048576) {
        return (value / 1024).toFixed(0) + " KB";
      } else if (value > 1048576 || value == 1048576) {
        return (value / 1048576).toFixed(1) + " MB";
      }
    },
    //删除列表
    delates(num, cancel) {
      if (cancel == "删除") {
        this.consume_balance -= this.bbostlist[num].price;
        this.key--;
        this.sum--;
      }
      if (cancel == "无网络删除") {
        this.sum--;
      } 
      if (cancel == "取消上传") {
        this.sum--;
      }  
      var ls = this.bbostlist.splice(num, 1);
      if (this.bbostlist.length == 0) {
        (this.ResultNumList = []), (this.lastList = []);
      }
      this.$leoBus.$emit("uploadersss", num); 
    },

    //重试
    retry(num) {
      
      this.$leoBus.$emit("retryss", num);
    },
    //用户信息数据
    //获取用户信息
    getUserInfo() {
      var that = this;
      $.ajax({
        type: "get",
        url: "https://www.pdf365.cn/v3Api/getUserInfo",
        xhrFields: {
          withCredentials: true // 携带跨域cookie
        }, 
        success: function(data) {
          if(data.httpStatus==200&&!data.code){
            //"{"data":{"figure":"","balance":"6358.0","nickName":"娟玲","userType":"v1","userId":"900035423","isVip":false},"httpStatus":200,"success":true}"
           
              that.balance_total = data.data.balance;
              //导航栏的头部信息
              that.$leoBus.$emit("user_info", data.data);  
              that.isLogings=true
          }
        
        }
      });
    },
    //获取菜单信息
    getTypeInfo() {
      var that = this;
      $.ajax({
        type: "get",
        url: "https://www.pdf365.cn/v3Api/getTypeInfo",
        data: {
          type: "watermark" //类型
        },
        success: function(data) {  
          that.$leoBus.$emit("free_big", data.data.cornerMark);
          /*{
            "data": {
            "abbrName": "word2pdf",
              "convertType": "Word2PDF",
              "cornerMark": "recommend",
              "id": 5,
              "isFree": false,
              "name": "Word转PDF",
              "pic": "https://www.pdf365.cn/dist/img/u/u50.png",  选择文件上按钮上面的图标
              "type": "convert-PDF",
              "url": "https://www.pdf365.cn/word-to-pdf",
              "weight": "1"
          },
            "httpStatus": 200,
            "success": true
          }*/
        }
      });
    },
    //弹出额度弹窗
    btnStart() {
      // var nus=0
      // var sa=[]
      // this.sa=this.bbostlist

      // this.sa.map(function(item,index){
      //    item.index_u=3
      //    nus++
      // })
      // if(nus==this.bbostlist.length){
      //   this.bbostlist=[]
      //    this.bbostlist= this.sa

      // }

     if (this.isBtnStart) return;   //防止按钮多次触发
      this.isBtnStart = true;
 
     if(!this.isLogings){    
        var url = window.location.href;
        window.location.href = "/userLogin?url=" + encodeURIComponent(url);
        return
     }
     
     if(this.balance_total-this.consume_balance>=0){
        consume_balance: 0, //上传需要消耗额度 
        this.less_than=true
     }else{
       this.less_than=false
     }
     this.isModal=true
     
    this.$leoBus.$emit("ModalisMask")   //打开遮罩
      // this.isBtnStartChangesNoback = true;
      // 
      // this.index_u_status = false;
      // this.ToOrder(this.numlists);
      // this.isDelates=true     //开始处理阶段
      
      


      // if (this.isBtnStart) return;   //防止按钮多次触发
      // this.isBtnStart = true;



      // this.isModal = true;
      // this.$leoBus.$emit("Mask", true);
      // debugger
      // this.$leoBus.$emit("uploadersss");   先屏蔽  看似没用
    },
      //开始转换
    //余额够 开始转换
    GoChanges() {
      this.$leoBus.$emit("ModalNoMask");   //关闭遮罩
      this.noMask();                      //关闭弹窗
      this.isBtnStartChanges = false;       //按钮置灰
      this.ToOrder(this.numlists)           
      this.index_u_status = false;   //  关闭上传列表 开启处理列表
      this.isDelates=true     //开始处理阶段
      this.uploadsOver=true    //监听列表有文件上传
      this.changesOver=false  
      this.$leoBus.$emit("onBbtnSarting"); //开始转换
    },
    //余额不够  关闭弹窗
    NoChagenes() {
      this.noMask(); 
    },
    //额度弹窗 取消
    noMask() {
       this.isBtnStart = false;   //关闭多次触发  开关
      this.isModal = false;
      this.$leoBus.$emit("ModalNoMask");
    },
    //提交订单    numlists = 0;
    ToOrder(numlists) {
      this.ResultList = this.bbostlist;
      var that = this; 
      $.ajax({
        type: "get",
        url: "https://www.pdf365.cn/v3Api/submitOrder",
        xhrFields: {
          withCredentials: true // 携带跨域cookie
        },
        data: {
          docId: this.ResultList[numlists].docid, //文档id
          type: "watermark"
        },
        success: function(data) {
          //     data.httpStatus
          //     data.success
          if (data.httpStatus == 200 && !data.code) {
            if (numlists == that.ResultList.length - 1) {
              that.ResultList[numlists].index_u = 2;
              that.ResultNumList.push(numlists);
              that.numlists = 0;
              that.btnTask(that.numlists);
              
            } else {
              that.ResultNumList.push(numlists);
              that.ResultList[numlists].index_u = 2;
              numlists++;
              that.ToOrder(numlists);
            }
          } else {
            if (numlists == that.ResultList.length - 1) {
              that.ResultList[numlists].index_u = 1;
              that.ResultList[numlists].message_y = data.message;
              that.numlists = 0;
              that.ToOrder(numlists);
              if (that.ResultNumList.length > 0) {
                that.btnTask(that.numlists);
              } else {
                that.bbostlist = [];
                that.bbostlist = that.ResultList;
                that.$leoBus.$emit("btnSarted"); //结束转换  
                that.delateing=false  //  处理中结束    处理结果出来    
                that.uploadsOver=false    //监听列表有文件上传
              }
            } else {
              that.ResultList[numlists].index_u = 1;
              that.ResultList[numlists].message_y = data.message;
              numlists++;
              that.ToOrder(numlists);
            }
          }
        }
      });

      // that.ResultList.map(function(item, index) {
      //   num = index;
      //   $.ajax({
      //     type: "get",
      //     url: "https://www.pdf365.cn/v3Api/submitOrder",
      //     xhrFields: {
      //       withCredentials: true // 携带跨域cookie
      //     },
      //   async: false,
      //     data: {
      //       docId: item.docid, //文档id
      //       type: "watermark"
      //     },
      //     success: function(data) {
      //       //     data.httpStatus
      //       //     data.success
      //       if (data.httpStatus == 200 && !data.code) {
      //         item.index_u = 2;
      //         that.btnTask(index,item.docid);
      //       } else {
      //         item.index_u = 1;
      //         item.message_y= data.message;
      //       }
      //     }
      //   });
      // });
    },
    //提交任务 扣额度
    btnTask(numlists) {
      var that = this;
      // var listDate = {
      //   text: this.textContent, //文字类型的 内容
      //   opcity: this.opcityListSure.value, //透明度that.opcityMessage
      //   fontName: this.fontListSure.value, //字体名称
      //   fontSize: this.fontSize, //字体大小
      //   color: "#666666", //文字颜色
      //   startPage: "0", //默认参数
      //   endPage: "-1", //默认参数
      //   bOnTop: this.isOnPlace //放置层
      // };
         var listDate = {
        text: this.textContent, //文字类型的 内容
        opcity: 0.2, //透明度that.opcityMessage
        fontName: this.fontListSure.value, //字体名称
        fontSize: 40, //字体大小
        color: "#666666", //文字颜色
        startPage: 0, //默认参数
        endPage: -1, //默认参数
        bOnTop: this.isOnPlace?true:false //放置层
      };
      var listDate_img = {
        opcity: this.opcityListSure.value, //透明度that.opcityMessage
        rotate: this.roteListSure.value, //旋转角度
        startPage: "0", //默认参数
        endPage: "-1", //默认参数
        bOnTop: this.isOnPlace, //放置层
        imgBuffer: that.fileImageId
      };
      $.ajax({
        type: "POST",
        url: "https://www.pdf365.cn/v3Api/submitTask",
        xhrFields: {
          withCredentials: true // 携带跨域cookie
        },
        async: false,
        data: {
          markdata: that.isOnFont
            ? JSON.stringify(listDate)
            : JSON.stringify(listDate_img),
          docId: that.ResultList[that.ResultNumList[numlists]].docid, //文档id
          type: that.isOnFont ? "text-watermark" : "pic-watermark" //text-watermark（文本水印），pic-watermark（图片水印）
        },
        success: function(data) {
          if (data.httpStatus == 200 && !data.code) {
            if (numlists == that.ResultNumList.length - 1) {
              that.ResultList[that.ResultNumList[numlists]].index_u = 2;
              that.lastList.push(that.ResultNumList[numlists]);
              that.ResultList[that.ResultNumList[numlists]].jobId_d =
                data.data.jobId;
              that.numlists = 0;
              that.btnQuerNum = 0;


              var setTimeList=[];
              for(var k=0,lens=that.ResultNumList.length;k<lens;k++){
                    (function(e) {
                      setTimeList[e] =setInterval(function() {
                        console.log(e)
                           that.btnQuery(that.ResultList[that.ResultNumList[e]].docid,that.ResultList[that.ResultNumList[e]].jobId_d);
                        }, 1000); 
                    })(k); 
                    var obj={}
                    obj[that.ResultList[that.ResultNumList[k]].docid]=setTimeList[k]
                      that.getTimeList.push(obj)
              } 
            } else {
              that.ResultList[that.ResultNumList[numlists]].index_u = 2;
              that.lastList.push(that.ResultNumList[numlists]);
              that.ResultList[that.ResultNumList[numlists]].jobId_d =
                data.data.jobId;
              numlists++;
              that.btnTask(numlists);
            } 
          } else {
            if (numlists == that.ResultNumList.length - 1) {
              that.ResultList[that.ResultNumList[numlists]].index_u = 1;
              that.ResultList[that.ResultNumList[numlists]].message_y =
                data.message;
              that.numlists = 0;
              if (that.lastList.length > 0) {
                that.btnTask(that.numlists);
              } else {
                that.bbostlist = [];
                that.bbostlist = that.ResultList;
                that.$leoBus.$emit("btnSarted"); //结束转换 
                that.delateing=false  //  处理中结束    处理结果出来      
                that.uploadsOver=false    //监听列表有文件上传
              }
            } else {
              that.ResultList[that.ResultNumList[numlists]].index_u = 1;
              that.ResultList[that.ResultNumList[numlists]].message_y =
                data.message;
              numlists++;
              that.btnTask(numlists);
            } 
          }
        }
      }); 
    },
    //idnex_d,jobId_d,Docid_d
    btnQuery(docid,jobId_d) {
      var that = this;
      //查询接口
      $.ajax({
        type: "get",
        url: "https://www.pdf365.cn/v3Api/queryTask",
        xhrFields: {
          withCredentials: true // 携带跨域cookie
        },
        async: false,
        data: {
          docId:docid, //文档id
          jobId: jobId_d //   任务id
        },
        success: function(data) {
          if (data.httpStatus == 200 && !data.code) {
            var daocidData=data.data.docId
            if (data.data.state == "SUCCESS") { 
              that.delatedNum++
              that.ResultList.map(function(item){
                if(item.docid==daocidData){
                  that.delated_blance=that.delated_blance+item.price
                  item.url_d=data.data.downloadUrl; 
                  item.index_u=4;
                }
              }) 
                 that.bbostlist = [];
                 that.bbostlist = that.ResultList; 
                //  that.getTimeList.map(function(item){
                //         if(item[daocidData]){

                //         }
                //  })
                var clearList=that.getTimeList.filter(item=>item[daocidData])
                 clearInterval(clearList[0][daocidData])
                var nums=that.ResultList.filter(item=>item.index_u)
                if(nums.length==that.lastList.length){
                    that.$leoBus.$emit("btnSarted"); //结束转换  
                    that.delateing=false  //  处理中结束    处理结果出来  
                    that.changesOver=false    //处理结束后 开启水印内容置灰按钮    
                    that.uploadsOver=false    //监听列表有文件上传
                }  

              // if (numlists == that.lastList.length - 1) {
              //   that.bbostlist = [];
              //   that.ResultList[that.lastList[numlists]].index_u = 4;
              //   that.ResultList[that.lastList[numlists]].url_d =    data.data.downloadUrl;
              //   that.bbostlist = that.ResultList;
              //   that.numlists = 0;


              //   that.$leoBus.$emit("btnSarted"); //结束转换 
              //   that.delateing=false  //  处理中结束    处理结果出来  
              //   that.changesOver=false    //处理结束后 开启水印内容置灰按钮    
              //   that.uploadsOver=false    //监听列表有文件上传
              // } else {
              //   that.ResultList[that.lastList[numlists]].index_u = 4;
              //   that.ResultList[that.lastList[that.lastList[numlists]]].url_d =
              //     data.data.downloadUrl; 
              //   numlists++;
              //   that.btnQuery(numlists);
               //}
            } else if (data.data.state == "FAIL") {
                that.ResultList.map(function(item){
                  if(item.docid== docid){ 
                    item.message_y="转换失败【服务异常，请联系客服】";
                    item.index_u=1;
                    }
                }) 
                 that.bbostlist = [];
                 that.bbostlist = that.ResultList;  
                var clearList=that.getTimeList.filter(item=>item[docid])
                 clearInterval(clearList[0][docid])
                var nums=that.ResultList.filter(item=>item.index_u)
                if(nums.length==that.lastList.length){
                    that.$leoBus.$emit("btnSarted"); //结束转换  
                    that.delateing=false  //  处理中结束    处理结果出来  
                    that.changesOver=false    //处理结束后 开启水印内容置灰按钮    
                    that.uploadsOver=false    //监听列表有文件上传
                }    
            }
          } else {
               that.ResultList.map(function(item){
                  if(item.docid== docid){ 
                    item.message_y="转换失败【服务异常，请联系客服】";
                    item.index_u=1;
                    }
                }) 
                 that.bbostlist = [];
                 that.bbostlist = that.ResultList;  
                var clearList=that.getTimeList.filter(item=>item[docid])
                 clearInterval(clearList[0][docid])
                var nums=that.ResultList.filter(item=>item.index_u)
                if(nums.length==that.lastList.length){
                    that.$leoBus.$emit("btnSarted"); //结束转换  
                    that.delateing=false  //  处理中结束    处理结果出来  
                    that.changesOver=false    //处理结束后 开启水印内容置灰按钮    
                    that.uploadsOver=false    //监听列表有文件上传
                }    
            } 
          }
          //这边可能需要做一次遍历
          //     data.state   任务状态
          //     data.downloadUrl   下载url地址
       
      });

      // $.ajax({
      //   type: "get",
      //   url: "https://www.pdf365.cn/v3Api/queryTask",
      //   xhrFields: {
      //     withCredentials: true // 携带跨域cookie
      //   },
      //   async: false,
      //   data: {
      //     docId: that.ResultList[idnex_d].docid, //文档id
      //     jobId: jobId_d //   任务id
      //   },
      //   success: function(data) {
      //     if (data.httpStatus == 200 && !data.code) {
      //       if (data.data.state == "SUCCESS") {
      //         console.log(data.data.downloadUrl )

      //           // that.ResultList[idnex_d]
      //                     that.bbostlist=[]
      //                   that.ResultList[idnex_d].url_d=data.data.downloadUrl
      //                   that.bbostlist= that.ResultList

      //           // that.ResultList.map(function(items){
      //           //   if(items.docid==Docid_d){
      //           //          that.bbostlist=[]
      //           //         items.url_d=data.data.downloadUrl
      //           //         that.bbostlist= that.ResultList
      //           //   }

      //           // })

      //         // alert(this.urlss);
      //         // console.log(this.urlss);
      //         // clearInterval(that.dd);
      //       } else if (data.data.state == "FAIL") {
      //         // clearInterval(that.dd);
      //              that.bbostlist=[]
      //             that.ResultList[idnex_d].index_u = 1;
      //             that.ResultList[idnex_d].message_y="转换失败"
      //                   that.bbostlist= that.ResultList
      //       } else if (data.data.state == "RUNNING") {
      //         if (that.btnQuerNum > 10) {
      //           clearInterval(that.dd);
      //             that.ResultList[idnex_d].index_u = 1;
      //             that.ResultList[idnex_d].message_y="转换失败"
      //         }
      //         that.dd = setTimeout(function() {
      //           var numnewNumber = that.btnQuerNum;
      //           that.btnQuerNum = numnewNumber + 1;
      //           that.btnQuery(idnex_d,jobId_d);
      //         }, 2000);
      //       }
      //     } else {
      //           that.bbostlist=[]
      //           that.ResultList[idnex_d].index_u = 1;
      //           that.ResultList[idnex_d].message_y=data.message
      //            that.bbostlist= that.ResultList
      //       // that.$message.error(res.message);
      //       // that.isBtnStart = false;
      //     }
      //     //这边可能需要做一次遍历
      //     //     data.state   任务状态
      //     //     data.downloadUrl   下载url地址
      //   }
      // });
    },
    fontSelect(item) {
      //字体选择  
      this.fontListSure = {
        fontMessage:item.names,
        value:item.value
      }
    },
    opcitySelect(item) {
      debugger
      // this.opcityListSure = JSON.parse(JSON.stringify(item)); 
       this.opcityListSure = {
        opcityMessage:item.names,
        value:item.value
      }
    },
    roteSelect(item) { 
      this.roteListSure = {
        roteMessage:item.names,
        value:item.value
      }
    },
    colorSelect(item){
       this.colorListSure = {
        colorMessage:item.names,
        value:item.value
      } 
    },

    checks(value) {
      //类型
      if (value == "1") {
        this.isOnFont = true;
      } else {
        this.isOnFont = false;
      }
    },
    placeW(value) {
      //放置层
      debugger;
      if (value == "1") {
        this.isOnPlace = true;
      } else {
        this.isOnPlace = false;
      }
    }
  },

  components: {
    "m-selects_color":MSelectsColor,
    "m-selects": MSelects,
    "m-progress": MProgress
  }
};
</script>

<style lang='scss' scoped>
.addWater_list {
  .contains_content {
    
      -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
    width: 1119px;
    margin: 0 auto;
    background: #ffffff;
    padding: 46px 49px 137px 32px;
    position: relative;
    .contains_content_Otitle {
      .circularOne {
        width: 33px;
        height: 33px;
        display: inline-block;
        background: #ff8e68;
        line-height: 33px;
        text-align: center;
        color: #ffffff;
        border-radius: 24px;
        margin-right: 18px;
        font-style: normal;
        font-size: 14px;
      }
      span {
        font-size: 18px;
        color: #666666;
      }
    }
    .Processing_state {
      margin-top: 18px;
      margin-bottom: 24px;
      .el-icon-loading {
        margin-left: 50px;

      }
      .el-icon-delate_success{
        width: 20px;
        height: 20px;
        position: relative;
        margin-left: 50px;
        top: 7px;
        background: url("../assets/success_1.png") no-repeat
      
      }
      span {
        font-size: 14px;
        color: #666666;
      }
      .Processing_state_success {
        display: inline-block; 
        font-size: 14px;
        margin-left: 50px;
        a { 
        color: #666666;
        }
      }
      .Processing_delate_success{
        display: inline-block; 
        font-size: 14px; 
        a { 
        color: #666666;
        }
      }
      .process_change_status {
        margin-left: 34px;
        a {
          color: #ff8e68;
          font-size: 14px;
          text-decoration: underline;
        }
      }
    }
    .contents_message {
      margin-left: 33px;
      li:nth-child(odd) {
        background: #f8f8f8;
      }
      li {
        height: 40px;
        /*   height: 40px;
               line-height: 40px;*/
        font-size: 12px;
        background: #ffffff;
        .message_names {
          padding-left: 17px;
          margin-right: 68px;
          width: 503px;
          display: inline-block;
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #5e5e5e;
        }
        .message_states {
          margin-right: 38px;
          width: 324px;
          display: inline-block;
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          color: #5e5e5e;
          .message_states_Ones {
            margin-right: 85px;
            display: inline-block;
            width: 69px;
          }
          .message_states_Twos {
            color: #ed4343;
            letter-spacing: 1px;
          }
          .circle {
            display: inline-block;
            margin-bottom: 0;
            background: #e4e4e4;
            height: 6px;
            border-radius: 3px;
            width: 108px;
            margin-right: 15px;
            .circle_children {
              background: #ff6833;
              height: 6px;
              width: 57%;
              border-radius: 3px;
            }
          }
          .message_states_fours {
          }
          /*width: 292px;*/
          /*height: 40px;*/
          /*display: inline-block;*/
          /*background: green;*/
          /*.states_one{*/
          /*display: inline-block;*/
          /*}*/
        }
        .loading_states {
          display: inline-block;
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          width: 120px;
          float: right;
          color: #5e5e5e;
          cursor: pointer;
          a {
            color: #5e5e5e;
          }
        }
        .loading_states:hover {
          color: #ff8e68;
          a {
            color: #ff8e68;
          }
        }
      }
    }
    .contains_content_Ttitle {
      margin-top: 45px;
      .circularOne {
        width: 33px;
        height: 33px;
        display: inline-block;
        background: #ff8e68;
        line-height: 33px;
        text-align: center;
        color: #ffffff;
        border-radius: 24px;
        margin-right: 18px;
        font-style: normal;
        font-size: 14px;
      }
      span {
        font-size: 18px;
        color: #666666;
      }
    }
    .Water_types {
      margin-left: 90px;
      margin-top: 14px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      span {
        color: #333333;
        margin-right: 20px;
      }
    }
    .Water_inputWord {
      margin-top: 25px;
      margin-left: 62px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      textarea {
        margin-left: 26px;
        vertical-align: top;
        width: 212px;
        height: 34px;
        resize: none;
        padding: 8px;
        border-color: #d2d2d2;
        outline: none;
        border-radius: 2px;
      }
      .changesOver{
cursor: not-allowed;
      -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
      }
    }
    .Water_font {
      margin-left: 90px;
      margin-top: 19px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      .selects {
        color: #333333;
        /*       font-size: 14px;*/
        margin-left: 26px;
        display: inline-block;
        .changesOver{
   width: 110px;position:relative;
                    background:#EBEBE4;
    height: 30px;line-height:30px;
    border:0.5px solid #d2d2d2;
    position: relative;text-indent:10px;
    top: 1px;cursor: not-allowed;
    img{
       top: 14px;
    position: absolute;
    right: 7px;
    }
        }
      }
      .inputText {
        color: #333333;
        width: 40px;
        height: 27px;
        border-radius: 2px;
        position: relative;
        line-height: 29px;
        text-align: center;
        border: 1px solid #378888;
        border-color: #d2d2d2;
        border-right: none;
        top: 0;
      }

      input:focus {
        outline: none;
      }
      .unit {
        display: inline-block;
        width: 37px;
        height: 31px;
        background: #efefef;
        color: #666666;
        line-height: 30px;
        text-align: center;
        position: relative;
        top: 0;
        left: -5px;
      }
      .bgColorS {
        display: inline-block;
        width: 55px;
        height: 30px;
        // background: #666666;
        // line-height: 30px;
        // text-align: center;
        position: relative;
        top: 6px;
        left: -4px;
        .changesOver{
             width: 54px;
    background: rgb(235, 235, 228);
    height: 30px;
    line-height: 30px;
    border: 0.5px solid rgb(210, 210, 210);
    position: relative;
    text-indent: 10px;
    top: 5px;
    border-radius: 2px;
    cursor: not-allowed;position:relative;
    div{
      width: 23px;
    height: 20px;
    background: red;
    margin-top: 5px;
    margin-left: 7px;
    img{
       top: 14px;
    position: absolute;
    right: 7px;
    }
    }
        }
      }
    }
    .transparency {
      margin-left: 76px;
      margin-top: 25px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      .selects {
        color: #333333;
        /*       font-size: 14px;*/
        margin-left: 26px;
        border-color: #d2d2d2;
        outline: none;
        display: inline-block;
      }
      span {
        position: relative;
        top: -2px;
      }
      .changesOver{
   width: 110px;position:relative;
                    background:#EBEBE4;
    height: 30px;line-height:30px;
    border:0.5px solid #d2d2d2;
    position: relative;text-indent:10px;
    top: 1px;cursor: not-allowed;
    img{
      top: 14px;
    position: absolute;
    right: 7px;
    }
      }
    }
    .Placing_layer {
      margin-left: 76px;
      margin-top: 25px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      span {
        color: #333333;
        margin-right: 20px;
      }
    }
    .upImg {
      margin-left: 62px;
      margin-top: 25px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      .chose_img {
        display: inline-block;
        border: 1px solid #dbdbe1;
        width: 108px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        color: #333333;
        font-size: 14px;
        margin-left: 26px;
        background: #f5f5f7;
        cursor: default;
        .chose_img_btn {
          color: #333333 !important;
          height: 33px;
          line-height: 10px;
          width: 108px;
          border: none;
          background: #f5f5f7;
        }
      }
      .tips {
        font-size: 12px;
        color: #797979;
        position: relative;
        top: 11px;
      }
      .imgName {
        display: inline-block;
        height: 23px;
        position: relative;
        width: 283px;
        top: 11px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        img {
          display: inline-block;
          margin-right: 7px;
          vertical-align: sub;
        }
      }
      .changesOver{
   width: 110px;position:relative;
                    background:#EBEBE4;
    height: 30px;line-height:30px;
    border:0.5px solid #d2d2d2;
    position: relative;text-indent:10px;
    top: 1px;cursor: not-allowed;display: inline-block;
    margin-left: 25px;
      }
    }
    .roteImg {
      margin-left: 62px;
      margin-top: 25px;
      font-size: 14px;
      .title {
        color: #000000;
      }
      .selects {
        color: #333333;
        /*       font-size: 14px;*/
        margin-left: 26px;
        display: inline-block;
      }
      .changesOver{
   width: 110px;position:relative;
                    background:#EBEBE4;
    height: 30px;line-height:30px;
    border:0.5px solid #d2d2d2;
    position: relative;text-indent:10px;
    top: 1px;cursor: not-allowed
      }
    }
    .btnStart {
      width: 136px;
      height: 47px;
      line-height: 48px;
      text-align: center;
      margin-left: 64px;
      margin-top: 30px;
      color: #a2a1a2;
      background: #f3f3f3;
      letter-spacing: 1px;
      border-radius: 4px;
      font-size: 15px;
      cursor: default;
      -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
      img{
         top: 14px;
    position: absolute;
    right: 7px;
      }
    }
    .btnStart.active {
      color: #ffffff;
      background: #ff8e68; 
      cursor: pointer;
    }
    .OnAcitve {
      color: #ff8e68 !important;
    }
  }
  .Modal {
    width: 470px;
    background: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -180px;
    margin-left: -235px;
    z-index: 3;
    .header {
      width: 100%;
      height: 43px;
      line-height: 43px;
      background: #4d4d4d;
      font-size: 15px;
      color: #f2f2f2;
      .header_title {
        margin-left: 20px;
      }
      .header_modal_close {
        float: right;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .content {
      padding-top: 45px;
      p {
        font-weight: 400;
        color: #797979;
        font-size: 13px;
        text-align: center;
        line-height: 26px;
      }
      .content_Btns {
        margin: 32px auto 28px;
        overflow: hidden;
        width: 275px;
        div {
          display: inline-block;
          width: 126px;
          height: 38px;
          line-height: 38px;
          font-weight: 400;
          font-style: normal;
          font-size: 13px;
          text-align: center;
          border-radius: 3px;
          float: left;
          cursor: pointer;
        }
        .btn_l {
          color: #fff;
          border: none;
          background: #ff6833;
          margin-right: 20px;
          a {
            color: #fff;
            display: block;
          }
        }
        .btn_r {
          color: #797979;
          background: #fff;
          border: 1px solid #ccc;
        }
      }
      .footer {
        width: 100%;
        height: 42px;
        line-height: 42px;
        background: #faf2d3;
        p {
          float: left;
          font-size: 14px;
          color: #797979;
          line-height: 26px;
          margin-top: 8px;
          margin-left: 20px;
        }
        a {
          width: 91px;
          height: 25px;
          border-radius: 3px;
          background: #ff5359;
          color: #fff;
          line-height: 25px;
          font-size: 14px;
          float: right;
          text-align: center;
          margin: 10px 10px 0 0;
        }
      }
    }
  }
  .actices:focus {
    border-color: #ff8e68 !important;
    // outline:Blue Solid 1px !important;
  }
  .acticess {
    border-color: #ff8e68 !important;
  }
  textarea:focus {
    // border-color: #ff8e68 !important;
    border-color: #ff8e68 !important;
  }
}
</style>
