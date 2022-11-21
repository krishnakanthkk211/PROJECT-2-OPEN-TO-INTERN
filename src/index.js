const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/intern-project-2?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false
})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/functionup', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

