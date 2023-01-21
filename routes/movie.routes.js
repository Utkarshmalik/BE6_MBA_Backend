const movieController = require("../controllers/movie.controller");

module.exports = function (app){
    app.post("/mba/api/v1/movies",movieController.createMovie)
}