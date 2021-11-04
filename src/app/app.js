const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
let dataJSON;

app.set('view engine','ejs');
app.use(express.static('..\\views\\'));
app.get('/',function(req,res){
    res.sendFile('index.html',{root: path.join(__dirname,'../views')});
});
app.get('/script.js', function(req,res){
    res.sendFile('script.js', {root: path.join(__dirname, '../views')});
});
app.get('/secondpage.html', function(req,res){
    res.render('views/secondpage')
    res.sendFile('secondpage.html', {root: path.join(__dirname,'../views')});
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
    console.log(dataJSON['Number Of APIs']);
}));