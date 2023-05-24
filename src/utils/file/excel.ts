import dayjs from '@/dayjs'
import { camelCase, cloneDeep, isArray, merge } from 'lodash'
import * as XLSX from 'xlsx'

// excel 下载
export function downLoadFile(fileData: BlobPart, fileName: string) {
  const elink = document.createElement('a')
  elink.download = `${fileName}.xlsx`
  elink.style.display = 'none'
  const blob = new Blob([fileData], {
    type: 'application/vnd.ms-excel',
  })
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
// 通用下载
export function downLoadFilename(fileData: BlobPart, fileName: string) {
  const elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  const blob = new Blob([fileData])
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
}
type HandleDateOption = { format?: string; wordAfter?: boolean; wordCenter?: boolean }
export function handleDateRange(data: any, key: string, options: HandleDateOption) {
  const { format = 'YYYY-MM-DD', wordAfter = true, wordCenter = false } = options
  const date = {}
  if (data[key]?.length === 2) {
    let start, end
    if (wordCenter) {
      start = `${key.replace('Date', '')}StartDate`
      end = `${key.replace('Date', '')}EndDate`
    } else {
      if (wordAfter) {
        start = `${key}Start`
        end = `${key}End`
      } else {
        start = camelCase(`Start_${key}`)
        end = camelCase(`End_${key}`)
      }
    }
    // @ts-ignore
    date[start] = dayjs(data[key][0]).format(format) // YYYY-MM-DD HH:mm:ss
    // @ts-ignore
    date[end] = dayjs(data[key][1]).format(format)
  }
  return date
}
export function handleFormDateRange(data: any, key: Array<string>, handleDateOption?: HandleDateOption) {
  key.forEach((k) => {
    data = {
      ...data,
      //处理时间范围查询
      ...handleDateRange(data, k, merge({ format: 'YYYY-MM-DD', wordAfter: true, wordCenter: false }, handleDateOption || {})),
    }
    delete data[k]
  })
  return data
}
export function handleMultiSelect(data: any, key: Array<string>) {
  const newData = cloneDeep(data)
  key.forEach((k) => {
    if (newData[k] && isArray(newData[k])) {
      newData[k] = newData[k].join()
    }
  })
  return newData
}

/**
 * @param header 示例：let header = ['Name', 'City']
 * @param data 示例：
 * 
    var data = [
      { name: 'John', city: 'Seattle' },
      { name: 'Mike', city: 'Los Angeles' },
      { name: 'Zach', city: 'New York' },
    ]

 * @param name 示例：xx数据
 */
export function saveXlsx(header: Array<string>, data: Array<any>, name: string) {
  const ws = XLSX.utils.book_new()
  XLSX.utils.sheet_add_aoa(ws, [header])
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true })
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
  XLSX.writeFile(wb, `${name}-${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`)
}

export function getMonth(n: number) {
  const num = Number(String(n).slice(-2)) || ''
  let month
  switch (num) {
    case 1:
      month = '一'
      break
    case 2:
      month = '二'
      break
    case 3:
      month = '三'
      break
    case 4:
      month = '四'
      break
    case 5:
      month = '五'
      break
    case 6:
      month = '六'
      break
    case 7:
      month = '七'
      break
    case 8:
      month = '八'
      break
    case 9:
      month = '九'
      break
    case 10:
      month = '十'
      break
    case 11:
      month = '十一'
      break
    case 12:
      month = '十二'
      break
    default:
      month = ''
  }
  return month ? `${month}月` : ''
}

export function getNumByMonth(str: string) {
  let num
  switch (str) {
    case '一月':
      num = '01'
      break
    case '二月':
      num = '02'
      break
    case '三月':
      num = '03'
      break
    case '四月':
      num = '04'
      break
    case '五月':
      num = '05'
      break
    case '六月':
      num = '06'
      break
    case '七月':
      num = '07'
      break
    case '八月':
      num = '08'
      break
    case '九月':
      num = '09'
      break
    case '十月':
      num = '10'
      break
    case '十一月':
      num = '11'
      break
    case '十二月':
      num = '12'
      break
    default:
      num = '01'
  }
  return num
}

