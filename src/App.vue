<template>
  <VTitleBar :platform="platform" :theme="theme" :darkTheme="darkTheme">
    <template v-slot>
      <button @click="maximize">app button</button>
    </template>
  </VTitleBar>
  

  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" :platform="platform" />
  {{ platform }}
  <br />
  <button @click="invokeTest">Windows</button>
  <button @click="changeTheme">macOs</button>
</template>

<script>
// Renderer process
import HelloWorld from "./components/HelloWorld.vue";
import VTitleBar from "./components/TcTitleBar.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    VTitleBar,
  },
  data() {
    return {
      theme: "light",
      nativeTheme: "",
      platform: "darwin",
      test: "",
      dataToSend: "data to send to main.",
      darkTheme:'#616161'
      }
      
    
  },
  watch: {
    nativeTheme: {
      handler() {
        if (this.nativeTheme === true) {
          this.theme = "dark";
        } else {
          this.theme = "light";
        }
      },
    },
  },

  methods: {
    minimize() {
      window.api.minimize("minimize");
    },
    maximize() {
      window.api.maximize("maximize");
    },
    close() {
      window.api.close("close");
    },
    clickTest() {
      console.log("process.platform: ", process.platform);
      window.api.greet(this.dataToSend);
    },
    async invokeTest() {
      this.platform = await window.api.getOs();
      this.nativeTheme = await window.api.getTheme();
      window.api.greet("hello from renderer invokeTest");
      console.log(this.platform + " is the platform");
    },
    changeTheme() {
      this.nativeTheme = !this.nativeTheme;
      this.platform = "darwin";
    },
  },
  async mounted() {
    this.platform = await window.api.getOs();
    this.nativeTheme = await window.api.getTheme();
    console.log(this.platform + " is the platform mounted");
  },
};
</script>

<style>
::-webkit-scrollbar { display: none;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000000;
  text-align: center;
  color: #473e3e;
}
</style>
