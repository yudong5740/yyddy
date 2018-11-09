<template>
  <div class="selects_Contains" id="myPanels">
    <div  >
      <div type="text"  v-model="names"  :class="{select_input:true ,actice:panelShow,actices:nid}"   readonly  unselectable="on"       @click="abss"       v-outside-click="handleFocus"  @mouseenter="enter()" @mouseleave="leave()">
        <div class="color_box" style="width:23px;height:20px;background:red;margin-left:-3px;margin-top:5px;    display: inline-block;" :style="{background:names}"></div>
        <!-- {{names}} -->
        <img src="../assets/input_down.png" style=" position: absolute;
    display: inline-block;
    right: 7px;
    top: 13px;">
      </div>
   <!--   <input type="text"  v-model="message"  :class="{select_input:true ,actice:isA}"   readonly  unselectable="on"   @focus="handleFocus" @blur="handleBlur"  @click="abss"  v-show="isShow">-->
    </div>
    <div  style="background:#f9f9f9; color:#999999;font-size: 16px;position: absolute;z-index: 100;width:53px;    border: 1px solid #e9e9e9;padding:5px 0"  v-if="panelShow">
      <ul>
         <li v-for="(item ,key) in list" :key="key"  @mouseover='test(key)' @click="testb(item)" style="
    height: 22px;">
        <div class="color_box" :style=" {background:item.names}" style="       width: 47px;
    height: 20px;  
    display: inline-block;  "  :class="num==key?'abc':''"    ></div>
          <!-- {{item.names}} -->
        </li>
      </ul>
    </div>
     
  </div>
</template>

<script>
export default {
  name: "selets_t",
  data() {
    return {
      margins:'5px',
      nid:false,
      isA: true,
      panelShow: false,
      num: 0,
      isAbss: false,
      isShow: true,
      isShows: false,
      names:"",
      list:[]
    };
  },
  props: {
    itemList: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return [];
      }
    },
    message: {
      type: String
    }
  },
  directives: {
    outsideClick: {
      inserted(el, binding) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.value) {
            binding.value(e);
          }
        }
        el.__vueOutsideClick__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind: function(el, binding) {
        document.removeEventListener("click", el.__vueOutsideClick__);
        delete el.__vueClickOutside__;
      }
    }
  },
  mounted(){ 
      this.names=this.message,
        this.list=this.itemList
  },
  methods: {
    enter(){

      this.nid=true
    },
    leave(){

      this.nid=false
    },
    asss(){
        debugger
        this.nid=true
},
    bas() {
      this.panelShow = true;
    },
    abss() {
      this.panelShow = !this.panelShow;
      /*  if(this.isAbss){
             console.log("abss")
             this.panelShow=! this.panelShow
             this.isAbss=false
         /!*    this.isShow=false*!/
             this.isShows=true
           }

          this.isAbss=true*/
    },
    test(valu) {
      this.num = valu;
    },
    testb(item) {
      debugger;
      this.$emit("selectOk", item);
      this.names = item.names;
      this.panelShow = false;
      this.isAbss = false;
      debugger;

      // this.$leoBus.$emit('selectOk',names)
    },
    handleFocus() {
      if (this.panelShow) {
        this.panelShow = !this.panelShow;
      }
      /*   this.panelShow = false
        console.log("handleFocus")
        this.panelShow = true*/
    },
    handleBlur() {
      //        this.isAbss=false
      this.panelShow = false;
      /*       this.isShow=true*/
    }
  }
};
</script>

<style lang='scss' scoped>
.selects_Contains {
  cursor: default;
  .select_input {
    background: #dddddd;
    position: relative;
    color: #333333;
    // width: 55px;
    height: 30px;
    line-height: 30px;
    outline: none;
    border-radius: 2px;
    border: 0.5px solid #d2d2d2;
    text-indent: 10px;
    cursor: default;
    // background: url("../assets/input_down.png") no-repeat;
    background-position: 91px 14px;
  }
  .actice:focus {
    border-color: #ff8e68 !important;
  }
  .actice {
    border-color: #ff8e68 !important;
  }
  .actices {
    border-color: #ff8e68 !important;
  }
  li{
    padding: 0 2px;
    div{
       border:1px solid gray;
      border-color:rgba(1,1,1,0)
    }
  }
.abc {
 border: 1px solid #ff8e68;
  } 


//   li {
//     height: 30px;
//     line-height: 30px; 
    
//     padding: 0 2px;
//     font-size: 14px;
//     color: #333333;
//     border:1px solid black;
//     border-bottom: none;
//     border-top:none ;
//     background: red;
//     // background: #f9f9f9; 
//     // background: #f7f6f6;
//     div{
//       border:1px solid gray;
//       border-color:rgba(1,1,1,0)
//     }
//   }
//   .abc {
//  border: 1px solid #ff8e68;
//   } 
}
</style>
