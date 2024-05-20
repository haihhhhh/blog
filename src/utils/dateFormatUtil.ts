import moment from 'moment-timezone';

export function formatIsoDateStringWithoutMillis(inputDate: string, timeZone: string): string {
  // 验证输入日期字符串是否符合ISO 8601格式
  const isValidFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(inputDate);
  if (!isValidFormat) {
    throw new Error('Invalid ISO 8601 date string');
  }

  // 使用moment-timezone解析并转换为指定时区的日期
  const parsedDate = moment.tz(inputDate, timeZone).utc();

  // 格式化为只包含年月日时分秒的字符串
  const formattedDate = parsedDate.format('YYYY-MM-DD HH:mm:ss');

  return formattedDate;
}

// 调用函数，传入东八区时区
// const formattedDate = formatIsoDateStringWithoutMillis("2024-05-20T23:15:16.000Z", "Asia/Shanghai");
// console.log(formattedDate); // 输出：2024-05-20 23:15:16