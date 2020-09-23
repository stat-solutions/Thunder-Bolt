var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport');
var app = express();

var auth=require('./controllers/auth');
var businessRRQuery=require('./controllers/businessRequestsAndResponses');




app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', auth);
app.use('/api/businessRRQueries', businessRRQuery);


app.use(function (req, res, next) {

    const error = new Error('Network Error!!! Please contact Augustine on 0781331616');
    error.status=404;
    // console.log(error);
    next(error);

});

app.use(function (error, req, res, next) {

    res.status(error.status || 500);
    console.log(error);
    res.json({
        error: {
            error: error.message
        }
    });

});

module.exports = app;
