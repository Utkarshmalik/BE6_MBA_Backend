
const authControllers = require("../controllers/auth.controllers");
const {validateUserRequestBody} = require("../middlewares/validateUserRequestBody");

module.exports = function(app){
    app.post("/mba/api/v1/auth/signup", [validateUserRequestBody], authControllers.signup);
    app.post("/mba/api/v1/auth/signin", authControllers.signin);

}