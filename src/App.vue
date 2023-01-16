<template>
  <VTitleBar :platform="platform" :theme="theme"/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" :platform="platform" />
  
</template>

<script>
// Renderer process
import HelloWorld from './components/HelloWorld.vue'
import VTitleBar from './components/TitleBar.vue';
import platform from 'platform';
// import {ipcRenderer} from 'electron';
// import osType from 'os-type';
require('electron').ipcRenderer.on('os', () => {
                console.log("logging in");
             
    })
export default {

  name: 'App',
  components: {
    HelloWorld,
    VTitleBar
  },
  data() {
    return {
      theme: 'dark',
      platform: platform.os.family,
    test:''
    }
  },
  mounted() {
   
    console.log(this.platform + ' huh');
   
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
