// const ejs = require('ejs');
const express = require("express");
const app = express();
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError')


// register view engine
app.set('view engine', 'ejs');

// set static files
app.use(express.static("public"))

// middleware to parse JSON request
app.use(express.json());
// middleware to decode data send from html form
app.use(express.urlencoded({ extended: true }));

// allow cross orgin 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/users', userRouter);

// 404 page
app.all('*', (req, res, next) => {
  // res.status(404).render('404.ejs');
  next(new AppError(`Page '${req.originalUrl}' not found `, 404))
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'erorr';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack
  })
})

module.exports = app;