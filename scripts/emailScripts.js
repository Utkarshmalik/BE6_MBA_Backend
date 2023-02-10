
const userRegistration = (user) => {
    return{
    subject : "Welcome to Book My Show",
    html : `
    <div>
    <h5> Hello ${user.name}, </h5>
    <br/>
    You have registered successfully with email <b> ${user.email} </b>   
    <br/>
    Your userId required at the time of login will be  <b> ${user.userId} </b>
    <br/>
    <hr/>
   Thanks & Regards 
   <h3> Book My Show </h3>  <br/>
    <img src="https://logodix.com/logo/2011124.jpg"/>
    </div>
    `
    }
}

const userLoggedIn = (user) =>{

}

const paymentSucces =(user)=>{

}

const newMovieAdded = (user,movie,theatre)=>{

}

const theatreDeleted = (user,theatre)=>{

}

module.exports = {
    userRegistration,
    userLoggedIn,
    paymentSucces,
    newMovieAdded,
    theatreDeleted
}