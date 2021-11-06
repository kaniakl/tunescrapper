const path = require('path');

module.exports = {
    'parser': '@babel/eslint-parser',
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'plugin:react/recommended',
        'google',
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
        'babelOptions': {
            'configFile': path.join(__dirname, 'babel.config.json'),
        },
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'indent': ['error', 4],
        'require-jsdoc': 0,
        'object-curly-spacing': ['error', 'always'],
        'no-unused-vars': 'warn',
        'react/prop-types': 'warn',
        'max-len': ['error', { 'code': 160 }],
        'operator-linebreak': ['error', 'before'],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
    },
};
