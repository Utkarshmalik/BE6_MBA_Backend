
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");

const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const constants = require("./utils/constants");

var cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());


 mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("connected to Mongo DB")
init();
},err=>{
    console.log("Error: ",err.message)
})

 
 


require("./routes/movie.routes")(app);
require("./routes/theatre.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/booking.routes")(app);
require("./routes/payment.routes")(app);


app.get("/",(req,res)=>{
    res.send("Inside Movie Booking Application");
})


app.listen(8000,()=>{
    console.log(`Application running on port 8000`);
})


async function init(){
    try{
        const user = await User.create({
            name:"admin",
            userId:"admin",
            email:"admin@gmail.com",
            password:bcrypt.hashSync("admin",10),
            userStatus:constants.userStatus.approved,
            userTypes:constants.userTypes.admin
        });

        console.log("Admin user created successfully");
    }catch(e){
        console.log(e.message);
    }
}