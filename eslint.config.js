import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['src/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                navigator: 'readonly',
                requestAnimationFrame: 'readonly',
                IntersectionObserver: 'readonly',
                ResizeObserver: 'readonly',
                MutationObserver: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                performance: 'readonly',
                Date: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                Node: 'readonly',
                NodeList: 'readonly',
                Event: 'readonly',
                CustomEvent: 'readonly',
                fetch: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                BUILD_TIME: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'off',
            'prefer-const': 'warn',
            'no-var': 'error',
            'eqeqeq': ['warn', 'always'],
            'curly': ['warn', 'multi-line'],
            'no-multiple-empty-lines': ['warn', { max: 2 }],
            'no-trailing-spaces': 'warn'
        }
    },
    {
        ignores: ['dist/**', 'node_modules/**', '*.config.js']
    }
];
