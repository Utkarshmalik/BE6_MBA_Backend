
const ObjectId = require("mongoose").Types.ObjectId;
const Booking= require("../models/booking.model");


validatePaymentRequestBody = async (req,res,next) =>{

    //validate the bookingId is passed it should be correct 

    if(!req.body.bookingId){
        return res.status(400).send({message:"Failed! bookingId not provided"});
    }

    if(!ObjectId.isValid(req.body.bookingId)){
        return res.status(400).send({message:"Failed! bookingId not in valid format"});
    }

    const booking = await Booking.findOne({_id:req.body.bookingId});


    if(!booking){
        return res.status(400).send({message:"Failed! bookingId does not exists"});
    }

    next();

}



module.exports={
    validatePaymentRequestBody
}