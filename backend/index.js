var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(5000, function(){
    console.log("Listening");
})

app.get('/getflow', (req, res) => {
    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'null',
        database : 'flows'
    })
    console.log(req.query);
    connection.connect(() => {
        console.log("connection made to mysql");
    })
  
    connection.query(`SELECT * from Diabeteslogs where date = '${req.query.date}'`, (error, results, fields) => {
        if(error) throw error;
        var normalResults = results.map((results, index) => {
            return Object.assign({}, results);
        });
        console.log(normalResults);
        res.send(normalResults);
    })
    
    connection.end();
})

app.get('/firstquestion', (req, res) => {
    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'flows'
    })

    connection.connect(() => {
        console.log("connection made to mysql");
    })
  
    connection.query('select questions.questionid, questions.question, options.option_name from questions join options on questions.questionid = options.optid where questionid = 1;', (error, results, fields) => {
        if(error) throw error;
        var normalResults = results.map((results, index) => {
            return Object.assign({}, results);
        });
        console.log(normalResults);
        res.send(normalResults);
    })
    
    connection.end();
})

app.post('/nextquestion', (req, res) => {
    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'flows'
    })

    connection.connect(() => {
        console.log("connection made to mysql");
    })
    console.log(req.body);
    connection.query(`select questions.questionid, questions.question, options.option_name from questions join options on questions.questionid = options.optid where questionid in (select questionto from nextquestion where questionfrom = ${req.body.currentQuestion} and questionvalue = "${req.body.value}");`, (error, results, fields) => {
        if(error) throw error;
        var normalResults = results.map((results, index) => {
            return Object.assign({}, results);
        });
        console.log(normalResults);
        res.send(normalResults);
        connection.end();
    })
    
})


app.post('/createflow', (req, res) => {
        const connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'testhierarchy'
        })

        connection.connect(() => {
            console.log("connection made to mysql");
        })
        req.body.forEach(question => {
            connection.query(`call create_new_question(${question.questionid}, '${question.questionname}', '${question.optionone}', '${question.optiontwo}', '${question.optionthree}', '${question.parentquestion}', '${question.parentoption}')`, (error, results, fields) => {
                if(error) throw error;
                console.log(question);
            })
        })
        connection.end();
    res.send("done");
})
    




