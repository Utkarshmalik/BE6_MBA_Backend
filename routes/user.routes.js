
const userController = require("../controllers/user.controller");
const {verifyToken}=require("../middlewares/authJWT");

module.exports = function(app){
    app.put("/mba/api/v1/users",[verifyToken],userController.update);
}