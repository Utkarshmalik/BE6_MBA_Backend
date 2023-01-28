const theatreController = require("../controllers/theatre.controller");
const {verifyToken, isAdmin} = require("../middlewares/authJWT");

module.exports = function(app) {
    app.post("/mba/api/v1/theatres", [verifyToken,isAdmin],theatreController.createTheatre);
    app.get("/mba/api/v1/theatres",[verifyToken],theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id",[verifyToken],theatreController.getTheatre);
    app.put("/mba/api/v1/theatres/:id",[verifyToken,isAdmin],theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id",[verifyToken,isAdmin],theatreController.deleteTheatre);
    app.put("/mba/api/v1/theatres/:theatreId/movies",[verifyToken,isAdmin],theatreController.addMoviesToTheatre);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",[verifyToken],theatreController.checkIfMovieRunningInTheatre);
}