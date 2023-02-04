const Booking = require("../models/booking.model");
const constants = require("../utils/constants");
const Payment = require("../models/payment.model");

exports.createNewPayment= async (req,res)=>{

    //bookingId in the request 

    const savedBooking = await Booking.findOne({_id:req.body.bookingId});

    const bookingTime = savedBooking.createdAt;
    const paymentTime = Date.now();

     const minutes = Math.floor(((paymentTime-bookingTime)/1000)/60);


     if(minutes >2){
        savedBooking.status=constants.bookingStatus.expired;
        await savedBooking.save();
        return res.status(401).send({message:"Cant do payment as booking is delayed and expired"});
     }

     

     //make a call to razorpay payment API 
     //return reponse 
     //response will have status of payment 

     const razorpayAPIReponse={
        paymentStatus:constants.paymentStatus.failed
     }


     var paymentObject = {
        bookingId:req.body.bookingId,
        amount:savedBooking.totalCost,
        status:razorpayAPIReponse.paymentStatus 
     }

     try{

        const payment = await Payment.create(paymentObject);
        
        savedBooking.status= (paymentObject.status === constants.paymentStatus.success) ? 
        constants.bookingStatus.completed : constants.bookingStatus.failed
        
        await savedBooking.save();

        return res.status(201).send(payment);
     }
     catch(err){
        res.status(500).send({message:"Internal Server error!"});
     }


}