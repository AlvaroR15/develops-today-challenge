const express = require('express')
const app = express();
const cors = require('cors')
const countriesRouter = require('./routes/countriesRoutes')


require('dotenv').config()

const PORT = process.env.PORT

app.use(cors())


app.get('/', (req,res) => {
    return res.send('Hello')
})

app.use('/countries',countriesRouter)

app.listen(PORT, () => console.log('Server running in port: '+PORT))