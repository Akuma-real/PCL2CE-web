/**
 * 彩蛋效果模块 - "千万别点"按钮
 * Easter egg effects - "Don't Click" button
 */

// 奇怪效果数组
const weirdEffects = [
    // 页面旋转
    () => {
        document.body.style.transition = 'transform 2s ease-in-out';
        document.body.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            document.body.style.transform = '';
            setTimeout(() => document.body.style.transition = '', 100);
        }, 2000);
    },

    // 页面颜色反转
    () => {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    },

    // 页面震动
    () => {
        let count = 0;
        const shake = () => {
            if (count < 20) {
                document.body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                count++;
                setTimeout(shake, 50);
            } else {
                document.body.style.transform = '';
            }
        };
        shake();
    },

    // 页面缩放
    () => {
        document.body.style.transition = 'transform 1s ease-in-out';
        document.body.style.transform = 'scale(0.5)';
        setTimeout(() => {
            document.body.style.transform = 'scale(1.2)';
            setTimeout(() => {
                document.body.style.transform = '';
                setTimeout(() => document.body.style.transition = '', 100);
            }, 500);
        }, 1000);
    },

    // 彩虹背景
    () => {
        const originalBg = document.body.style.background;
        document.body.style.background = 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'rainbow 2s ease infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.background = originalBg;
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 4000);
    },

    // 文字跳舞
    () => {
        const allText = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
        allText.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'transform 0.5s ease';
                element.style.transform = 'rotate(10deg) scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'rotate(-10deg) scale(0.9)';
                    setTimeout(() => {
                        element.style.transform = '';
                    }, 250);
                }, 250);
            }, index * 50);
        });
    },

    // 重力效果
    () => {
        const elements = document.querySelectorAll('.btn, .card, img');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.transform = 'translateY(100vh) rotate(720deg)';
                setTimeout(() => {
                    element.style.transform = '';
                }, 2000);
            }, index * 100);
        });
    },

    // 页面模糊
    () => {
        document.body.style.filter = 'blur(10px)';
        setTimeout(() => {
            document.body.style.filter = 'blur(0px)';
        }, 2000);
    },

    // 随机移动所有元素
    () => {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            if (element !== document.body && element !== document.html) {
                element.style.transition = 'transform 1s ease';
                element.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
            }
        });
        setTimeout(() => {
            elements.forEach(element => {
                element.style.transform = '';
            });
        }, 2000);
    },

    // 页面翻转
    () => {
        document.body.style.transition = 'transform 1.5s ease-in-out';
        document.body.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            document.body.style.transform = '';
            setTimeout(() => document.body.style.transition = '', 100);
        }, 1500);
    }
];

/**
 * 创建确认菜单
 * @param {Function} callback - 确认后执行的回调
 */
function createConfirmMenu(callback) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const menu = document.createElement('div');
    menu.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 400px;
        animation: menuSlideIn 0.3s ease-out;
    `;

    const title = document.createElement('h3');
    title.textContent = '你确定吗';
    title.style.cssText = `
        margin: 0 0 20px 0;
        color: #e74c3c;
        font-size: 20px;
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
    `;

    for (let i = 0; i < 3; i++) {
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '确定';
        confirmBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        `;

        confirmBtn.addEventListener('mouseenter', () => {
            confirmBtn.style.background = '#c0392b';
        });

        confirmBtn.addEventListener('mouseleave', () => {
            confirmBtn.style.background = '#e74c3c';
        });

        confirmBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
            callback();
        });

        buttonContainer.appendChild(confirmBtn);
    }

    // 添加菜单动画样式
    if (!document.querySelector('#menu-animation')) {
        const style = document.createElement('style');
        style.id = 'menu-animation';
        style.textContent = `
            @keyframes menuSlideIn {
                0% { opacity: 0; transform: scale(0.7) translateY(-50px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    menu.appendChild(title);
    menu.appendChild(buttonContainer);
    overlay.appendChild(menu);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

/**
 * 添加按钮震动效果
 * @param {HTMLElement} button - 按钮元素
 */
function addShakeEffect(button) {
    button.style.animation = 'shake 0.5s ease-in-out';

    if (!document.querySelector('#shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

/**
 * 执行随机效果
 */
function executeRandomEffect() {
    const randomEffect = weirdEffects[Math.floor(Math.random() * weirdEffects.length)];
    randomEffect();
}

/**
 * 显示警告消息
 */
function showWarningMessage() {
    const messages = [
        '我说了千万别点！',
        '警告：请勿继续点击！',
        '还敢再点吗？'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(231, 76, 60, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: messagePopup 3s ease-in-out forwards;
    `;

    if (!document.querySelector('#message-animation')) {
        const style = document.createElement('style');
        style.id = 'message-animation';
        style.textContent = `
            @keyframes messagePopup {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

/**
 * 处理"千万别点"按钮点击
 * @param {Event} event
 */
function handleDontClick(event) {
    event.preventDefault();
    addShakeEffect(event.target);
    createConfirmMenu(executeRandomEffect);
}

/**
 * 处理 dl.html 页面的特殊按钮点击
 * @param {Event} event
 */
function handleDlPageDontClick(event) {
    event.preventDefault();
    addShakeEffect(event.target);

    createConfirmMenu(() => {
        executeRandomEffect();
        showWarningMessage();
    });
}

/**
 * 初始化"千万别点"按钮效果
 */
export function initDontClickButton() {
    const dontClickBtn = document.getElementById('dontClickBtn');
    const dontClickBtnDownload = document.getElementById('dontClickBtnDownload');
    const dontClickBtnDl = document.getElementById('dontClickBtnDl');

    if (dontClickBtn) {
        dontClickBtn.addEventListener('click', handleDontClick);
    }

    if (dontClickBtnDownload) {
        dontClickBtnDownload.addEventListener('click', handleDontClick);
    }

    if (dontClickBtnDl) {
        dontClickBtnDl.addEventListener('click', handleDlPageDontClick);
    }
}
