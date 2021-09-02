// eslint-disable-next-line
const path = require('path') // 引入path模块,为配置别名做准备
function resolve (dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: './', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: process.env.VUE_APP_OUTPUT, // 运行时生成的运行环境构建文件的目录(默认''dist''，构建之前会被清除)
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false // 是否在构建生产包时生成sourcdeMap
}
