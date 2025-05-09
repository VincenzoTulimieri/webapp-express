// importazione express con porta 
const express = require('express')
const app = express()
const port = 3000

// importazione middlewares
const notFound = require('./middlewares/notFound')
const errorServer = require('./middlewares/errorsHandlers')

// file disponibili al client
app.use(express.static('public'))

// uso middlewares
app.use(notFound)
app.use(errorServer)

// server in attesa
app.listen(port,()=>{
    console.log(`Resto in ascolto sulla porta ${port}`)
})