const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("server running...")
})

module.exports = app;