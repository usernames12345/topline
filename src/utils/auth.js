// 封装用户信息模块
const localStorage=window.localStorage
const USER_KEY = 'user_info'
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}
export function saveUser (data) {
  localStorage.setItem(USER_KEY,JSON.stringify(data))
}
export function removeUser () {
  localStorage.removeItem(USER_KEY)
}
//export 支持导出  它支持导出多个成员
//export 有个好处是 可以按需加载 需要谁就加载谁打包的时候没有用的不会打包（npm run build）