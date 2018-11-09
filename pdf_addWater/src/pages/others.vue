<template>
  <div class="others">
<el-upload
  class="upload-file"
  drag
  :action="doUpload"
  :before-upload="beforeUpload"
  ref="newupload"
  multiple
  :auto-upload="false">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
</el-upload>
  



    <ul>
      <li v-for="item in list">{{item}}</li>
    </ul>
<!--    <div>others</div>
     <div>{{aa}}</div>-->
    <router-link to="/addWater">to addWater</router-link>
    <router-view/>

  </div>
</template>

<script>

  import $ from 'jquery'
export default {
  name: 'others',
  data () {
    return {
      msg: 'this is from abouts.vue',
      list:"",
      aa:""
    }
  },

  mounted(){

    var that=this
       $.ajax({
     type: "get",
     url: 'https://www.pdf365.cn/helps',
     success: function (data) {
     var All_LIST=JSON.parse(data)
       console.log(All_LIST)
       that.list=All_LIST.data  
     } 
     });


     
/*          $.ajax({
     type: "get",
     url: 'http://www.pdf365.cn/helps',
     success: function (data) {

     that.aa=data.descr

     }

     });*/
   /* $.ajax({
      async : true,
      url: 'https://www.pdf365.cn/helps',

      type : "GET",
      dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
      jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
      jsonpCallback: 'handleResponse', //设置回调函数名
      data : {
        q : "javascript",
        count : 1
      },
      success: function(data){
          console.log(data)
   /!*     console.log('状态为：' + status + ',状态是：' + xhr.statusText);
        console.log(response);*!/
      },  error: function (XMLHttpRequest, textStatus, errorThrown) {
          debugger
        // 状态码
        console.log(XMLHttpRequest.status);
        // 状态
        console.log(XMLHttpRequest.readyState);
        // 错误信息
        console.log(textStatus);
      }
    });*/

 /*   $.ajax({
      async : true,
      url : "https://api.douban.com/v2/book/search",

      type : "GET",
      dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
      jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
      jsonpCallback: 'handleResponse', //设置回调函数名
      data : {
        q : "javascript",
        count : 1
      },
      success: function(data){
        console.log(data)
        /!*     console.log('状态为：' + status + ',状态是：' + xhr.statusText);
         console.log(response);*!/
      }, error: function(jqXHR, textStatus) {
        // 此时textStatus为‘timeout’
//        $('#main-content').text('error'); alert('JSONP error!');
      }
    });*/
  },
  methods: {
    beforeUpload(file){
      debugger
    let fd = new FormData();
    fd.append('file',file);//传文件
    fd.append('srid',this.aqForm.srid);//传其他参数
    axios.post('/api/up/file',fd).then(function(res){
      debugger
            alert('成功');
    })
},
newSubmitForm(){//确定上传
    this.$refs.newupload.submit();
},
    clickFn () {
      alert('about')
    },

    clickFns () {
      var that=this
      $.ajax({
        type: "get",
        url: 'https://m.edit.foxitreader.cn/api/getWebExeDownload',
        dataType: "jsonp",
        jsonp: 'jsonpcallback',
        success: function (data) {

          that.list=data.id

        }

      });

      console.log(2)
      /*$.ajax({
        url: "https://wechatmp.foxitreader.cn/api/miniProgramLogin_foxit",
        context: document.body,
        success: function(){
        $(this).addClass("done");
      }});*/
    }
  }
}
</script>

<style lang='scss' scoped>
.others {
}
</style>
