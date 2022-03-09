require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Fruit = require('./models/fruits')
const PORT = process.env.PORT || 3000
const methodOverride = require('method-override')

// middleware executes for all routes, make sure to put at top so it can be executed for the routes
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static('public')) // tells express to match requests with files in directory 'public'

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
})

// add delete route, goes beneath show route
app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits')
    })
})

// add an edit route, goes beneath delete route
app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) =>{
        if(!err){
            res.render('Edit', { fruit: foundFruit })
        }
        else {
            res.send({ msg: err.message })
        }
    })
})
// second part of the edit route (edit redirects to this)
app.put('/fruits/:id', (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    }
    else {
        req.body.readyToEat = false
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/fruits')
    })
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
