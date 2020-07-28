import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { orange, red, amber, grey } from "@material-ui/core/colors";
import { ITodoItem } from "../types/ITodoItem";
import { LevelEnum, langEnum } from "../types/Enum";

const colorStyles = makeStyles((theme: Theme) =>
  createStyles({
    orange: {
      color: orange[500]
    },

    red: {
      color: red[500]
    },

    amber: {
      color: amber[500]
    },

    grey: {
      color: grey[500]
    }
  })
);

export function getLevelColor(item: ITodoItem) {
  const classes = colorStyles();

  if (item.isFinish) return classes.grey;

  return getLevelColorByLevel(item.level);
}

export function getLevelColorByLevel(level: string) {
  const classes = colorStyles();

  switch (level) {
    case LevelEnum.HIGHEST:
      return classes.red;
    case LevelEnum.IMPORTANT:
      return classes.orange;
    case LevelEnum.ADVANCED:
      return classes.amber;
    default:
      return classes.grey;
  }
}

// 是否时间对象
export const isDate = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date";
};

// 是否boolean
export const isBoolean = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};

// 是否字符串
export const isString = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};

// 是否数字
export const isNumber = (o: any) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};

/**
 * 创建日期的工厂函数，生成一个指定日期，如果无效，返回当日日期
 * @param {String | Number | Date} date 日期
 */
export function createDate(date?: any) {
  if (isString(date) || isNumber(date)) {
    return new Date(date);
  } else if (isDate(date)) {
    return date;
  } else {
    return new Date();
  }
}

/**
 * 检测给出了内容是否可以转成一个日期对象，如果可以，返回日期对象，如果不能，返回null
 * @param {Date | String | Number} date
 */
export function checkDate(date: any): Date {
  if (typeof date === "string" || typeof date === "number") {
    try {
      date = createDate(date);
    } catch (error) {
      date = null;
    }
  }
  return date;
}


const WEEK = {
  "zh": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}

/**
 * 格式化时间
 * @param {Date | String | Number} date 日期对象，或一个日期字符串，对其进行格式化
 * @param {String} fmt 格式文本，y:年，q:季度，M:月，d:日，D:星期, H:小时，m:分钟，s:秒，S:毫秒。例：`yyyy-MM-dd`
 * @param {langEnum} lang 文本语言，多用于星期，默认中文，支持英文显示
 * @return {String} 格式化的内容，
 */
export function formatDate(date: any = null, fmt = "yyyy-MM-dd", lang: langEnum = langEnum.zh) {
  if (!isDate(date)) {
    date = checkDate(date);
  }

  if (date === null) {
    date = createDate();
  }

  var o: any = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };

  // 年份
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );

  // 星期
  if (/(D+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      WEEK[lang][date.getDay()]
    );
  }

  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

/**
 * 生成uuid
 * @param {Number} len 指定uuid的长度
 * @param {Number} radix 进制，默认16进制
 */
export function createUuid(len: number = 20, radix: number = 16) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}


/**
 * 判断两个日期是否相等
 * @param {Date | String} date1
 * @param {Date | String} date2
 */
export function sameDate(date1: Date | string, date2: Date | string) {
  const d1 = createDate(date1);
  const d2 = createDate(date2);
  if (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
    return true;
  return false;
}
