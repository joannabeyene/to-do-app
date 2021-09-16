const { response } = require('express');
var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');
router.use(cors()); 
//CREATE
router.get('/', function(req, res, next) {    
    req.app.locals.con.connect(function(err) {
        if (err) {
        console.log('failed to connect');
        }
        console.log('connected');
        res.send('connected');
    })
});
router.post('/getLists/add', function(req, res, next) {    
    let listsData = req.body
    req.app.locals.con.query('INSERT INTO lists SET ?', listsData, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('success!');
    })
});
router.post('/getTasks/add', function(req, res, next) {    
    let tasksData = req.body
    req.app.locals.con.query('INSERT INTO tasks SET ?', tasksData, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('success!');
    })
});
//READ
router.get('/getUsers', function(req, res, next) {
    req.app.locals.con.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    })

});
router.get('/getLists', function(req, res, next) {    
    req.app.locals.con.query('SELECT * FROM lists', (err, result) => {
        if(err) {
            console.log(err);
        } 
        res.json(result);
    })
});
router.get('/getTasks', function(req, res, next) {    
    req.app.locals.con.query('SELECT * FROM tasks', (err, result) => {
        if(err) {
            console.log(err);
        } 
        res.json(result);
    })
});

//UPDATE
router.post('/getTasks/update', function(req, res, next) { 
    let newStatus=req.body.status
    let id=req.body.task_id
    req.app.locals.con.query(`UPDATE tasks SET status='${newStatus}' WHERE task_id = '${id}'`, (err, result) => {
        res.json(result)
    })
});
module.exports = router;