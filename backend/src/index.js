const express = require('express')
const app = express()
const routes = require('./routes/index')
const port = 3000

app.use('/api', routes)
app.use(express.static())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App on http://localhost:${port}`)
})

