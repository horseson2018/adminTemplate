const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time, 10)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time *= 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return timeStr
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange) {
  const search = params;
  search.beginTime = ''
  search.endTime = ''
  if (dateRange !== null && dateRange !== '') {
    search.beginTime = this.dateRange[0];
    search.endTime = this.dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  const actions = [];
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue === (`${value}`)) {
      actions.push(datas[key].dictLabel);
      return false;
    }
    return true
  })
  return actions.join('');
}

// 通用下载方法
export function download(fileName) {
  window.location.href = `${baseURL}/common/download?fileName=${encodeURI(fileName)}&delete=${true}`;
}

// 字符串格式化(%s )
export function sprintf(str) {
  const args = arguments
  let flag = true;
  let i = 1;
  str = str.replace(/%s/g, () => {
    const arg = args[i += 1];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str === 'undefined' || str === 'null') {
    return '';
  }
  return str;
}
