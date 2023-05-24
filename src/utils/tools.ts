import dayjs from '@/dayjs'
import { fullscreenStatus } from '@/store/fullcreen'
import { nextTick } from 'vue'

/* 
  获取时间范围，range 时间间距
  返回
  {
    now: '202106',
    last: '202101',
  }
*/
export function getMonthRange(range: number): { now: string; last: string } {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 2 //0-11表示1-12月
  const day = now.getDate()
  const dateObj = {
    now: '',
    last: '',
  }
  dateObj.now = year + '-' + (month - 1) + '-' + day
  const nowMonthDay = new Date(year, month, 0).getDate() //当前月的总天数
  if (month - range <= 0) {
    //如果是1、2、3月，年数往前推一年
    const lastRangeMonthDay = new Date(year - 1, 12 - (range - Number(month)), 0).getDate() //3个月前所在月的总天数
    if (lastRangeMonthDay < day) {
      //3个月前所在月的总天数小于现在的天日期
      dateObj.last = year - 1 + '-' + (12 - (range - month)) + '-' + lastRangeMonthDay
    } else {
      dateObj.last = year - 1 + '-' + (12 - (range - month)) + '-' + day
    }
  } else {
    const lastRangeMonthDay = new Date(year, Number(month) - range, 0).getDate() //3个月前所在月的总天数
    if (lastRangeMonthDay < day) {
      //3个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) {
        //当前天日期小于当前月总天数,2月份比较特殊的月份
        dateObj.last = year + '-' + (month - range) + '-' + (lastRangeMonthDay - (nowMonthDay - day))
      } else {
        dateObj.last = year + '-' + (month - range) + '-' + lastRangeMonthDay
      }
    } else {
      dateObj.last = year + '-' + (month - range) + '-' + day
    }
  }
  return dateObj
}

// 获取当前年月：202106、202110
export function currentYearAndMonth(): string {
  const time = new Date()
  const y = time.getFullYear()
  let m: any = time.getMonth() + 1
  m = m < 10 ? '0' + m.toString() : m.toString
  return y + m
}

// 参考 UI.md，格式化：万
export function formatterTenThousand(num: number | string): number {
  return formatOneDecimal(Number(num) / 10000)
}

// 参考 UI.md，格式化：亿
export function formatterTenHundredMillion(num: number | string): number {
  return formatOneDecimal(Number(num) / 100000000)
}
// 参考 UI.md，格式化：亿 并保留两位小数点
export function formatterTenHundredMillionKeepTwo(val: number | string, digit = 1): number | string {
  return formatDecimal(formatterTenHundredMillion(Number(val)), digit)
}
// 参考 UI.md，纯数字版本
export function formatterNumber(num: number | string): number {
  if (Number(num) < 10000) {
    return formatOneDecimal(Number(num))
  }
  if (Number(num) < 100000000) {
    return formatOneDecimal(Number(num) / 10000)
  }
  // Number(num > 100000000)
  return formatOneDecimal(Number(num) / 100000000)
}

//带单位版本，返回带单位的字符串
export function formatterNumberWithUnit(num: number | string): string {
  if (Number(num) >= 10000) {
    if (Number(num) < 100000000) {
      const numValue = Number(num) / 10000
      //有小数点时，不四舍五入
      return numValue.toString().includes('.') ? formatDecimal(numValue) + '万' : numValue + '万'
    } else if (Number(num)<100000000) {
      const numValue = Number(num) / 100000000
      //有小数点时，不四舍五入
      return numValue.toString().includes('.') ? formatDecimal(numValue) + '亿' : numValue + '亿'
    }
  }
  return (num.toString().includes('.') ? formatDecimal(Number(num)) : num).toString()
}
// 带单位版本，返回带单位的对象
export function formatterNumberWithUnitObj(number: number, unit = ''): { number: number; unit: string } {
  const obj = { number, unit }
  if (number >= 10000) {
    if (number < 100000000) {
      const newNum = number / 10000
      //有小数点时，不四舍五入
      obj.number = newNum.toString().includes('.') ? formatDecimal(newNum) : newNum
      obj.unit = '万' + unit
    } else if (number > 100000000) {
      const newNum = number / 100000000
      //有小数点时，不四舍五入
      obj.number = newNum.toString().includes('.') ? formatDecimal(newNum) : newNum
      obj.unit = '亿' + unit
    }
  }
  return obj
}

