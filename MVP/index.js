const express = require('express')
const expHandlebars = require('express-handlebars')

const connection = require('./database/connection')

const User = require('./models/User')

const E_trashwayController = require('./controllers/E_trashwayController')

const authRoutes = require('./routes/authRoutes')
const e_trashwayRoutes = require('./routes/e_trashwayRoutes')

console.log('TEstetteuyhr')

const hsbPartials = expHandlebars.create({ partialsDir: ['views/partials'] })
const app = express()

const port = 4004

app.engine('handlebars', hsbPartials.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

app.use('/', authRoutes)
app.use('/etrashway', e_trashwayRoutes)

app.get('/', E_trashwayController.homePage)

connection
.sync()
.then(()=>{app.listen(port, console.log(`Servidor iniciado - porta: ${port}`))})
.catch((error)=>{console.error('Não foi possível iniciar o servdior, erro: '+error)})