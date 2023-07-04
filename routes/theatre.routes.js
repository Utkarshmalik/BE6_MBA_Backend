const theatreController = require("../controllers/theatre.controller");
const {verifyToken, isAdmin} = require("../middlewares/authJWT");
const {validateTheatreRequestBody} = require("../middlewares/validateTheatreReqBody");

module.exports = function(app) {
    app.post("/mba/api/v1/theatres", [verifyToken,isAdmin,validateTheatreRequestBody],theatreController.createTheatre);
    app.get("/mba/api/v1/theatres",theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id",theatreController.getTheatre);
    app.put("/mba/api/v1/theatres/:id",[verifyToken,isAdmin],theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id",[verifyToken,isAdmin],theatreController.deleteTheatre);
    app.put("/mba/api/v1/theatres/:theatreId/movies",[verifyToken,isAdmin],theatreController.addMoviesToTheatre);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",theatreController.checkIfMovieRunningInTheatre);
}