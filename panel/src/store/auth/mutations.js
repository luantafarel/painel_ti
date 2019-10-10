const mutations = {
    login(state, data) {
      state.logged = 1
      state.loginFailed = false
      const { token } = data
      const user = JSON.stringify(data.user)
      const permissions = JSON.stringify(data.permissions)
  
      localStorage.setItem('token', token)
      localStorage.setItem('user', user)
      // localStorage.setItem('permissions', permissions)
      state.token = token
      state.user = user
      state.permissions = permissions
    },
    loginWait(state, status) {
      state.loginWait = status
    },
    loginFailed(state) {
      state.loginFailed = true
    },
    logout(state) {
      state.loginWait = false
      state.loginFailed = false
      state.logged = 0
      state.user = null
      state.token = null
      state.permissions = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // localStorage.removeItem('permissions')
    },
    refreshToken(state, data) {
      const { token } = data
      localStorage.setItem('token', token)
      state.token = token
    },
    setLoginErrorMsg(state, msg) {
      state.loginErrorMsg = msg
    }
  }
  
  export default mutations
  