/**
 * 导航栏模块
 * Navbar functionality
 */

/**
 * 初始化移动端菜单
 */
export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    // 移除之前的事件监听器（通过克隆节点）
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);

    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        newMenuToggle.classList.toggle('active');

        // 防止背景滚动
        document.body.style.overflow = isActive ? '' : 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        newMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    newMenuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // 点击菜单外部关闭菜单
    navMenu.addEventListener('click', function (e) {
        if (e.target === navMenu) {
            closeMenu();
        }
    });

    // 点击菜单项时关闭菜单
    const menuItems = navMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // ESC键关闭菜单
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * 初始化语言选择器
 */
export function initLanguageSelector() {
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    const languageOptions = document.querySelectorAll('.language-option');

    if (!languageToggle || !languageDropdown) return;

    // 语言名称映射
    const languageNames = {
        'zh': '🇨🇳 简体中文',
        'en': '🇺🇸 English'
    };

    // 初始化当前语言显示
    function updateCurrentLanguage() {
        const currentLang = window.i18n ? window.i18n.currentLang : 'zh';
        if (currentLangSpan) {
            currentLangSpan.textContent = languageNames[currentLang] || '简体中文';
        }

        // 更新选项的激活状态
        languageOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.classList.toggle('active', lang === currentLang);
        });
    }

    // 切换下拉菜单显示
    function toggleDropdown() {
        const isShow = languageDropdown.classList.contains('show');
        languageDropdown.classList.toggle('show', !isShow);
        languageToggle.classList.toggle('active', !isShow);
    }

    // 点击切换按钮
    languageToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    // 点击语言选项
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedLang = option.getAttribute('data-lang');

            if (window.i18n && selectedLang !== window.i18n.currentLang) {
                window.i18n.setLanguage(selectedLang);
                updateCurrentLanguage();
            }

            // 关闭下拉菜单
            languageDropdown.classList.remove('show');
            languageToggle.classList.remove('active');
        });
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
        languageToggle.classList.remove('active');
    });

    // 阻止下拉菜单内部点击事件冒泡
    languageDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 初始化显示
    updateCurrentLanguage();

    // 监听语言变化事件
    document.addEventListener('languageChanged', updateCurrentLanguage);
}
