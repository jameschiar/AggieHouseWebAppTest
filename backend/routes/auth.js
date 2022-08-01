// set up routes for application

const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://aggiehousewebapp.darrenanimo.repl.co/dashboard";

router.get("/login/success", (req, res) => {
  if (req.user) {
    // 200 is success
    res.status(200).json({
      success: true,
      message: "success",
      user: req.user,
      cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  // 401 is failure
  res.status(401).json({
    success: false,
    message: "failure"
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://aggiehousewebapp.darrenanimo.repl.co/")
})

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed"
}));

module.exports = router;