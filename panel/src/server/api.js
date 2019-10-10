require('dotenv').config()
const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()
const secret = process.env.secret || 'testkey123'



const ActiveDirectory = require('activedirectory')

const config = {
    url: 'ldap://usiminas',
    baseDN: 'dc=domain,dc=com'
}
const ad = new ActiveDirectory(config)
const prefix = 'USIMINAS\\'


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

app.use(cors())

router.post('/register', function (req, res) {
    // db.createUser({
    //     id: null,
    //     user: req.body.username,
    //     pass: bcrypt.hashSync(req.body.password, 8)
    // })
    // let user = db.getUser(req.body.username)
    // let token = jwt.sign({ id: user.id }, privateKey, {
    //     expiresIn: 86400, // expires in 24 hours
    //     algorithm: 'RS256'
    // })
    // console.log(bcrypt.compareSync(req.body.password, user.password))
    // res.status(200).send({ auth: true, token: token, user: user.id })
})

router.post('/login', (req, res) => {
    console.log(req)
    if (req.body.username == '' || req.body.password == '') {
        res.status(401)
        res.send({
            success: false,
            message: 'Usuário ou senha não informados'
        })
    }
    else if (!req.body.username.toLowerCase().includes(prefix.toLowerCase())) {
        req.body.username = prefix + req.body.username
    }
    ad.authenticate(req.body.username, req.body.password, function (err, auth) {
        if (err) {
            console.log(err)
            res.status(403)
            res.send({
                success: false,
                message: 'Incorrect username or password'
            })
        } else {
            const token = jwt.sign({ username: req.body.username }, secret)
            res.status(200)
            res.send({
                success: true,
                message: 'Login Concluded',
                auth: auth,
                token: token
            })
        }
    })
})

app.use(router)

let port = process.env.PORT || 3000

app.listen(port, function () {
    console.log('Express server listening on port ' + port)
})