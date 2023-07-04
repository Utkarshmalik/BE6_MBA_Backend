const movieController = require("../controllers/movie.controller");
const movieRequestValidator = require("../middlewares/validateMovieRequest");
const {verifyToken, isAdmin} = require("../middlewares/authJWT");

module.exports = function (app){
    app.post("/mba/api/v1/movies", [verifyToken,isAdmin, movieRequestValidator.validateMovieRequest], movieController.createMovie)
    app.get("/mba/api/v1/movies",movieController.getAllMovies)
    app.get("/mba/api/v1/movies/:id",movieController.getMovie)
    app.put("/mba/api/v1/movies/:id",[verifyToken,isAdmin],movieController.updateMovie)
    app.delete("/mba/api/v1/movies/:id",[verifyToken,isAdmin],movieController.deleteMovie)
    app.get("/mba/api/v1/movies/:movieId/theatres",movieController.getTheatresForAMovie);
}