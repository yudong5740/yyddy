// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
/*import uploader from 'vue-simple-uploader'*/
import uploaders from './components/uploads'
import bus from './plugins/bus'

Vue.use(ElementUI)
Vue.use(uploaders)
Vue.use(bus)
Vue.config.productionTip = false
var explorer =navigator.userAgent ;
//ie
/*alert(5667)
isIE()
var vcolorpicker
function isIE() { //ie?
  if (!!window.ActiveXObject || "ActiveXObject" in window)
    alert(5)
  else{
    // import vcolorpicker from 'vcolorpicker'
      vcolorpicker = require('vcolorpicker')
    Vue.use(vcolorpicker)
    alert(57)
  }
    // Vue.use(vcolorpicker)
}*/
//   http://localhost:8070/abouts


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})
