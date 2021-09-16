var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tododbRouter = require('./routes/tododb');
var app = express();
const mysql = require('mysql2');

app.locals.con = mysql.createConnection({
    host:'localhost',
    port: '3307',
    user: 'todo',
    password: 'todo',
    database: 'todo'
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tododb', tododbRouter);

module.exports = app;
