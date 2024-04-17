import { parseISO, format } from 'date-fns';
export function formatIsoDateStringWithoutMillis(inputDate: string): string {
    // 验证输入日期字符串是否符合ISO 8601格式
    const isValidFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(inputDate);
    if (!isValidFormat) {
      throw new Error('Invalid ISO 8601 date string');
    }
  
    // 使用date-fns的parseISO解析输入日期字符串为Date对象
    const parsedDate = parseISO(inputDate);
  
    // 使用format函数将Date对象格式化为只包含年月日时分秒的字符串
    const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm');
  
    return formattedDate;
}