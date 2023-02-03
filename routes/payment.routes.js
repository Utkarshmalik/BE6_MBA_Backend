const paymentController = require("../controllers/payment.controller");
const {verifyToken} = require("../middlewares/authJWT");
const {validatePaymentRequestBody} = require("../middlewares/validatePaymentRequestBody");

module.exports= function(app){

    app.post("/mba/api/v1/payments",[verifyToken, validatePaymentRequestBody],paymentController.createNewPayment);

}