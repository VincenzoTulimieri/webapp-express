// importazione express con porta 
const express = require('express')
const app = express()
const port = 3000

// importazione router
const moviesRouter = require('./routers/moviesRouter')

// importazione middlewares
const notFound = require('./middlewares/notFound')
const errorServer = require('./middlewares/errorsHandlers')

// file disponibili al client
app.use(express.static('public'))

// body-parse
app.use(express.json())

// utilizzo router
app.use('/movies', moviesRouter)

// utilizzo middlewares
app.use(notFound)
app.use(errorServer)

// server in attesa
app.listen(port, () => {
    console.log(`Resto in ascolto sulla porta ${port}`)
})