export function formatOneDecimal(val: string, digit?: number): string
export function formatOneDecimal(val: number, digit?: number): number

// 保留指定位数小数，不四舍五入
export function formatOneDecimal(val: number | string, digit = 1): number | string {
  if (typeof val === 'string') {
    return val.replace(new RegExp(`^(-)*(\\d+)\\.(\\d{${digit}}).*$`), '$1$2.$3')
  }
  return parseFloat(val.toString().replace(new RegExp(`^(-)*(\\d+)\\.(\\d{${digit}}).*$`), '$1$2.$3'))
}

export function formatterNum(val: any) {
  if (val === 0) {
    return 0
  } else {
    return (val && formatOneDecimal(val, 2)) || '--'
  }
}

//小数点精度处理
export const numberDigit = formatOneDecimal
export const formaterrOneDecimalReg = formatOneDecimal
export const formatDecimal = formatOneDecimal

export const fixedDecimal = (val: number, digit?: number) => parseFloat(val.toFixed(digit || 2))

export function emptyToDefault<T = any>(val: unknown, defaultVal: T) {
  return val === undefined || val === null ? defaultVal : undefined
}

// 增长正负颜色
export const addRateColor = (val: number): string => {
  return val < 0 ? 'num-color-red' : 'num-color-green'
}

export const getRandomCharts = (): string => Math.random().toString(32).split('.')[1]

export const getCurrentDateTime = (format = 'YYYY-MM-DD HH:mm:ss', date: Date = new Date()): string => dayjs(date).format(format)

export const clearHtml = (str: string, newLineChart = '\n'): string =>
  str
    .replace(/<[^<>]+>/g, newLineChart)
    .replace(/\n{2,}/g, newLineChart)
    .trim()

export const sleep = (time: number): Promise<true> => new Promise((resolve) => setTimeout(() => resolve(true), time))

export type FormatNumberOptions<Val = any> = {
  defaultVal?: Val | string
  unit?: string
  bigNumFormat?: boolean
  returnWithUnit?: boolean
  digit?: number
}
export function formatNumber(num: number): number
export function formatNumber(num: undefined | null | ''): string
export function formatNumber(num: string): number
export function formatNumber(num: number | string, options: { bigNumFormat: true }): string | number
export function formatNumber(num: number | string, options: { unit: string }): string
export function formatNumber(num: number | string, options: { returnWithUnit: true }): { num: number; unit: string }
export function formatNumber<DefaultVal = any, N = null | undefined | string>(num: N, options: FormatNumberOptions<DefaultVal>): DefaultVal | string
/**
 * 格式化数字
 * @param num
 * @param options
 * defaultVal 默认值：num值为undefined、null、false、''，时返回此变量值
 * unit 单位
 * bigNumFormat 大数是否格式化：超过10000时，是否格式化为万、亿
 * returnWithUnit 是否以对象方式返回单位 {num: 100, unit: '个'}
 * digit 小数位数精度：bigNumFormat=false生效
 * @returns 返回类型示例：'10.5万','10.5万元',10.5,10.55,{num:10.5,unit:'万'},{num:10.5,unit:'万元'}
 */
export function formatNumber<DefaultVal = any>(num: number | string | null | undefined, options?: FormatNumberOptions<DefaultVal>) {
  const { defaultVal = '', unit = '', bigNumFormat = false, returnWithUnit = false, digit = 1 } = options || {}
  let numBase: number
  if (typeof num !== 'number') {
    if (!num) {
      return defaultVal
    } else {
      const strNum = num.toString()
      const newNum = strNum.indexOf('.') > -1 ? parseFloat(strNum) : parseInt(strNum)
      if (Number.isNaN(newNum) || Number.isFinite(newNum)) {
        console.warn(`formatNumber num value: ${num}`)
        return newNum
      }
      numBase = newNum
    }
  } else {
    numBase = num
  }

  if (bigNumFormat && numBase >= 10000) {
    const k = 10000
    const sizes = ['', '万', '亿', '万亿', '亿亿', '万亿亿', '亿亿亿']
    const i = Math.floor(Math.log(numBase) / Math.log(k))
    numBase = numberDigit(numBase / Math.pow(k, i), digit)
    return returnWithUnit ? { num: numBase, unit: `${sizes[i]}${unit}` } : [numBase, sizes[i], unit].join('')
  } else {
    numBase = numberDigit(numBase, digit)
  }
  return unit ? [numBase, unit].join('') : numBase
}

