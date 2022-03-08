require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Fruit = require('./models/fruits')

// middleware executes for all routes, make sure to put at top so it can be executed for the routes
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:false
        }
    ], (err, data)=>{
        res.redirect('/fruits')
    })
})


// add index route
app.get('/fruits/', (req, res) => {
    // res.render('Index', { fruits: fruits }) // previous method before database
    Fruit.find({}, (error, allFruits) => {
        res.render('Index', {fruits: allFruits})
    })
})

// put this above Show route
app.get('/fruits/new', (req, res) => {
    res.render('New')
})

// POST: New fruit / create route
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
    }
    Fruit.create(req.body, (error, createdFruit) => {
        // res.send(createdFruit)
        res.redirect('/fruits') // redirect that was previously used
    })
})

// add Show route
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('Show', {fruit: foundFruit})
    })
    // res.render('Show', {//second param must be an object
    // fruit: fruits[req.params.indexOfFruitsArray]
    // there will be a variable available inside the ejs file called fruit, it's value is fruits[req.params.indexOfFruitsArray]
    // })
})
// Old way of doing it with get and send and no jsx file/engine
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     res.send(fruits[req.params.indexOfFruitsArray])
// })


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

app.listen(3000, () => {
    console.log('listening')
})
