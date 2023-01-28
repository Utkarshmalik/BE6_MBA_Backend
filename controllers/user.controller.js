const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.update= async (req,res)=>{

    const userId= req.userId;

    if(!req.body.password){
        return res.status(400).send("Password not passed!");
    }

    try{
        const user= await User.findOneAndUpdate({
            userId:userId
        },{
            password:bcrypt.hashSync(req.body.password,10)
        });

        res.status(200).send({message:"Password update successful"});
    }
    catch(err){
        res.status(500).send({message:"Some internal error occured"});
    }
}

exports.updateUser = async (req,res)=>{

    const userId = req.params.userId;
    
    try{
        const user = await User.findOneAndUpdate({
            userId:userId
        },{
            userStatus:req.body.userStatus
        });

        if(!user){
            return res.status(400).send({message:"Invalid User Id"});
        }

        res.status(200).send({message:"User record has been updated successfully"});
    }
    catch(err){
        res.status(500).send({message:"Some internal error occured"});
    }

}