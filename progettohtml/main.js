var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/index2", function(req,res){
  res.sendFile(path.join(__dirname + '/index2.html'));
  console.log("Ricevuto una richiesta POST  da prova");
 
});


app.post("/", function(req,res){
    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    console.log(req.body);
    // username
    console.log(req.body.username);
    // password
    console.log(req.body.pass);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: req.body.username, address: req.body.pass };
               
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          console.log(myobj);
          console.log(err, res);
          db.close();
        });
            
      });
      


});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});