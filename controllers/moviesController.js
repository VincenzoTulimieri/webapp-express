// express 
const express = require('express')

// importazione DB
const connection = require('../data/db')

// index
function index(req, res) {

    const { search } = req.query

    let queryParams =[]
    // query
    let sql = `
    SELECT 
        movies.*, ROUND(AVG(reviews.vote),2) AS reviews_vote
    FROM
        movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    `
    if (search) {
        sql += ` WHERE title LIKE ? OR director LIKE ? OR abstract LIKE ? OR genre LIKE ? `
        queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }
    sql += ' GROUP BY movies.id'

    // esecuzione query
    connection.query(sql, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database non trovato' })
        }
        res.json(results.map(result => ({
            ...result,
            imgPath: process.env.PUBLIC_IMG + result.image
        })))
    })
}

// show
function show(req, res) {
    // ID dell'utente
    const { id } = req.params

    // query 
    const moviesSql = 'SELECT * FROM movies WHERE id = ?;'
    const reviewsSql = 'SELECT  * FROM reviews WHERE movie_id = ?'


    // esecuzione query
    connection.query(moviesSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage })
        };
        if (results.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' })
        }
        const movie = results[0]

        connection.query(reviewsSql, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.sqlMessage })
            };
            movie.reviews = results
            res.json(movie)
        })
    })
}

module.exports = { index, show }