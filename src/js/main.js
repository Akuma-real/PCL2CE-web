/**
 * PCL 社区版网站 - 主入口文件
 * Main entry point
 */

// 导入样式
import '../scss/main.scss';

// 导入模块
import { updateCurrentYear } from './utils.js';
import { initTheme } from './theme.js';
import { initMobileMenu, initLanguageSelector } from './navbar.js';
import {
    initVideoControl,
    initSmoothScroll,
    initCursorEffects,
    initScrollAnimations,
    initPageLoadAnimation,
    initScrollPerformance
} from './animations.js';
import { initDontClickButton } from './easter-egg.js';
import i18n from './i18n.js';

// 构建时间 - 由 Vite 在构建时注入

const buildTime = typeof BUILD_TIME !== 'undefined' ? BUILD_TIME : new Date().toISOString();

/**
 * 更新构建时间显示
 */
function updateBuildTime() {
    const buildTimeElements = document.querySelectorAll('#build-time, .build-time');
    buildTimeElements.forEach(el => {
        if (el) {
            el.textContent = buildTime;
        }
    });
}

/**
 * 初始化所有功能
 */
function initializeAll() {
    initVideoControl();
    initSmoothScroll();
    initCursorEffects();
    initPageLoadAnimation();
    initScrollAnimations();
    initTheme();
    initLanguageSelector();
    initMobileMenu();
    updateCurrentYear();
    updateBuildTime();
    initScrollPerformance();
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeAll();
    initDontClickButton();
    i18n.init();
});

// 支持 PJAX 重新初始化
document.addEventListener('pjax:reinitialize', () => {
    initializeAll();
    initDontClickButton();
});

// 导出供外部使用
export {
    initializeAll,
    buildTime
};
