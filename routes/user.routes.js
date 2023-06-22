
const userController = require("../controllers/user.controller");
const {verifyToken, isAdmin}=require("../middlewares/authJWT");

module.exports = function(app){
    app.put("/mba/api/v1/users",[verifyToken],userController.update);
    app.get("/mba/api/v1/users",[verifyToken],userController.getAllUsers);
    app.put("/mba/api/v1/users/:userId",[verifyToken, isAdmin],userController.updateUser);
}