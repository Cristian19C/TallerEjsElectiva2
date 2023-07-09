const express = require('express')
const path = require('path')

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))


//configuracion para el motor de vistas ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')




//setting 

app.set('PORT',process.env.PORT || 3000)
app.set(express.v)

// app.get('/', (req, res) => res.send(" word"))
// console.log(__dirname);
// app.get('/', (req, res) =>{

//     res.sendFile(path.join(__dirname,'View/index.html'))
    
// })

app.use('/', require('./routes/index'))
// app.use('/about', require('./routes/about'))

app.listen(app.get('PORT'), ()=> console.log(`El servidodr esta escuchando por el puerto ${app.get('PORT')}`))