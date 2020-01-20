var express = require('express')
var bodyParser = require('body-parser')

var tasks = require('./routes/tasks')
var cors = require('cors')
var Users = require('./routes/Users')

var port = process.env.PORT || 5000

var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/todos', tasks)
app.use('/users', Users)

app.listen(port, function() {
  console.log('Server started on port ' + port)
})
