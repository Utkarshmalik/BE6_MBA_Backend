
const {verifyToken, isAdmin} = require("../middlewares/authJWT");
const {validateBookingRequestBody} = require("../middlewares/validateBookingRequestBody");
const bookingController = require("../controllers/booking.controller");


module.exports = function(app) {

    app.post("/mba/api/v1/bookings",[verifyToken, validateBookingRequestBody],bookingController.createBooking);
    app.get("/mba/api/v1/bookings/:id",[verifyToken],bookingController.getBookingById);
    app.get("/mba/api/v1/bookings",[verifyToken],bookingController.getAllBookings);
    app.put("/mba/api/v1/bookings/:id",[verifyToken,isAdmin],bookingController.updateBooking);
    app.put("/mba/api/v1/bookings/:id/cancel",[verifyToken],bookingController.cancelBooking);

}