export type Decimal2PercentOptions<Val = any> = { useSymbol?: boolean; digit: number; defaultVal?: Val }

/** 声明重载 */
export function decimal2Percent(decimal: number): number
export function decimal2Percent(decimal: number, options: { useSymbol: true; digit: number }): string
export function decimal2Percent<DefaultVal = any>(decimal: unknown, options: Decimal2PercentOptions<DefaultVal>): DefaultVal
/**
 * 小数转百分比
 * @param decimal
 * @param options
 * @returns 返回类型示例：'100%',100,'1.1%',1.2
 */
export function decimal2Percent<DefaultVal = any>(decimal: any, options?: Decimal2PercentOptions) {
  const params: Decimal2PercentOptions<DefaultVal> = options || { digit: 1, useSymbol: false, defaultVal: NaN }

  return typeof decimal === 'number'
    ? params.useSymbol
      ? `${numberDigit(decimal * 100, params.digit)}%`
      : numberDigit(decimal * 100, params.digit)
    : params.defaultVal
}

export const exitFullscreenKey =
  ['webkitExitFullscreen', 'exitFullscreen', 'mozExitFullscreen', 'msExitFullscreen'].find((key) => key in document) || 'exitFullscreen'
export const requestFullscreenKey =
  ['webkitRequestFullscreen', 'requestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'].find((key) => key in document) ||
  'requestFullscreen'
export function setFullscreen(state = true) {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      setTimeout(() => {
        const message = 'timeout'
        reject({ message })
      }, 1500)

      const El = document.getElementById('__full__')
      //没全屏，且获得全屏元素
      if (!document.fullscreenElement && El) {
        fullscreenStatus.value = state
        // @ts-ignore
        El[requestFullscreenKey]()
      } else {
        if (!El) {
          throw new Error('没有获取到全屏元素')
        }
        if (document.fullscreenElement) {
          throw new Error('已经全屏，全屏失败')
        }
      }
    })
    document.onfullscreenchange = function () {
      const isFull = !!document.fullscreenElement

      fullscreenStatus.value = isFull
      resolve(isFull)
    }
    document.onfullscreenerror = function (event) {
      const isFull = !!document.fullscreenElement

      fullscreenStatus.value = isFull
      reject(isFull)
      console.error(event)
    }
  })
}

export const getYearByMonthId = (monthId: string, defaultValue = '') => {
  const matched = monthId.match(/^(\d{4})(\d{2})$/)
  if (!matched) {
    return defaultValue
  }
  return matched[1]
}
/*
getFileNameByUrl('/pic-5-1655983386022.png.png')
//'pic-5-1655983386022.png.png'
getFileNameByUrl('/pic-5-1655983386022.png.png','ext')
//'png'
getFileNameByUrl('/pic-5-1655983386022.png.png','name')
//'pic-5-1655983386022.png'
 */
export const getFileNameByUrl = (url: string, mode: 'name' | 'ext' | '' = '') => {
  const list = url.split('/')
  if (list.length === 0) {
    console.log(`error url: ${url}`)
    return 'unknown'
  }

  const last = list[list.length - 1]
  // 完整文件名
  if (mode === '') {
    return last
  }
  const listExt = last.split('.')

  if (listExt.length === 0) {
    console.log(`error url: ${url}`)
    return 'unknown'
  }

  const ext = listExt.pop()

  if (mode === 'name') {
    return listExt.join('.')
  }

  return ext
}

export const getFileNameObjectByUrl = (url: string) => {
  const list = url.split('/')
  if (list.length === 0) {
    console.log(`error url: ${url}`)
    return {
      filename: 'unknown',
      name: 'unknown',
      ext: 'unknown',
    }
  }

  const last = list[list.length - 1]

  const listExt = last.split('.')

  if (listExt.length === 0) {
    console.log(`error url: ${url}`)
    return {
      filename: last,
      name: last,
      ext: 'unknown',
    }
  }

  const ext = listExt.pop()

  return {
    filename: last,
    name: listExt.join('.'),
    ext: ext,
  }
}
