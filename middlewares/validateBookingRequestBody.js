const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

validateBookingRequestBody = async (req,res,next) =>{

    if(!req.body.theatreId){
        return res.status(400).send({message:"Failed! Theatre id is not provided !"});
    }

    const savedTheatre= await Theatre.findOne({_id:req.body.theatreId});

    if(!savedTheatre){
        return res.status(400).send({message:"Failed! Theatre id is invalid !"});
    }

    if(!req.body.movieId){
        return res.status(400).send({message:"Failed! Movie id is not provided !"});
    }

    const savedMovie= await Movie.findOne({_id:req.body.movieId});

    if(!savedMovie){
        return res.status(400).send({message:"Failed! movie id is invalid !"});
    }

    if(!savedTheatre.movies.includes(req.body.movieId)){
        return res.status(400).send({message:"Failed! movie id is not available in the given theatre!"});
    }


    if(!req.body.timing){
        return res.status(400).send({message:"Failed! Timings is not provided !"});
    }


    if(!req.body.noOfSeats){
        return res.status(400).send({message:"Failed! Seats not provided !"});
    }

    next();
}

module.exports={
    validateBookingRequestBody
}