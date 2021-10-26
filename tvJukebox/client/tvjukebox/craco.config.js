const { ESLINT_MODES } = require('@craco/craco');
const path = require('path');

module.exports = {
    eslint: {
        mode: ESLINT_MODES.file,
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};
