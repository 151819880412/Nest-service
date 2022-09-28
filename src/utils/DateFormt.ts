/**
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * @param fmt 时间格式
 * @param second 秒
 */
export const Formt = function (fmt: string, second = 1): string {
  const date: Date = new Date();
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds() + second, //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  return fmt;
};

export const FormtToString = function (
  date: Date,
  fmt: string,
  second = 0,
): string {
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds() + second, //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
  return fmt;
};

/**
 *返回12小时制 下午 6:12
 *@param 秒
 */
export const GetTimeByPeriod = function () {
  return Formt('HH:mm');
};

/**
 * 时间戳转化成时间格式
 * @param 时间戳
 */
export const TimeFormat = function (timestamp) {
  return Formt('HH:mm');
};

//时间戳转化成秒
export const GetTime = function () {
  const time = Date.now() / 1000;
  const second = Math.floor(time);
  return second;
};

/**
 * 一定的秒数转化成时分秒格式
 * @param 秒
 */
export const SecondsFormatHours = function (s) {
  s = Math.abs(Math.floor(s));
  const day = 0;
  let hour: any = Math.floor((s - day * 24 * 3600) / 3600);
  let minute: any = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  let second: any = s - day * 24 * 3600 - hour * 3600 - minute * 60;

  hour = hour > 9 ? hour : '0' + hour;
  minute = minute > 9 ? minute : '0' + minute;
  second = second > 9 ? second : '0' + second;
  if (s > 0) return hour + ':' + minute + ':' + second + '';
  else return `00:00:00`;
};

/**
 * 一定的秒数转化成分秒格式（数字）
 * @param 秒
 */
export const SecondsFormatMinutes = function (s) {
  s = Math.abs(Math.floor(s));
  const hour = 0;
  let minute: any = Math.floor((s - hour * 3600) / 60);
  let second: any = s - hour * 3600 - minute * 60;
  minute = minute > 9 ? minute : '0' + minute;
  second = second > 9 ? second : '0' + second;
  if (s > 0) {
    return minute + ':' + second;
  } else {
    return `00:00`;
  }
};

/**
 * 一定的秒数转化成月天时分秒格式（数字）
 * @param 秒
 */
export const SecondsFormatDayHourMinuteNumber = function (s) {
  s = Math.abs(Math.floor(s));
  const month = Math.floor(s / (24 * 3600 * 30)); // Math.floor()向下取整

  let reduce = month * (24 * 3600 * 30);
  const day = Math.floor((s - reduce) / (24 * 3600)); // Math.floor()向下取整
  reduce += day * (24 * 3600);
  let hour: any = Math.floor((s - reduce) / 3600);
  reduce += hour * 3600;
  let minute: any = Math.floor((s - reduce) / 60);
  reduce += minute * 60;
  let second: any = s - reduce;

  hour = hour > 9 ? hour : '0' + hour;
  minute = minute > 9 ? minute : '0' + minute;
  second = second > 9 ? second : '0' + second;
  let desc = '';
  desc += month > 0 ? `${month}:` : ``;
  desc += day > 0 ? `${day}:` : ``;
  desc += `${hour}:`;
  desc += `${minute}:`;
  desc += `${second}:`;

  if (s > 0) return desc;
  else return `00:00:00`;
};

/**
 * 一定的秒数转化成月天时分秒格式（文字）
 * @param 秒
 */
export const SecondsFormatDayHourMinuteText = function (s) {
  s = Math.abs(Math.floor(s));
  const month = Math.floor(s / (24 * 3600 * 30)); // Math.floor()向下取整

  let reduce = month * (24 * 3600 * 30);
  const day = Math.floor((s - reduce) / (24 * 3600)); // Math.floor()向下取整
  reduce += day * (24 * 3600);
  let hour: any = Math.floor((s - reduce) / 3600);
  reduce += hour * 3600;
  let minute: any = Math.floor((s - reduce) / 60);
  reduce += minute * 60;
  let second: any = s - reduce;

  hour = hour > 9 ? hour : '' + hour;
  minute = minute > 9 ? minute : '' + minute;
  second = second > 9 ? second : '' + second;
  let desc = '';
  desc += month > 0 ? `${month}月` : ``;
  desc += day > 0 ? `${day}天` : ``;
  desc += `${hour}时`;
  desc += `${minute}分`;
  desc += `${second}秒`;

  if (s > 0) return desc;
  else return ``;
};

/**
 * 一定的秒数秒转几天前几小时前几分前（文字）
 * @param 秒
 */
export const SecondsFormatDayHourMinuteBrfore = function (s) {
  s = Math.abs(Math.floor(s));
  const day = Math.floor(s / (24 * 60 * 60));
  let reduce = day * 24 * 60 * 60;
  const hour = Math.floor((s - reduce) / (60 * 60));
  reduce += hour * 60 * 60;
  const minute = Math.floor((s - reduce) / 60);
  if (day > 0) {
    return day + '天前';
  } else if (hour > 0) {
    return hour + '小时前';
  } else if (minute > 0) {
    return minute + '分钟前';
  } else {
    return '刚刚';
  }
};
