const path = require('path');
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'jest'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    React: false,
    ReactDOM: false,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    // // @fixable 一个缩进必须用两个空格替代
    'no-console': 'off',
    'react/prop-types': 'off',
    'react/no-children-prop': 'off',
    'react/display-name': 'off',
    'typescript/member-ordering': 'off',
    'typescript/member-delimiter-style': 'off',
    'react/jsx-indent-props': 'off',
    'react/no-did-update-set-state': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': ['off', { properties: 'always' }],
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
    "prettier/prettier": ["error", { "singleQuote": true, "parser": "typescript" }]
  },
};
