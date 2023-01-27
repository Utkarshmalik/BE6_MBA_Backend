
const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

exports.createTheatre =  async (req,res)=>{

    const theatreObject = {
        name:req.body.name,
        city:req.body.city,
        description:req.body.description,
        pinCode:req.body.pinCode
    }

    const theatre = await Theatre.create(theatreObject);

    res.status(201).send(theatre);
}

exports.getAllTheatres = async (req,res)=>{

    const queryObj={};

    if(req.query.pinCode!=undefined){
        queryObj.pinCode=req.query.pinCode;
    }
    
    if(req.query.name!=undefined){
        queryObj.name=req.query.name;
    }

    if(req.query.description!=undefined){
        queryObj.description=req.query.description;
    }

    if(req.query.city!=undefined){
        queryObj.city=req.query.city;
    }

    const theatres =  await Theatre.find(queryObj);
    res.status(200).send(theatres);
}


exports.getTheatre = async (req, res)=> {
    
    const id = req.params.id;

    const theatre = await Theatre.findOne({
        _id:id
    })

    res.status(200).send(theatre);
}

exports.deleteTheatre = async (req,res)=>{

    await Theatre.deleteOne({
        _id:req.params.id
    });
    
    res.status(200).send({message:`Successfully deleted theatre with id:${req.params.id}`});
}

exports.updateTheatre = async (req,res) =>{

    const id=req.params.id;

    const savedTheatre = await Theatre.findOne({_id:req.params.id});

    if(!savedTheatre){
        return res.status(400).send({message:"Theatre doesn't exists"});
    }

    //update the theatre details 

    savedTheatre.name = req.body.name ? req.body.name : savedTheatre.name;
    savedTheatre.description = req.body.description ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode ? req.body.pinCode : savedTheatre.pinCode;

    const updatedTheatre = await savedTheatre.save();

    res.status(200).send(updatedTheatre);

}

exports.addMoviesToTheatre = async (req,res) => {

    const theatreId= req.params.theatreId;
    const savedTheatre = await Theatre.findOne({_id:theatreId});

    if(!savedTheatre){
        return res.status(400).send({message:"Theatre doesn't exists"});
    }

    const movieIds = req.body.movies;

    if(req.body.insert){
    movieIds.forEach(movieId => {
        savedTheatre.movies.push(movieId);
    })}
    else if(req.body.delete){
        savedMovieIds = savedTheatre.movies.filter((movieId)=>{
             return !movieIds.includes(movieId.toString());
        })
    savedTheatre.movies=savedMovieIds;
    }
    const updatedTheatre = await savedTheatre.save();
    return res.status(200).send(updatedTheatre);  
}

exports.checkIfMovieRunningInTheatre = async (req, res)=> {

    const {theatreId, movieId} = req.params;

    const savedTheatre = await Theatre.findOne({_id:theatreId});

    const savedMovie = await Movie.findOne({_id:movieId});

    if(!savedTheatre){
        res.status(400).send({message:"Invalid Theatre Id"});
    }

    if(!savedMovie){
        res.status(400).send({message:"Invalid Movie Id"});
    }

    const response = {
        message: savedTheatre.movies.includes(savedMovie._id)?"Movie is present":"Movie is not present"
    }

    res.status(200).send(response);

}