require('dotenv').config()
const express = require('express')
const massive = require('massive')
const authCtrl = require('./Controllers/controller')
const session = require('express-session')
const cors = require('cors')
const postCtrl = require('./controllers/postController')
// const feather = require('feather-icons')

const app = express()
const{CONNECTION_STRING, SERVER_PORT, SESSION_SECRET}= process.env

app.use(express.json())
app.use(cors())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxage: 60000
    }
}))

massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance)
    console.log('database be mile high clubbin')
})
.catch(error => {
    console.log('you done effed up aaron')
})

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/user', authCtrl.getUser )
app.delete('/auth/logout', authCtrl.logout)

app.get('/api/post/getAll', postCtrl.getPosts)
app.get('/api/post/:id', postCtrl.getPost)
app.post('/api/post/add', postCtrl.addPost)

app.listen(SERVER_PORT,() => console.log('server be mile high clubbin'))

