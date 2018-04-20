const request = require('./request')
const query = require('./query')
const Bmob = require('./bmob')
const error = require('./error')
const { isObject, isString } = require('./dataType')

const user = class user extends query {
  constructor() {
    const tableName = '_User'
    // this.setData = {}
    super(tableName)
    // super.tableNmae
  }
  set(key, val = "") {
    if (isString(key)) {
      this.setData[key] = val;
    }
  }
  requestEmailVerify(email){
    if (!isString(email)) {
      //异常
      throw new error(415)
    }
    
    this.setData = Object.assign({}, { email })
    console.log(this.setData)
    let route = Bmob._config.parameters.REQUEST_EMAIL_VERIFY
    return request(route, 'post', this.setData)
  }
  register(parma) {
    if (!isObject(parma)) {
      //异常
      throw new error(415)
    }
    this.setData = Object.assign(this.setData, parma)
    console.log(this.setData)
    let route = Bmob._config.parameters.REGISTER
    return request(route, 'post', this.setData)
  }
  login(username, password) {
    if (!isString(username) || !isString(password)) {
      //异常
      throw new error(415)
    }
    this.setData = Object.assign({}, { username, password })
    let route = Bmob._config.parameters.LOGIN
    return new Promise((resolve, reject) => {
      request(route, 'get', this.setData).then(res => {
        resolve(res)
      }).catch(err => {
        console.log('登陆失败')
        reject(err)
      })
    })
  }
  users() {
    let route = Bmob._config.parameters.USERS
    return request(route, 'get')
  }
}

module.exports = user