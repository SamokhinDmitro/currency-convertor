/*Серверная часть для конвертора валют от Приват Банка*/

const express = require('express');
const bodyParser = require('body-parser');
let request = require('request');
const cors = require('cors');
const ejs = require('ejs');
const Converter = require('./convertor');
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs'); //подключили шаблонизатор

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// parse application/json
app.use(bodyParser.json());


app.get('/', function(req,res){
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {
       console.log('error:', error); // Print the error if one occurred
        res.render('index', {data: JSON.parse(body)});
    });
});

app.post('/kurs', function(req,res){
    if (!req.body) return res.sendStatus(400);

    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {

        //Convertor logic

        let myCcyToFrom = (req.body.valuta.to).toUpperCase();
        let myCcyFromTo = (req.body.valuta.from).toUpperCase();
        let valueField = Number(req.body.currency);
        console.log(req.body);

        let buy = 0;
        let sale = 0;
        let flag;


        let resultTo = 0;
        let resultFrom = 0;

        let data = JSON.parse(body);

        for(let i = 0; i < data.length; i++){
            //from UAH to USD or other money
                if(data[i].ccy == myCcyToFrom) {
                    flag = true;
                    buy = data[i].buy;
                    sale = data[i].sale;

                    let convert = new Converter(buy, sale);
                    resultTo = convert.toFrom(valueField );


                //  From Money to UAH
                } else if(data[i].ccy == myCcyFromTo){
                    flag = false;
                    buy = data[i].buy;
                    sale = data[i].sale;

                    //Convertor Module
                    let convert = new Converter(buy, sale);
                    resultFrom = convert.fromTo(valueField);
                }
        }

    res.send({from: resultFrom, to: resultTo, flag: flag});
    });
});


//Test information
app.get('/user/:id/:name', function(req,res){
    console.log(req.params);
    console.log(req.query);
    res.send('About user' + ' ');
});

//Error 404
app.use(function(req, res, next) {
    res.status(404).send('404');
});


app.listen(PORT, function(){
   console.log(`Listening port: ${PORT}`);
});
