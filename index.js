const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const router = require('./route/router')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: "aaaaa",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        url: 'mongodb+srv://Anton:123@cluster0-552qs.mongodb.net/test'
    })
}))

app.use(router)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://Anton:123@cluster0-552qs.mongodb.net/test', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`We are live on ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

start()