<template>
  <div class="titlebar" :class="[styleClass, stylePlatform]">
    <div class="titlebar-resize-handle top"></div>
    <div class="titlebar-resize-handle right"></div>
    <div class="titlebar-resize-handle left"></div>

    <div v-if="platform === 'darwin'" class="titlebar-buttons-osx">
      <div class="macButton macButtonClose" @click="close">
        <svg name="TitleBarCloseMac" width="12" height="12" viewBox="0 0 12 12">
          <path
            stroke="#4c0000"
            fill="none"
            d="M8.5,3.5 L6,6 L3.5,3.5 L6,6 L3.5,8.5 L6,6 L8.5,8.5 L6,6 L8.5,3.5 Z"
          ></path>
        </svg>
      </div>
      <div class="macButton macButtonMinimize" @click="minimize">
        <svg name="TitleBarMinimizeMac" width="12" height="12" viewBox="0 0 12 12">
          <rect
            fill="#975500"
            width="8"
            height="2"
            x="2"
            y="5"
            fill-rule="evenodd"
          ></rect>
        </svg>
      </div>
      <div class="macButton macButtonMaximize" @click="maximize">
        <svg name="TitleBarMaximizeMac" width="12" height="12" viewBox="0 0 12 12">
          <g fill="#006500" fill-rule="evenodd">
            <path
              d="M5,3 C5,3 5,6.1325704 5,6.48601043 C5,6.83945045 5.18485201,7 5.49021559,7 L9,7 L9,6 L8,6 L8,5 L7,5 L7,4 L6,4 L6,3 L5,3 Z"
              transform="rotate(180 7 5)"
            ></path>
            <path
              d="M3,5 C3,5 3,8.1325704 3,8.48601043 C3,8.83945045 3.18485201,9 3.49021559,9 L7,9 L7,8 L6,8 L6,7 L5,7 L5,6 L4,6 L4,5 L3,5 Z"
            ></path>
          </g>
        </svg>
      </div>
    </div>

    <div class="titlebar-header">
      <button>
        <slot/>
      </button>
    </div>

    <!-- <div class="titlebar-menu" v-if="platform === 'darwin'">
      <div class="titlebar-menu-item" v-for="(item, index) in menu" :key="index">
        <button @click="item.click()">
         hehe
        </button>
      </div>
    </div> -->

    <div class="titlebar-buttons" v-if="platform === 'win32'">
      <font-awesome-icon icon="fa-solid fa-xmark" />
      <button aria-label="minimize" title="Minimize" tabindex="-1" @click="minimize">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="10"
          height="10"
        >
          <path
            d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </button>

      <button aria-label="maximize" title="Maximize" tabindex="-1" @click="maximize">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="10"
          height="10"
        >
          <path
            d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"
          />
        </svg>
      </button>

      <button
        aria-label="close"
        title="Close"
        tabindex="-1"
        class="close"
        @click="close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          width="10"
          height="10"
        >
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
// import {library} from '@fortawesome/fontawesome-svg-core'
export default {
  components: {
    // library,
  },
  name: "TitleBar",
  props: {
    theme: {
      type: String,
      default: "light",
    },
    platform: {
      type: String,
      required: true,
    },
    menu: {
      type: Array,
      default: function () {
        return [1, 2, 3];
      },
    },

    showIcon: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    styleClass() {
      return `titlebar-style-${this.theme}`;
    },
    stylePlatform() {
      return `titlebar-platform-${this.platform}`;
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
  },

    async mounted() {
     
      this.nativeTheme = await window.api.getTheme();
      console.log(this.platform + " from titlenbar");
    },
  
};
</script>

<style lang="scss" scoped>
$titlebar-height: 28px;
.titlebar {
  position: sticky;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  height: $titlebar-height;
  -webkit-app-region: drag;
  &.titlebar-style-dark {
    color: #fff;
    background: #626262;
  }
  &.titlebar-style-light {
    color: #989696;
    background: #470b0b;
  }
  .titlebar-resize-handle {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-app-region: no-drag;
    &.top {
      width: 100%;
      
    }
    &.right {
      left: auto;
      right: 0;
      
      height: $titlebar-height;
    }
    &.left {
      
      height: $titlebar-height;
    }
  }
  .titlebar-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titlebar-icon,
  .titlebar-name {
    display: flex;
    align-content: center;
    align-self: center;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 14px;
    line-height: $titlebar-height;
    padding: 0 12px;
    height: $titlebar-height;
    > svg,
    > img {
      display: block;
      align-content: center;
      align-self: center;
      width: auto;
      height: 16px;
    }
  }
  .titlebar-icon ~ .titlebar-name {
    padding-left: 0;
  }
  &.titlebar-platform-darwin {
    .titlebar-header {
      width: 100%;
      text-align: center;
      position: absolute;
      pointer-events: none;
    }
  }
  .titlebar-menu {
    display: flex;
    -webkit-app-region: no-drag;
    .titlebar-menu-item {
      min-width: 0;
      position: relative;
      cursor: pointer;
      button {
        border: none;
        box-shadow: none;
        background: transparent;
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
        color: currentColor;
        font-size: 13px;
        padding: 0 10px;
        outline: none;
        &:hover {
          background-color: rgb(0, 0, 0);
        }
      }
    }
  }
  .titlebar-buttons {
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: auto;
    button {
      -webkit-app-region: no-drag;
      display: inline-block;
      position: relative;
      width: 45px;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: hidden;
      border: none;
      box-shadow: none;
      border-radius: 0;
      color: currentColor;
      background-color: transparent;
      line-height: 10px;
      outline: none;
      svg {
        fill: currentColor;
      }
      &:hover {
        background-color: rgb(233, 233, 233);
        color: currentColor;
      }
      &.close:hover {
        background-color: #e81123;
        color: #fff;
      }
    }
  }
  .titlebar-buttons-osx {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    width: 70px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: center;
    .macButton {
      -webkit-app-region: no-drag;
      -webkit-box-sizing: border-box;
      border-radius: 50%;
      box-sizing: border-box;
      height: 12px;
      width: 12px;
      background-color: #dcdcdc;
      border-color: #d1d1d1;
      &.macButtonClose {
        background-color: #fc615d;
      }
      &.macButtonMinimize {
        background-color: #fdbc40;
      }
      &.macButtonMaximize {
        background-color: #34c749;
      }
      svg {
        display: block;
        visibility: hidden;
      }
    }
    &:hover {
      .macButton {
        svg {
          visibility: visible;
        }
      }
    }
  }
}
</style>
