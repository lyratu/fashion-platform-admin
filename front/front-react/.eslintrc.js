module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    // 允许使用any类型，但会给出警告而不是错误
    '@typescript-eslint/no-explicit-any': 'warn',
    // 允许空函数
    '@typescript-eslint/no-empty-function': 'warn',
    // 允许使用非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 允许使用require语句
    '@typescript-eslint/no-var-requires': 'off',
    // 允许使用@ts-ignore注释
    '@typescript-eslint/ban-ts-comment': 'off',
    // React规则
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // 其他规则
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
};
