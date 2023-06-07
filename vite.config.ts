import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import { viteMockServe } from "vite-plugin-mock"
import postcsspxtoviewport from "postcss-px-to-viewport"
import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return {
    envPrefix: 'VITE_',
    envDir:'env',
    plugins: [
      vue(),
      AutoImport({
        imports:["vue","vue-router"],
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver(), IconsResolver({
          prefix: 'Icon'
        }), AntDesignVueResolver()],
        eslintrc: { enabled: true },
      }),
      Components({
        dts: "src/components.d.ts",
        resolvers: [ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        }), AntDesignVueResolver({
          importStyle: true,
          resolveIcons: true
        })
        ],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/icons/')],
        symbolId: 'icon-[name]'
      }),
      Icons({
        autoInstall: true
      }),
      vueJsx(),
      // viteMockServe({
      //   // supportTs: false,
      //   logger: false,
      //   mockPath: "src/mock/"
      // }),
      postcsspxtoviewport({
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: 750, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        landscape: false // 是否处理横屏情况
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        '~': path.resolve(__dirname, './'),
      }
    },
    define: {
      'process.env': {}
    },
    server: {
      open: '/',
      host: '0.0.0.0',   //本地地址：localhost或者其他
      https: false,
      // proxy: {           //代理
      //   '/test': {
      //     target: process.env.VITE_PROXY_URL,    //请求的url，例后端给的地址
      //     changeOrigin: true,        //当进行代理时，Host 头部的源默认会保持原状；你可以设置 changeOrigin 为 true 来覆盖这种行为；变成target对应得地址
      //     secure: false,             // 关闭SSL证书校验
      //     rewrite: path => {         //重定地址，比如：把以/aaa开头的地址换成''
      //       return path.replace(/^\/aaaa/, '');
      //     },
      //   },
      // },
    },
    build: {
      minify: "terser", // 必须开启：使用 terserOptions 才有效果
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }
  }
})
