/**
 * 主题管理模块
 * Theme management
 */

/**
 * 初始化主题（基于系统偏好或保存的设置）
 */
export function initTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * 切换主题（亮色/暗色）
 */
export function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');

    body.style.transition = 'background 0.6s ease';
    setTimeout(() => body.style.transition = '', 600);
}
