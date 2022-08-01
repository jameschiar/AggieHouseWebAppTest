const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
// import passport.js file
const passportSetup = require("./passport");
const passport = require("passport");
// import auth
const authRoute = require("./routes/auth");
const app = express(); 


app.use(cookieSession(
  {
    name:"session",
    keys:["llama exuberance"],
    maxAge: 6 * 60 * 60 * 1000
  }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials: true
}));

app.use("/auth", authRoute);

app.listen("5000", ()=> {
  console.log("server is running");
});