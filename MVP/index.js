const express = require('express')
const expHandlebars = require('express-handlebars')
const session = require('express-session')
const Filestore = require('session-file-store') (session)
const flash = require('express-flash')

const connection = require('./database/connection')

const User = require('./models/User')

const E_trashwayController = require('./controllers/E_trashwayController')

const authRoutes = require('./routes/authRoutes')
const e_trashwayRoutes = require('./routes/e_trashwayRoutes')

const hsbPartials = expHandlebars.create({ partialsDir: ['views/partials'] })
const app = express()

const port = 4004

app.engine('handlebars', hsbPartials.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    name: 'session',
    secret: 'secreto (temporario)',
    resave: false,
    saveUninitialized: false,
    store: new Filestore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 86400,
        expires: new Date(Date.now() + 86400),
        httpOnly: true
    }
}))

app.use(flash())

app.use(express.static('public'))

app.use((request, response, next)=>{
    if(request.session.userId){
        response.locals.session = request.session
    }

    next()
    })

app.use('/', authRoutes)
app.use('/etrashway', e_trashwayRoutes)

app.get('/', E_trashwayController.homePage)

connection
.sync()
.then(()=>{app.listen(port, console.log(`Servidor iniciado - porta: ${port}`))})
.catch((error)=>{console.error('Não foi possível iniciar o servdior, erro: '+error)})