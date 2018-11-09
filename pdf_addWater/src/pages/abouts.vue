<template>
  <div class="abouts">
1212
    <div style="width:55px;    display: inline-block;">
      <m-mst :itemList='fontList'  :message='fontListSure.fontMessage' ></m-mst>
    </div>
    <div @click="qq">77</div>
    
<!-- href="http://wpa.qq.com/msgrd?v=1&uin=888888888&site=qq&menu=yes" -->
  <!-- tencent://message/?uin=2852373735&Site=qq&Menu=yes -->
    <!-- <a  href="http://wpa.qq.com/msgrd?v=1&uin=2852373735&site=qq&menu=yes" target="_blank">qq</a>

    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2852373735&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:客服QQ号码:41" alt="QQ客服" title="QQ客服"/></a> -->

  <!-- <m-p></m-p>
    <div class="vue-progress-bar default-theme">
      <div class="vue-progress-bar__tip">

      </div>
      <div class="vue-progress-bar__outer">
      </div>
    </div>
    <router-link to="/others">to bbox</router-link>
    <ul>
      <li class="ab">
        <a>nihao </a>
      </li>
    </ul>
    <el-form :model="form">
      <el-form-item label="上传文件" :label-width="formLabelWidth">
        <el-upload
          ref="uploadExcel"
          action="https://www.pdf365.cn/v3Api/upload"
          :multiple="true"
          :auto-upload="true"
          :before-upload="beforeUploadFile"
          :on-exceed="exceedFile"
          :on-success="handleSuccess"
          :data="datas"
          :on-error="handleError"
          :file-list="fileList">
          <el-button size="small" plain>选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xlsx(Excel2007)文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
    <div @click="delats"> 225</div>
    <div v-if="fileLists.length>0">{{fileLists[fileLists.length-1].name}}</div> -->




     <!-- <input type="file" name="file" id="fileUpload"> -->
     <div @click="nums">0000</div>
     <div>{{ms}}</div>
     <div @click="goweb">go  web</div>
     <div @click="closes">closes</div>
     <div @click="clorTime">clorTime</div>
  </div>
</template>

<script>
import mst from "../business/seletcs_color.vue";
import MSelects from "../business/selects.vue";
import Mpp from "../business/progress.vue";
import MP from "../business/progress";
export default {
  name: "abouts",
  data() {
    return {
      fontListSure: {
        fontMessage: "#000000", //字体类型
        value: "#000000"
      },
      fontList: [
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
          value: "#ffd800"
        },
        {
          names: "#0084ff",
          value: "#0084ff"
        },
        {
          names: "#35af0a",
          value: "#35af0a"
        }
      ],
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
      fileList: [],
      fileLists: [],
      acitons: "https://www.pdf365.cn/v2Api/foxitUpload",
      actionss: "https://www.pdf365.cn/v3Api/upload",
      actionsss: "https://jsonplaceholder.typicode.com/posts/",
      proBar: 40,
      ms: 0,
         set : [],
         get:[],
         tiems:null,
    };
  },
  components: {
    "m-mst": mst,
    "m-p": Mpp,
    mms: MSelects
  },
  created() {
    var that = this;
    window.onbeforeunload = function() {
      if (that.ms > 5) {
        return "刷新当前页，正在上传的文件将无法保存，请确认！";
      }
    };
    this.fors();
    // this.forrs()
  },
  methods: {
    forrs(){
      this.tiems=setInterval(function() {
            console.log(111);
          }, 1000);
     this.set[0]={
       1111212:this.tiems
     }
    },
    clorTime(){
      var that=this
      clearInterval(that.set[0]["1111212"])
    },
    fors() {
      var ls = [
        { a: "111111", b: 4 },
        { a: "2222222", b: 4 },
        { a: "333333", b: 4 },
        { a: "44444", b: 4 },
        { a: "55555", b: 4 }
      ];
   var that=this
      for (var k = 0, lens = ls.length; k < lens; k++) {
       this.set[k] = ls[k].a;
        // set[k] = setInterval(function() {}, 1000)
        (function(e) {
         that.set[e] =setInterval(function() {
            console.log(ls[e].a);
          }, 1000);
          
        })(k); 
        var obj={}
        obj[ls[k].a]=that.set[k]
          that.get.push(obj)
      }
    },
    closes() {
      var that=this
      clearInterval(that.get[1]["2222222"]);
    },
    goweb() {
      window.location.href = "www.baidu.com";
    },
    nums() {
      this.ms++;
    },
    qq() {
      if (document.getElementsByClassName("class_qidian_wpa").length > 1) {
        document.getElementsByClassName("class_qidian_wpa")[0].remove();
      }
      document
        .getElementById("qidian_wpa_2852066922_17")
        .contentWindow.document.getElementsByTagName("a")[0]
        .click();
    },
    delats() {
      this.fileList = [];
      this.fileLists = [];
    },
    open() {
      this.$refs.uploadExcel.open();
    },
    delates() {
      this.fileList.splice(0, 1);
    },
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: "警告",
        message: `只能选择 ${
          this.limitNum
        } 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      debugger;
      this.fileLists = fileList;
      //      console.log('change')
      //      console.log(file)
      this.form.file = file.raw;
      //      console.log(this.form.file)
      //      console.log(fileList)
      this.fileLists = fileList;
      console.log(this.fileLists);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      debugger;

      this.fileLists.push(file);
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$notify.warning({
          title: "警告",
          message: `只能上传Excel2017（即后缀是.xlsx）的文件`
        });
      }
      var is = true;
      if (size < 0.00018024444580078135) {
        is = false;
        //         0.0025339126586914062
        this.$notify.warning({
          title: "警告",
          message: `文件大小不得超过10M`
        });
      }

      return is;
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      debugger;
      console.log(file);
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: `文件上传失败`
      });
    },
    uploadFile() {
      this.$refs.uploadExcel.submit();
      /*
       let formData = new FormData()
       formData.append('file', this.form.file)
       axios.post('https://jsonplaceholder.typicode.com/posts/',
       formData,
       { "Content-Type": "multipart/form-data" }
       )
       .then(res => {
       console.log('res')
       console.log(res)
       })
       .catch(err => {

       })
       */
    }
  }
};
</script>

<style lang='scss' scoped>
.ab {
  color: blue;
}
.abouts {
  .actice:focus {
    border-color: #ff8e68 !important;
  }
  li {
    height: 30px;
    line-height: 30px;
    text-indent: 10px;
    font-size: 14px;
    color: #333333;
    background: #f9f9f9;
  }
  .abc {
    background: #ececec;
  }
  li:hover {
    background: #ececec;
  }
}
</style>
