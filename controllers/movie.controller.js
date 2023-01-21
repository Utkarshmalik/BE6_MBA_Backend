const Movie = require("../models/movie.model");


exports.createMovie = async (req,res) =>{
    const movie = await Movie.create(req.body);
    res.status(201).send(movie);
}