// importazione express con porta 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// importazione router
const moviesRouter = require('./routers/moviesRouter')

// importazione middlewares
const notFound = require('./middlewares/notFound')
const errorServer = require('./middlewares/errorsHandlers')

// file disponibili al client
app.use(express.static('public'))

// body-parse
app.use(express.json())

// pagina di benvenuto
app.get('/', (req, res) => {
    res.send('Ecco la mia web app')
})

// utilizzo router
app.use('/movies', moviesRouter)

// utilizzo middlewares
app.use(errorServer)
app.use(notFound)

// server in attesa
app.listen(port, () => {
    console.log(`Resto in ascolto sulla porta ${port}`)
})