//最大按万元 换算金额单位
export function get10KMoney(val: number | undefined, fixed = 2) {
  if (!val) {
    return {
      val: '--',
      unit: '元',
    }
  }
  const valAbs = Math.abs(val)
  if (valAbs > 9999) {
    return {
      val: (valAbs / 10000).toFixed(fixed).toLocaleString(),
      unit: '万元',
    }
  }
  return {
    val: valAbs.toFixed(fixed).toLocaleString(),
    unit: '元',
  }
}

//换算金额单位
export function getMoney(val: number | undefined, fixed = 2) {
  if (!val) {
    return {
      val: '--',
      unit: '元',
    }
  }
  const valAbs = Math.abs(val)
  if (valAbs > 99999999) {
    return {
      val: (valAbs / 100000000).toFixed(fixed).toLocaleString(),
      unit: '亿元',
    }
  } else if (valAbs > 9999) {
    return {
      val: (valAbs / 10000).toFixed(fixed).toLocaleString(),
      unit: '万元',
    }
  } else {
    return {
      val: valAbs.toLocaleString(),
      unit: '元',
    }
  }
}

// 获取当年的第几周 返回格式 xxxx0xx
export const getYearWeek = (date?: dayjs.ConfigType) => {
  const dat = dayjs(date)
  return `${dat.year()}${dat.week().toString().padStart(2, '0')}`
}

export const getYearQuarter = (time: Date) => {
  return (
    time.getFullYear().toString() +
    Math.ceil((time.getMonth() + 1) / 3)
      .toString()
      .padStart(2, '0')
  )
}

// 格式化月度id，周id 如：202101
export const timeIdToString = ({
  timeId,
  format = '$1 $2',
  regExp = /(\d{4})(\d{2})/,
}: {
  timeId: string | number
  format?: string
  regExp?: RegExp
}) => {
  const m = timeId.toString().match(regExp) as string[] | null
  if (m) {
    // @ts-ignore
    return format.replace(/\$([\d]{1})/g, (p0: string, p1: string) => parseInt(m[p1]).toString())
  }
  return timeId as string
}

// 获取当前时间 所在月份的开始时间和结束时间
export const getMonthStartEnd = (time: Date) => {
  const start = new Date(time)
  const end = new Date(time)

  start.setDate(1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  end.setMonth(end.getMonth() + 1)
  end.setDate(0)
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return { start, end }
}

// 获取当前时间 所在季度的开始时间和结束时间
export const getQuarterStartEnd = (time: Date) => {
  //清除时分秒
  const start = new Date(time)
  start.setMonth(start.getMonth() - (start.getMonth() % 3))
  start.setDate(1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date(start)
  end.setMonth(end.getMonth() + 3)
  end.setDate(0)
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return { start, end }
}

//获取当前年度的第一天和最后一天
export const getYearStartEnd = (time: Date) => {
  const start = new Date(time)
  const end = new Date(time)

  start.setMonth(0)
  start.setDate(1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  end.setMonth(12)
  end.setDate(0)
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return { start, end }
}

export const getMonthStartEndMonth = (time: Date) => {
  const range = getMonthStartEnd(time)
  return { startDate: dayjs(range.start).format('YYYYMM'), endDate: dayjs(range.end).format('YYYYMM') }
}
export const getQuarterStartEndMonth = (time: Date) => {
  const range = getQuarterStartEnd(time)
  return { startDate: dayjs(range.start).format('YYYYMM'), endDate: dayjs(range.end).format('YYYYMM') }
}
export const getYearStartEndMonth = (time: Date) => {
  const range = getYearStartEnd(time)
  return { startDate: dayjs(range.start).format('YYYYMM'), endDate: dayjs(range.end).format('YYYYMM') }
}

export const transUndefined = <R = any>(val: unknown) => (val === undefined || (typeof val === 'number' && isNaN(val)) ? '--' : (val as R))
