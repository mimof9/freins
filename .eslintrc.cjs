/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

/**
 * 1. eslint 和 prettier 的关系？
 *    eslint 负责代码质量、prettier 负责代码风格
 * 2. eslint 和 prettier 怎么配合使用？
 *    实际上 eslint 也可以格式化代码，但是 prettier 更擅长。
 *    配合使用时，交集部分规则容易冲突。
 *    解决思路：
 *      禁掉 eslint 和 prettier 冲突的规则（eslint-config-prettier），按照1的原则来使用两种工具
 *    更进一步：
 *      通过一个 eslint 插件（eslint-plugin-prettier）来以 ESLint 规则的方式运行 Prettier，
 *      通过 Prettier 找出格式化前后的差异，并以 ESLint 问题的方式报告差异，同时针对不同类型的差异提供不同的 ESLint fixer
 * 3. 为什么要用 vsc 的 eslint 扩展？
 *    通过扩展连通 ide，能够将“代码质量保证”、“格式化”提前到 开发阶段。eslint 扩展会优先使用项目的配置文件
 *    eg: 飘红提示、保存时自动校验
 */
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  // 若要禁用一组文件的配置文件中的规则，请使用 overrides 和 files
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
};
