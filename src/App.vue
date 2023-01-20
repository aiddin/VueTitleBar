
<template>
  <VTitleBar :platform="platform" :theme="theme"/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" :platform="platform" />
  {{ platform }}
  <button @click="created">click me</button>
</template>

<script>
// Renderer process
import HelloWorld from './components/HelloWorld.vue'
import VTitleBar from './components/TitleBar.vue';
// import { channel } from 'diagnostics_channel';
// import {nativeTheme} from 'electron';
// const { nativeTheme } = require("electron").remote;
// const electron = require("electron");
// const nativeTheme = electron.remote.nativeTheme;


export default {

  name: 'App',
  components: {
    HelloWorld,
    VTitleBar
  },
  

  data() { 
    return {
      theme: 'light',
      nativeTheme: '',
      platform: process.platform,
      test:'',
      dataToSend:'data to send to main.',
    } 
  },
  watch: {
   nativeTheme:{
    handler(){
      
    }
   }
  },
  computed: {
    styleClass() {
      return this.theme === "light" ? "light" : "dark";
    },
  },
  methods: {
    clickTest(){
      console.log('process.platform: ', process.platform)
      window.api.greet(this.dataToSend)
    },
   async invokeTest(){
      this.platform = await window.api.getOs()
    this.nativeTheme = await window.api.getTheme()
    console.log(this.platform+' is the platform')
      
  },
  async created (){
    this.platform = await window.api.getOs()
    this.nativeTheme = await window.api.getTheme()
    console.log(this.platform+' is the platform')
},
mounted(){
  this.invokeTest()
  window.api.greet("hello from renderer")
  
}
}
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000000;
  text-align: center;
  color: #473e3e;
 
}
</style>
