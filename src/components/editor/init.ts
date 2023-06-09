/*
 * @Description: 
 * @Date: 2023-05-24 15:11:19
 * @Autor: tangshuze
 * @LastEditTime: 2023-05-24 15:17:34
 * @FilePath: \vite+vue3+ts\src\components\editor\init.ts
 */
import Editor from 'wangeditor'
import AnimationButton from './AnimationButton'
type EmitUpdate = (event: 'update:modelValue', value: string) => void
export const initEditor = (
  container: HTMLDivElement,
  { emit, props }: { emit: EmitUpdate; props: Readonly<{ menus?: string[]; modelValue?: string; excludeMenu?: string[]; config?: any }> },
) => {
  const editor = new Editor(container)
  
  editor.menus.extend(AnimationButton.key, AnimationButton)

  editor.config.menus = props?.menus || [
    AnimationButton.key,
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'list',
    'todo',
    'justify',
    'quote',
    'table',
    'splitLine',
    'undo',
    'redo',
  ]
  if (props.excludeMenu) {
    editor.config.menus = editor.config.menus.filter((menu:any) => (props.excludeMenu ? !props.excludeMenu.includes(menu) : true))
  }
  editor.config.colors = [
    'rgb(244, 67, 54)',
    'rgb(233, 30, 99)',
    'rgb(156, 39, 176)',
    'rgb(103, 58, 183)',
    'rgb(63, 81, 181)',
    'rgb(33, 150, 243)',
    'rgb(3, 169, 244)',
    'rgb(0, 188, 212)',
    'rgb(0, 150, 136)',
    'rgb(76, 175, 80)',
    'rgb(139, 195, 74)',
    'rgb(205, 220, 57)',
    'rgb(255, 235, 59)',
    'rgb(255, 193, 7)',
    'rgb(255, 152, 0)',
    'rgb(255, 87, 34)',
    'rgb(121, 85, 72)',
    'rgb(158, 158, 158)',
    'rgb(96, 125, 139)',
    'rgb(0,0,0)',
    'rgb(1,1,1)',
    'rgb(4,4,4)',
    'rgb(9,9,9)',
    'rgb(16,16,16)',
    'rgb(25,25,25)',
    'rgb(36,36,36)',
    'rgb(49,49,49)',
    'rgb(64,64,64)',
    'rgb(81,81,81)',
    'rgb(100,100,100)',
    'rgb(121,121,121)',
    'rgb(144,144,144)',
    'rgb(169,169,169)',
    'rgb(196,196,196)',
    'rgb(225,225,225)',
  ]
  editor.config.pasteIgnoreImg = true
  if (props.config) {
    for (const key in props.config) {
      (editor.config as any)[key] = props.config[key]
    }
  }

  editor.config.onchange = function (newHtml: string) {
    emit('update:modelValue', newHtml)
  }
  editor.create()
  editor.txt.html(props.modelValue)
  return editor
}
