import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      AutoImport({
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver(), IconsResolver({
          prefix: 'Icon'
        })],
        eslintrc: { enabled: true },
      }),
      Components({
        dts: "src/components.d.ts",
        resolvers: [ElementPlusResolver(),
          IconsResolver({
          enabledCollections: ['ep']
        }),
        ],
      }),
      createSvgIconsPlugin({
        // 要缓存的图标文件夹
        iconDirs: [path.resolve(__dirname, 'src/assets/icons/')],
        // 执行 icon name 的格式
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
