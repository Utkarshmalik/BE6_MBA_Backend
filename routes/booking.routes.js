
const {verifyToken} = require("../middlewares/authJWT");
const {validateBookingRequestBody} = require("../middlewares/validateBookingRequestBody");


module.exports = function(app) {

    app.post("/mba/api/v1/bookings",[verifyToken, validateBookingRequestBody],(req,res)=>{
        res.send("hello");
    });
}