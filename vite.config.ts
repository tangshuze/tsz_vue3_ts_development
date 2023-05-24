import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver,AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver(), IconsResolver({
          prefix: 'Icon'
        }),AntDesignVueResolver()],
        eslintrc: { enabled: true },
      }),
      Components({
        dts: "src/components.d.ts",
        resolvers: [ElementPlusResolver(),
          IconsResolver({
          enabledCollections: ['ep']
        }),AntDesignVueResolver({
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
        autoInstall:true
      }),
      vueJsx()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': { // 匹配请求路径，
          target: '', // 代理的目标地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
