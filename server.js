const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/dist/integrador'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/integrador/index.html'));
});

app.listen(process.env.PORT || 8080);