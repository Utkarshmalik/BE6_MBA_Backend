const paymentController = require("../controllers/payment.controller");
const {verifyToken, isAdmin} = require("../middlewares/authJWT");
const {validatePaymentRequestBody} = require("../middlewares/validatePaymentRequestBody");

module.exports= function(app){

    app.post("/mba/api/v1/payments",[verifyToken, validatePaymentRequestBody],paymentController.createNewPayment);
    app.get("/mba/api/v1/payments",[verifyToken],paymentController.getAllPayments);
    app.get("/mba/api/v1/payments/:id",[verifyToken],paymentController.getPaymentById);
}