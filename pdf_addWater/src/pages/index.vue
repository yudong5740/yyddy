<template>
  <div class="index">
    <h3>{{msg}}</h3>
    <router-link to="/abouts">to about</router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'this is from index.vue'
    }
  }
}
/*       $.ajax({
 type: "get",
 url: 'https://www.pdf365.cn/helps',
 success: function (data) {
 var All_LIST=data
 /!*      var All_LIST={"data":["caiwzh-titile","随便测测","范德萨","PDF365","96796777","99999999999999999999","88888888888888888","777777777777777777777","6666666666666666666","55555555555555555555555","444444444444","33333333333","PDF旋转攻略测试3","PDF旋转攻略测试","PDF旋转攻略测试PDF旋转攻略","我的第一我的第一我的第一我的第一我的第一我的第一我的第","第二第二第二第二第二第二第二第二第二第二第二第二第二第","返回发大水范德萨分大神发的说法很大撒发大水发送发","返回发大水范德萨分大神发的说法很大撒发大水发送发","fff大方福返回发大水范德萨分大神发的说","测试测试","发酒疯哈佛","奶昔","gdsgadsgsgdasgdasg","aaaaaa","表格表","表格测试","云林县","澎湖县","中国大陆","台湾  ","澎湖湾","舟山","歌词","王者荣耀34","乐曲内容","简介 编辑","歌曲简介","作品正文","王者荣耀2","王者荣耀","王者荣耀","PDF文件转换成Word格式的最佳办法","如何在线把PDF转换成图片","在线PDF转换成Excel如何操作","在线PDF转换成HTML图文教程","如何在线去除PDF文档密码","如何在线将PDF转换成Word","福昕操作手册","测试一额是是我了去不就是一额是是我了去不就是从帮帮帮","一二三四无六器吧就十一二三四无六器吧就十一二三四无六器吧就十","FoxitFoxitFoxitFoxitFoxitFoxitFoxitFoxitFoxitFoxitFoxitFoxit","在线PDF转换成HTML图文教程","如何在线去除PDF文档密码","如何在线将PDF转换成Word","PDF365","图片测试6666","Linux 格式化和挂载数据盘","服务器要求","文件目录结构","创建模块控制器类","开发流程","V9产品介绍","phpsso 简介","测试回车回车回车","图片显示","站点管理","网页模板","自动贩卖机是怎么工作的？里面到底有没有老爷爷蹲着...","【2018年物种日历】4月12日 丰年虾","超级耀斑爆发掐灭三体行星生机"]}
 *!/this.list=All_LIST.data
 }

 });*/
</script>

<style lang='scss' scoped>
.index{

}
</style>
