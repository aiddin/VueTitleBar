<template>
  <VTitleBar :platform="platform" />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" :platform="platform" />
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VTitleBar from './components/TitleBar.vue';
import platform from 'platform';
// import osType from 'os-type';

export default {
  name: 'App',
  components: {
    HelloWorld,
    VTitleBar
  },
  data() {
    return {
      platform: platform.os.family
    
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
