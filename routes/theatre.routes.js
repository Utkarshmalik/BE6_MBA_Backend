const theatreController = require("../controllers/theatre.controller");

module.exports = function(app) {

    app.post("/mba/api/v1/theatres", theatreController.createTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
}