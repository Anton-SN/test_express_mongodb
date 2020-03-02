const { Router } = require('express')
const User = require('../models/user')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {
    if (req.session.user) {
        const { name: firstName } = req.session.user
        const {lastName, email, orders} = await User.findOne({ firstName }) 
        res.render('index', {
            title: "Main",
            isUser: true,
            name: firstName,
            lastName,
            email,
            orders: orders.length
        })
    } else {
        res.render('index', {
            title: "Main",
            isUser: true,
    })}
})

router.get('/signup', (req, res) => {
    res.render('signUp', {
        title: "Sign Up",
        isSignUp: true
    })
})


router.post('/signup', async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const id = firstName+lastName
    const user = new User({
        id,
        firstName,
        lastName,
        email,
        password,
        orders: [],
    })
    
    req.session.user = {
        id: user._id,
        name: user.firstName
    }
    await user.save()
    res.render('index', {
        title: "Main",
        isIndex: true,
        name: user.firstName
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login",
        isLogin: true
    })
})

router.post('/login', async (req, res) => {
    const { password, email } = req.body
    const user = await User.findOne({ email })
    if (password !== user.password) {
        console.log("Не верный пароль")
        res.render('login', {
            wrongPass: true,
        })
    } else {
        req.session.user = {
            id: user._id,
            name: user.firstName
        }
        res.render('index', {
            title: "Main",
            isIndex: true,
            name: user.firstName
        })
    }
})

router.get('/logout', (req, res) => {
    res.render('logout', {
        title: "Logout",
        isLogout: true
    })
})

router.post('/logout', (req, res) => {
    if (req.session.user) {
        delete req.session.user;
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

router.get('/order', (req, res) => {
    if (req.session.user) {
        res.render('order', {
            title: "Create order",
            isOrder: true,
            isAuth: true
        })
    } else {
        res.render('order', {
            title: "Create order",
            isOrder: true,
            isAuth: false
        })
    }
})

router.post('/order', async (req, res) => {
    const {serviceName, targetUrl, price, actionName, count} = req.body
    const id = serviceName+targetUrl
    const { name:firstName } = req.session.user
    const currentUser = await User.findOne({ firstName }) 
    const order = new Order({
        id,
        serviceName,
        targetUrl,
        price,
        serviceActions: [
            {
                actionName,
                count
            }
        ],
    })
    currentUser.orders.push(order)
    await currentUser.save()
    res.render('order', {
        title: "Create order",
        isOrder: true,
        isAuth: true,
        add: true,
    })
})

router.get('/list', async (req,res) => {
    if (req.session.user) {
        const { name:firstName } = req.session.user
        const currentUser = await User.findOne({ firstName })
        const order = currentUser.orders
        res.render('list', {
            title: "Order list",
            isList: true,
            isAuth: true,
            order
        })
    } else {
        res.render('list', {
            title: "Order list",
            isList: true,
            isAuth: false
        })
    }
})

module.exports = router