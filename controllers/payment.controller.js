const Booking = require("../models/booking.model");
const constants = require("../utils/constants");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");

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
        paymentStatus:constants.paymentStatus.success
     }


     var paymentObject = {
        bookingId:req.body.bookingId,
        amount:savedBooking.totalCost,
        status:razorpayAPIReponse.paymentStatus 
     }

     try{

        const payment = await Payment.create(paymentObject);

        //send an email to the customer
        
        savedBooking.status= (paymentObject.status === constants.paymentStatus.success) ? 
        constants.bookingStatus.completed : constants.bookingStatus.failed
        
        await savedBooking.save();

        return res.status(201).send(payment);
     }
     catch(err){
        res.status(500).send({message:"Internal Server error!"});
     }
}


exports.getAllPayments = async (req,res)=>{

    const savedUser = await User.findOne({userId:req.userId});

    const queryObject={};

    if(savedUser.userTypes===constants.userTypes.admin){

    }else{

        const bookings =  await Booking.find({userId:savedUser._id});

        const bookingsIds = bookings.map(booking=>booking._id);

        queryObject.bookingId = { $in:bookingsIds };

    }

    const payments = await Payment.find(queryObject);

    return res.status(200).send(payments);
}

exports.getPaymentById = async (req,res)=>{

    const paymentId = req.params.id;

    const savedUser = await User.findOne({userId:req.userId});
    const savedPayment = await Payment.findOne({_id:paymentId});

    if(!savedPayment){
        return res.status(400).send({message:"Invalid Payment Id"});
    }

    if(savedUser.userTypes===constants.userTypes.admin){
    }else{

        const bookingId = savedPayment.bookingId;
        const savedBooking = await Booking.findOne({_id:bookingId});
        const userId = savedBooking.userId;

        if(!userId.equals(savedUser._id)){
            return res.status(403).send({message:"Forbidden, paymentId is not associated with the loggedin user"});
        }
    }
    return res.status(200).send(savedPayment);
}