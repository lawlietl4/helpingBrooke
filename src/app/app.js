const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
let dataJSON;
var information = [];

app.set('view engine','ejs');
app.use(express.static('..\\views\\'));
app.get('/',function(req,res){
    res.sendFile('index.html',{root: path.join(__dirname,'../views')});
});
app.get('/script.js', function(req,res){
    res.sendFile('script.js', {root: path.join(__dirname, '../views')});
});
app.get('/secondpage.html', function(req,res){
    //res.sendFile('secondpage.html', {root: path.join(__dirname,'../views')});
    res.send(`<div>
    <a href='/index.html'>home</a>
</div>
<br>
<input type="file" id='fileInput2' onChange='readText(this)' />
<div>
    <p id='out1'></p>
    <p id='info2'>Number of APIs: ${information[0]}</p>
</div>
<script src='./script.js'></script>`);
});
app.get('/index.html',function(req,res){
    res.redirect('/');
});
app.get('/style.css',function(req,res){
    res.sendFile('style.css', {root: path.join(__dirname, '../views')});
})
app.listen(81);
console.log("something at localhost:81");
console.log(fs.readFile('StatsRunnerExampleResult.json', 'utf8', (err,data)=>{
    if (err) console.log(err);
    dataJSON=JSON.parse(data);
    var apiNum = dataJSON['Number Of APIs'];
    information.push(apiNum)
    console.log(information);
}));