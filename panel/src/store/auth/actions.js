import Vue from 'vue'
import authConfig from '@/config/auth'

const getUrl = url => {
  let urlArray = []
  if (authConfig.api) {
    urlArray.push(authConfig.api)
  }
  if (authConfig.prefix) {
    urlArray.push(authConfig.prefix)
  }
  urlArray.push(url)
  return urlArray.join('/')
}

const actions = {
  login({ commit }, credential) {
    commit('loginWait', true)
    commit('setLoginErrorMsg', null)
    return new Promise((resolve, reject) => {
      const path = authConfig.paths.login || 'login'
      Vue.prototype.$http
        .post(getUrl(path), credential)
        .then(result => {
          console.log(result.statusCode)
          if (result.statusCode === 200) {
            commit('login', result.data)
            resolve()
          } else {
            let msg = JSON.parse(result.body)
            msg = msg.message
            if (msg) {
              commit('setLoginErrorMsg', msg)
            }
            commit('loginWait', false)
            commit('loginFailed')
            reject()
          }
        })
        .catch(error => {
          let msg = error.response.data || error.response.statusText
          if (msg) {
            console.log(msg.message)
            commit('setLoginErrorMsg', msg.message)
          }
          commit('loginWait', false)
          commit('loginFailed')
          reject()
        })
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('logout')
      resolve()
    })
  }
}

export default actions
