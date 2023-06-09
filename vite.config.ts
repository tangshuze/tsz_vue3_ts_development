import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import { viteMockServe } from "vite-plugin-mock"
import postcsspxtoviewport from "postcss-px-to-viewport-8-plugin"
import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';


const autoImport = AutoImport({
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/, /\.vue\?vue/, // .vue
  ],
  imports: ["vue", "vue-router"],
  dts: "/config/auto-import.d.ts",
  resolvers: [ElementPlusResolver(), IconsResolver({
    prefix: 'Icon'
  }), AntDesignVueResolver()],
  eslintrc: { enabled: true },
})
const components = Components({
  dts: "/config/components.d.ts",
  extensions: ['vue', 'jsx', 'tsx', 'ts', 'js'],
  resolvers: [ElementPlusResolver(),
  IconsResolver({
    enabledCollections: ['ep']
  }), AntDesignVueResolver({
    importStyle: true,
    resolveIcons: true
  })
  ],
})
const svgIcon = createSvgIconsPlugin({
  iconDirs: [path.resolve(__dirname, 'src/assets/icons/')],
  symbolId: 'icon-[name]'
})
const pxtovw = postcsspxtoviewport({
  unitToConvert: 'px', // 要转化的单位
  viewportWidth: 320, // UI设计稿的宽度
})
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return {
    envPrefix: 'VITE_',
    envDir: 'env',
    plugins: [
      vue(),
      autoImport,
      components,
      svgIcon,
      Icons({
        autoInstall: true
      }),
      vueJsx(),
      // viteMockServe({
      //   // supportTs: false,
      //   logger: false,
      //   mockPath: "src/mock/"
      // }),
      pxtovw
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
