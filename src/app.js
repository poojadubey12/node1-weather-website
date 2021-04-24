const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectorPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setup static directory to serve
app.use(express.static(publicDirectorPath))


//app.com
//app.com/help
//app.com/about

//No Need of below code when we use path.join function
// app.get('' , (req, res)=>{
// res.send('<h1>Hello Express !<\h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'pooja'
//     },{
//         name:'Ashu'
//     }])
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>About<\h1>')
// })

app.get('',(req, res) =>{
    res.render('index', {
        title:'Weather Forecast',
        name:'Pooja'
    })
})


app.get('/help',(req, res) => {
 res.render('help',{
     HelpText: 'This is some help you need !',
     title:'Help',
     name:'Pooja'
 })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title:'About Me',
        name:'Pooja'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastdata) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products',(req,res) =>{
    
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
       
})

app.get('/help/*',(req, res) =>{
    res.render('404',{
        title:'404',
        name: 'Pooja Dubey',
        errorMessage: 'Help Page Not Found'
    })
})

app.get('*',(req, res) =>{
    res.render('404',{
        title:'404',
        name: 'Pooja Dubey',
        errorMessage: 'Page Not Found'
    })
})
app.listen(3000, () => {
 console.log('Server is up now at port 3000')
})
