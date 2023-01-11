<template>
  <TitleBar/>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TitleBar from './components/TitleBar.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,
    TitleBar
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
