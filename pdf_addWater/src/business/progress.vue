<template>
    <div class="abouts">
      <div>
        <div :style="[{width:widths},{height: heights},{background: bgColors}]" style="    border-radius: 55px;">
          <div :style="[{height: heights},{background: childColors},{width:price+'%'}] " style="    border-radius: 55px;" ></div>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
      name: '',
      data(){
        return{
          price:0,
          mumm:0
        }
      },
      props:{
        beginPro:{
          type:Number,
          default:1
        },
        endPro:{
          type:Number,
          default:100
        },
        heights:{
          type:String,
          default:'6px'
        },
        widths:{
          type:String,
          default:'300px'
        },
        bgColors:{
          type:String,
          default:"#e4e4e4"
        },
        childColors:{
          type:String,
          default:"#ff6833"
        },

      },
      created(){
        this.price=this.beginPro
      },
      watch: {
        price: function (val) { 
          var that=this
          setTimeout(function () {
            if(that.price>that.endPro){
              that.price
            }else {
              that.price=Math.ceil(Math.random()*10)+that.price
            }
          },300)

        }
      }
    }
</script>

<style lang='scss' scoped>
    .about {
    }
</style>
