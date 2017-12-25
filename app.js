const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const Utility = require('./components/utility/service');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(Utility.parseQuery);

app.set('view engine', 'ejs');

const api_v1 = require('./controllers/api');
api_v1.initialize(app);



app.get('/', (req,res) => {
  res.render('index');
});
app.listen(3009);
