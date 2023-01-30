const Booking = require("../models/booking.model");
const User = require("../models/user.model");

exports.createBooking = async (req,res)=>{

    const user= await User.findOne({
        userId:req.userId
    })


    const bookingObj={
        theatreId:req.body.theatreId,
        movieId:req.body.movieId,
        userId:user._id,
        timing:req.body.timing,
        noOfSeats:req.body.noOfSeats,
        totalCost: req.body.noOfSeats * 250
    };

    try{
    const booking = await Booking.create(bookingObj);
    res.status(201).send(booking);
    }
    catch(err){
        res.status(500).send({message:"Internal server Error! "+ err.message})
    }
}

exports.getBookingById = async (req,res)=>{

    try{
        const bookings= await Booking.findOne({_id:req.params.id});
        res.status(200).send(bookings);
    }catch(err){
        res.status(500).send({message:"Internal Server Error"});
    }
}


exports.getAllBookings = async (req,res)=>{

    const bookings = await Booking.find({});
    res.status(200).send(bookings);
}