<template>
  <VTitleBar :platform="platform" :theme="theme"/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" :platform="platform" />
  
</template>

<script>
// Renderer process
import HelloWorld from './components/HelloWorld.vue'
import VTitleBar from './components/TitleBar.vue';
import process from 'process';
import {ipcRenderer} from "electron";
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
      platform: process.platform,
    test:''
    } 
  },
  method: {
    submitForm(data){
           // this will send the data to the main process
          ipcRenderer.get("form-submission-event", data)
          }
  },
  mounted() {
   
    // console.log(this.platform + ' huh');
   
},
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
