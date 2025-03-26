'use strict';

const hexoTsLint = require('eslint-config-hexo/test');

const ignores = {
  ignores: [
    '**/node_modules/*',
    '**/dist/*',
    '**/build/*',
    '**/coverage/*',
    '**/vitest.config.js',
    '**/tmp/*'
  ]
};

module.exports = [
  ...hexoTsLint,
  {
    languageOptions: {
      ecmaVersion: 2022
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-this-alias': 0
    }
  },
  ignores
];
