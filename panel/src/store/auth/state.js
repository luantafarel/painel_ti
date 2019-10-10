const state = {
  token: localStorage.getItem('token'),
  loginWait: false,
  loginFailed: false,
  loginErrorMsg: null
}

export default state
