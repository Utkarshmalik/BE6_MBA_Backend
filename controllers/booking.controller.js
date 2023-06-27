const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

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

    const bookings = await Booking.find({}).populate("movieId").populate("theatreId").populate("userId");

    

    res.status(200).send(bookings);
}

exports.updateBooking = async (req,res)=>{


    const savedBooking = await Booking.findOne({
        _id:req.params.id
    });

    if(!savedBooking){
        return res.status(400).send("Invalid Booking Id");
    }

    savedBooking.theatreId = req.body.theatreId ? req.body.theatreId : savedBooking.theatreId;
    savedBooking.movieId = req.body.movieId ? req.body.movieId : savedBooking.movieId;
    savedBooking.userId = req.body.userId ? req.body.userId : savedBooking.userId;
    savedBooking.timing = req.body.timing ? req.body.timing : savedBooking.timing;
    savedBooking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : savedBooking.noOfSeats;
    savedBooking.totalCost = savedBooking.noOfSeats * constants.ticketPrice;
    savedBooking.status = req.body.status ? req.body.status : savedBooking.status;

    try{
        const updatedBooking = await savedBooking.save();
        res.status(201).send(updatedBooking);
    }
    catch(err){{
        res.status(500).send({message:"Internal Error while updating the booking "+e.message});
    }}

}

exports.cancelBooking = async (req,res)=>{

    const savedBooking = await Booking.findOne({
        _id:req.params.id
    });

    const savedUser = await User.findOne({
        userId:req.userId
    });


    if(!savedBooking){
        return res.status(400).send("Invalid Booking Id");
    }


    if(!savedBooking.userId.equals(savedUser._id)){
        return res.status(403).send("User has insufficient permissions to cancel this booking");
    }

    savedBooking.status=constants.bookingStatus.cancelled;
    

    try{
        const updatedBooking = await savedBooking.save();
        res.status(201).send(updatedBooking);
    }
    catch(err){{
        res.status(500).send({message:"Internal Error while updating the booking "+e.message});
    }}
}