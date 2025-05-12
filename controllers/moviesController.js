// express 
const express = require('express')

// importazione DB
const connection = require('../data/db')

// index
function index(req, res) {
    // query di tutti i film
    const sql = `
    SELECT 
        movies.*, AVG(reviews.vote) AS reviews_vote
    FROM
        movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    GROUP BY movies.id
    `

    // esecuzione query
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database non trovato' })
        }
        res.json(results.map(result=>({
            ...result,
            imgPath: 'http://127.0.0.1:3000/'+ result.image
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