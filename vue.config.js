const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false
      }
    },
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      
    },
  },
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      nodeIntegration: false,
      externals: ['my-native-dep'],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      preload: 'src/preload.js',
      // nodeModulesPath: ['../../node_modules', './node_modules']
    }
  }

});

