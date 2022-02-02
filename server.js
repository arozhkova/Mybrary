 if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()    
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts') 
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const bodyParser = require('body-parser')

// Set views and laxouts
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// DB Conection
const mongoose = require('mongoose')
const { compile } = require('ejs')
const db_url = process.env.DATABASE_URL
console.log(db_url)
mongoose.connect(db_url, { useNewUrlParser : true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

 
// Use the routers
app.use('/', indexRouter)
app.use('/authors', authorsRouter)


app.listen(process.env.PORT || 3000)