

validateTheatreRequestBody = async (req,res,next)=>{

    //validate name 
    if(!req.body.name){
        return res.status(400).send({message:"Failed! Theatre name is not provided"});
    }

    //validate the theatre description
  if(!req.body.description){
        return res.status(400).send({message:"Failed! Theatre description is not provided"});
    }

   //validate the theatre city
  if(!req.body.city){
    return res.status(400).send({message:"Failed! Theatre city is not provided"});
   }

   //validate the theatre pinCode
   if(!req.body.pinCode){
        return res.status(400).send({message:"Failed! Theatre pinCode is not provided"});
    }

    next();
}

module.exports={
    validateTheatreRequestBody
};

