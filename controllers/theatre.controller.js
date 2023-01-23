
const Theatre = require("../models/theatre.model");

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
