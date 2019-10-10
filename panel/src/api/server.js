require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')
const privateKey = process.env.secret || 'testkey123'

const ActiveDirectory = require('activedirectory')

const config = {
  url: 'ldap://usiminas',
  baseDN: 'dc=domain,dc=com'
}
const ad = new ActiveDirectory(config)
const prefix = 'USIMINAS\\'

class HandlerGenerator {
  login(req, res) {
    console.log(req)
    if (!(req.username && req.password)) {
      res.status(401)
      res.send({
        success: false,
        message: 'Usuário ou senha não informados'
      })
    }
    if (!req.username.toLowerCase().includes(prefix.toLowerCase())) {
      req.username = prefix + req.username
    }
    ad.authenticate(req.username, req.password, function (err, auth) {
      if (err) {
        console.log(err)
        res.status(403)
        res.send({
          success: false,
          message: 'Incorrect username or password'
        })
      } else {
        const token = jwt.sign({ username: req.username }, privateKey)
        res.status(400)
        res.send({
          success: false,
          message: 'Authentication failed! Please check the request',
          auth: auth,
          token: token
        })
      }
    })
  }
  index(req, res) {
    res.send({
      success: true,
      message: 'Index page'
    })
  }
}

// Starting point of the server
function main() {
  const app = express() // Export app for other routes to use
  const handlers = new HandlerGenerator()
  const port = 3000
  app.use(
    bodyParser.urlencoded({
      // Middleware
      extended: true
    })
  )
  app.use(bodyParser.json())
  // Routes & Handlers
  app.post('/login', handlers.login)
  app.get('/', middleware.checkToken, handlers.index)
  app.listen(port, () => console.log(`Server is listening on port: ${port}`))
}

main()
