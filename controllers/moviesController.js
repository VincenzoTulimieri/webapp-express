// express 
const express = require('express')

// importazione DB
const connection = require('../data/db')



// index
function index(req,res){
    res.send('ecco i film')
}

// show
function show(req,res){
    res.send('ecco il film singolo')
}

module.exports = {index,show}