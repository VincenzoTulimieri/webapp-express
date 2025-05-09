// express 
const express = require('express')






// index
function index(req,res){
    res.send('ecco i film')
}

// show
function show(req,res){
    res.send('ecco il film singolo')
}

module.exports = {index,show}