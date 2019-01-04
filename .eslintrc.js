// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended'
    // ,
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "prettier/prettier": [
      "error", {
        "printWidth": 120, // 每行代码长度（默认80）
        "tabWidth": 2, // 每个tab相当于多少个空格（默认2）
        "useTabs": false, // 是否使用tab进行缩进（默认false，推荐使用软tab即多个空格来替代tab）
        "semi": true, // 声明结尾使用分号(默认true)
        "trailingComma": "all", // 多行使用拖尾逗号（默认none）
        "bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
        "jsxBracketSameLine": true, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
        "arrowParens": "avoid" // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
      }
    ],

  }
}
