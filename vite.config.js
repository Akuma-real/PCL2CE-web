import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

// 获取构建时间
const getBuildTime = () => {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return now.toLocaleString('zh-CN', options);
};

// 公共页面数据
const pageData = {
    buildTime: getBuildTime(),
    year: new Date().getFullYear()
};

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                dl: resolve(__dirname, 'src/dl.html'),
                download: resolve(__dirname, 'src/download.html'),
                '404': resolve(__dirname, 'src/404.html')
            }
        }
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            context: pageData
        })
    ],
    define: {
        BUILD_TIME: JSON.stringify(getBuildTime())
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                additionalData: `@use "sass:math";`
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});
