
<template>
  <VTitleBar :platform="platform" :theme="theme"/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" :platform="platform" />
  {{ platform }}
  <button @click="clickTest">click me</button>
</template>

<script>
// Renderer process
import HelloWorld from './components/HelloWorld.vue'
import VTitleBar from './components/TitleBar.vue';
// import { channel } from 'diagnostics_channel';

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
      test:'',
      dataToSend:'test',
    } 
  },
  methods: {
    clickTest(){
      console.log('clicked')
      window.api.greet("hjehe")
    }
  },
mounted(){
  window.api.greet("hello from renderer")

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
