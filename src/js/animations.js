/**
 * 动画系统模块
 * Animation system
 */

import { isDesktop, debounce } from './utils.js';

// 全局 observer 引用，用于清理
let observer = null;

/**
 * 初始化视频控制（懒加载）
 */
export function initVideoControl() {
    const videos = document.querySelectorAll('video[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    videoObserver.unobserve(video);
                }
            });
        }, { rootMargin: '100px' });

        videos.forEach(video => videoObserver.observe(video));
    }
}

/**
 * 初始化平滑滚动
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 初始化光标效果（仅桌面端）
 */
export function initCursorEffects() {
    if (!isDesktop()) return;

    document.querySelectorAll('[data-cursor-effect]').forEach(element => {
        let isAnimating = false;
        let lastTime = 0;

        // 缓存元素尺寸
        let cachedRect = null;
        let rectUpdateTime = 0;

        const updateRect = () => {
            const now = Date.now();
            if (!cachedRect || now - rectUpdateTime > 100) {
                cachedRect = element.getBoundingClientRect();
                rectUpdateTime = now;
            }
            return cachedRect;
        };

        const handleMouseMove = (e) => {
            const now = performance.now();
            if (now - lastTime < 33) return; // 限制到30fps
            lastTime = now;

            if (isAnimating) return;
            isAnimating = true;

            requestAnimationFrame(() => {
                const rect = updateRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                if (element.classList.contains('hero-image-container')) {
                    const centerX = rect.width >> 1;
                    const centerY = rect.height >> 1;
                    const rotateX = 5 + (y - centerY) * 0.05;
                    const rotateY = -5 - (x - centerX) * 0.05;

                    element.style.transform = `translate3d(0,0,8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
                isAnimating = false;
            });
        };

        element.addEventListener('mousemove', handleMouseMove, { passive: true });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            cachedRect = null;
        });

        window.addEventListener('resize', () => {
            cachedRect = null;
        });
    });
}

/**
 * 初始化滚动动画
 */
export function initScrollAnimations() {
    // 清理之前的observer
    if (observer) {
        observer.disconnect();
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(`
        .animate-on-scroll,
        .animate-fade-in,
        .animate-slide-up,
        .animate-slide-left,
        .animate-slide-right,
        .animate-scale-in,
        img[loading="lazy"]
    `);

    animateElements.forEach(element => {
        if (element.tagName === 'IMG' && element.hasAttribute('loading')) {
            element.classList.add('animate-fade-in');
        }
        observer.observe(element);
    });
}

/**
 * 初始化页面加载动画
 */
export function initPageLoadAnimation() {
    document.body.classList.add('page-enter');

    // 立即触发导航栏元素的动画
    const navElements = document.querySelectorAll(`
        .navbar .animate-fade-in,
        .navbar .animate-slide-left,
        .navbar .animate-slide-right,
        .navbar .animate-scale-in
    `);

    navElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * 100);
    });

    // 为主要区块添加渐入动画
    const mainSections = document.querySelectorAll(`
        .hero,
        .features,
        .screenshots,
        .about,
        .footer,
        .download-container,
        .version-card
    `);

    mainSections.forEach((section, index) => {
        if (section && !section.classList.contains('animate-on-scroll')) {
            section.classList.add('animate-on-scroll');
            if (index > 0) {
                section.classList.add(`animate-delay-${Math.min(index, 6)}`);
            }
        }
    });
}

/**
 * 初始化滚动性能优化
 */
export function initScrollPerformance() {
    if (!window.scrollListenerAdded) {
        window.addEventListener('scroll', debounce(() => {
            document.body.style.setProperty('--scroll', window.pageYOffset /
                (document.documentElement.scrollHeight - window.innerHeight));
        }, 10));
        window.scrollListenerAdded = true;
    }
}
