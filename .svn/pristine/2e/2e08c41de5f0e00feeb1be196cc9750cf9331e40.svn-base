export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 合法用户名 */
export function validUsername(str) {
  const reg = /^[a-zA-Z0-9]{6,}$/
  return reg.test(str)
}

export function validRealname(str) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}

/* 合法uri */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* 小写字母 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 大于0的整数 */
export function validNumber(str) {
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
*/
export function validEmail(email) {
  const re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return re.test(email)
}

export function validPhoneNum(str) {
  const re = /^1[3|4|5|7|8][0-9]{9}$/
  return re.test(str)
}

export function validDingDing(str) {
  const re = /^1[3|4|5|7|8][0-9]{9}$/
  return re.test(str)
}

export function validPassword(str) {
  const re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
  return re.test(str)
}

export function validTitle(str) {
  const re = /\S/
  return re.test(str)
}

export function validSort(str) {
  const re = /^[1-9][0-9]*$/
  return re.test(str)
}

/* IP地址 */
export function validIpAddress(str) {
  const re = /^(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))$/
  return re.test(str)
}
