// // 设置基础根文件大小
// let baseSize: number = 22.5
// // rem 函数
// function setRem() {
//   // 设计稿一般都是以375的宽度
//   const scale = document.documentElement.clientWidth / 750
//   // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
//   document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
// }
// // 调用方法
// window.onresize = function () {
//   setRem()
// }