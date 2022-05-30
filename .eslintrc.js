module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    // eslint-config-prettier, 关闭一些与 Prettier 冲突的 ESLint 规则。
    'prettier',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    // 0表示不不处理，1表示警告，2表示错误并退出
    'vue/script-setup-uses-vars': 'error',
    // 关闭typescript-eslint 处理文件的方式, 抑制 TypeScript 编译器错误会降低 TypeScript 的整体有效性。
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    // 关闭函数必须有返回值类型 const toNum = (): number => {}
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 关闭禁止使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // https://typescript-eslint.io/rules/no-var-requires/
    '@typescript-eslint/no-var-requires': 'error',
    // 关闭禁止使用空函数
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // 关闭在定义之前使用变量
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // 关闭禁止使用特定类型, 因为某些特定类型可能会影响项目构建, 默认 Record<string, unknown>
    '@typescript-eslint/ban-types': 'off',
    // 关闭不允许使用后缀运算符的非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 警告一个ts文件对外导出的函数必须要有返回类型, 更加精准
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    // 对页面中没有使用的变量加前缀 _
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // 关闭函数括号前的空格
    'space-before-function-paren': 'off',

    // 关闭自定义事件强制使用大小写
    'vue/custom-event-name-casing': 'off',
    // 关闭对vue语法进行排序, 如v-if必须放到v-model之前
    'vue/attributes-order': 'off',
    // 强制每个组件都必须在自己的文件中
    'vue/one-component-per-file': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // 关闭对于自定义组件强制执行属性命名样式
    'vue/attribute-hyphenation': 'off',
    // 关闭父传子props必须有默认值
    'vue/require-default-prop': 'off',
    // 警告需要使用emits规则触发
    'vue/require-explicit-emits': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 5,
        },
        multiline: {
          max: 3,
        },
      },
    ],
    'vue/html-indent': 'off',
    'vue/valid-template-root': 'off',
    'vue/first-attribute-linebreak': 'off',
    semi: [2, 'always'],
    'vue/multi-word-component-names': 'off',
    'no-useless-escape': 'off',
    'no-undef': 'off',
  },
};
