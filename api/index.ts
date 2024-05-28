const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

app.get("/", (req, res) => res.render('pages/index'))
app.get("/home", (req, res) => res.render('pages/feed', {'content': 'HOME'}))

app.listen(port, () => console.log("Server ready on port 3000."))

module.exports = app