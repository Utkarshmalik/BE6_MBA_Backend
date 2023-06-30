
const bcrypt = require("bcrypt");
const e = require("express");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const notificationClient = require("../utils/NotificationClient");
const {userRegistration} = require("../scripts/emailScripts");

exports.signup = async (req,res)=>{

    var userStatus;

    if(!req.body.userType || req.body.userType==constants.userTypes.customer){
        userStatus=constants.userStatus.approved;
    }else{
        userStatus=constants.userStatus.pending;
    }

    const userObject={
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8),
        userStatus:userStatus,
        userTypes:req.body.userType
    }

    try{
    const user = await User.create(userObject);
    const {subject, html, text} = userRegistration(user);
    notificationClient.sendEmail([user.email], subject, html, text);
    res.status(201).send(user);
    }
    catch(err){
        res.status(500).send({message:"Internal Server Error:"+ err.message});
    }
}


exports.signin = async (req,res)=>{

    const {userId,password} = req.body;

    //verify whether the userId is correct or not 

    const user = await User.findOne({userId});

    if(!user){
        res.status(400).send({mesage:"UserId doesn't exists"});
        return;
    }


    if(user.userStatus!==constants.userStatus.approved){
        res.status(403).send({message:"Only Approved users are allowed to login"});
        return;
    }

    var isCorrectPassword= bcrypt.compareSync(req.body.password, user.password);

    if(!isCorrectPassword){
        res.status(401).send({message:"Invalid Password"});
    }

    const token = jwt.sign({id:user.userId},config.secret,{
        expiresIn:120000
    });

    res.status(200)
    .send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userTypes:user.userTypes,
        userStatus:user.userStatus,
        accessToken:token,
        _id:user._id
    })

}