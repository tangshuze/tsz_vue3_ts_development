/*
 * @Description: 
 * @Date: 2023-05-24 15:11:19
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 15:23:30
 * @FilePath: \vite+vue3+ts\src\components\editor\AnimationButton.ts
 */
import Editor from 'wangeditor'
const { BtnMenu, $ } = Editor

const blockTags =
  'address,article,aside,blockquote,dd,div,dl,fieldset,figcaption,figure,footer,form,h1,header,hgroup,hr,p,pre,section,table,li,ol,ul'.split(',')
const isBlockTag = (el: HTMLElement) => blockTags.includes(el.tagName.toLowerCase())
const isEditorContainer = (el: HTMLElement) => el.classList.contains('w-e-text') || el.classList.contains('w-e-text-container')
const getPEl = (ELe: HTMLElement) => {
  let el = ELe
  if (!isBlockTag(el)) {
    let i = 0,
      condition = true
    while (condition) {
      if (el.parentElement) {
        el = el.parentElement
        condition = !isBlockTag(el)
      }
      i++
      if (i > 10) {
        break
      }
    }
  }
  if (isEditorContainer(el)) throw new Error('请选择正确的编辑区域')
  return el
}
class AnimationButton extends BtnMenu {
  static key = 'animation'
  constructor(editor: Editor) {
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const el = $(
      `<div class="w-e-menu" data-title="滚动动画">
        <i class="el-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M288 128h608L736 384l160 256H288v320h-96V64h96v64z"></path></svg>
        </i>
      </div>`,
    )
    super(el, editor)
  }
  //   菜单点击事件
  clickHandler(this: any) {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器
    let el: HTMLElement = this.editor.selection.getSelectionContainerElem().elems[0]
    // 只有p标签才会生效
    el = getPEl(el)
    if (el.style.animation) {
      el.style.animation = ''
      return
    }
    ElMessageBox.prompt('请输入动画持续时间，单位秒', 'Tip', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[\d.]+$/,
      inputErrorMessage: '输入正整数或小数',
      // @ts-ignore
    }).then(({ value }) => {
      el.style.animation = el.style.animation ? '' : `${value}s linear 0s infinite normal none running wordsLoop`
    })
  }
  tryChangeActive(this: any) {
    let el: HTMLElement = this.editor.selection.getSelectionContainerElem().elems[0]
    el = getPEl(el)
    el.style.animation ? this.active() : this.unActive()
  }
}

export default AnimationButton
