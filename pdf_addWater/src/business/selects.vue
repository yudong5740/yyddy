<template>
  <div class="selects_Contains" id="myPanels">
    <div  >
      <div type="text"  v-model="names"  :class="{select_input:true ,actice:panelShow,actices:nid}"   readonly  unselectable="on"       @click="abss"       v-outside-click="handleFocus"  @mouseenter="enter()" @mouseleave="leave()">{{names}}</div>
   <!--   <input type="text"  v-model="message"  :class="{select_input:true ,actice:isA}"   readonly  unselectable="on"   @focus="handleFocus" @blur="handleBlur"  @click="abss"  v-show="isShow">-->
    </div>

    <div class="select_list" style="width: 110px;background:#f9f9f9; color:#999999;font-size: 16px;position: absolute;z-index: 100" v-if="panelShow">
      <ul>
        <li v-for="(item ,key) in list" :key="key"  :class="num==key?'abc':''" @mouseover='test(key)' @click="testb(item)">{{item.names}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "selets",
  data() {
    return {
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
    color: #333333;
    width: 109px;
    height: 30px;
    line-height: 30px;
    outline: none;
    border-radius: 2px;
    border: 0.5px solid #d2d2d2;
    text-indent: 10px;
    cursor: default;
    background: url("../assets/input_down.png") no-repeat;
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
