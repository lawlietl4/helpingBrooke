const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.get('/',function(req,res){
    res.sendFile('index.html',{root: path.join(__dirname,'..\\views')});
});

app.listen(8080);
console.log("something at localhost:8080");
// console.log(fs.readFile('StatsRunnerExampleResult.json', 'utf8', (err,data)=>{
//     if (err) console.log(err);
//     console.log(data);
// }));

function readFile(filePath){
    let output='';
    let rawData = fs.readFileSync(filePath);
    output += JSON.parse(rawData);
    console.log(output['People']);
}
readFile('./example.json');