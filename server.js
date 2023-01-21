
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");


const app = express();

app.use(bodyParser.json());


mongoose.connect(dbConfig.DB_URL, ()=>{
console.log("connected to Mongo DB")
},err=>{
    console.log("Error: ",err.message)
})


require("./routes/movie.routes")(app);

app.get("/",(req,res)=>{
    res.send("Inside Movie Booking Application");
})


app.listen(serverConfig.PORT,()=>{
    console.log(`Application running on port ${serverConfig.PORT}`);
})