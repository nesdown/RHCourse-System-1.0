const express = require('express'),
      serveStatic = require('serve-static'),
      history = require('connect-history-api-fallback'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');    
const path = require('path');

const adminRouter = require('./routers/admin');
const authRouter = require('./routers/auth');

const app = express();

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})

app.use(history());
app.use(bodyParser.json());


app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.use(serveStatic(path.join(__dirname, '../', 'dist')));

mongoose
    .connect('mongodb://samsung_support:123456a@ds127535.mlab.com:27535/samsung_support', {useNewUrlParser: true})
    .then(() => app.listen(5000))
    .catch(err => console.log(err));



