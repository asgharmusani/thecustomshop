var express = require("express"),
    passport = require("passport"),
    router = express.Router();

router.post(
    "/signup/register",
    passport.authenticate("local-signup", {
        failureRedirect: "/errorAuth",
        failureFlash: true,
        successFlash: "success",
    }),
    //on success authentication this callback is called
    function(req, res) {
        req.session.cookie.maxAge = false; // Cookie expires at end of session
        res.json({
            message: req.flash("success"),
        });
    },
);

router.post(
    "/login",
    passport.authenticate("local-signin", {
        failureRedirect: "/errorAuth",
        failureFlash: true,
        successFlash: "success",
    }),
    //on success authentication this callback is called
    function(req, res) {
        console.log("Login success: Remember me set to ", req.body.remember);
        if (req.body.remember) {
            req.session.cookie.originalMaxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            console.log("Login success: MaxAge set to ", req.session.cookie.maxAge);
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.json({
            message: req.flash("success"),
        });
    },
);

router.get("/errorAuth", function(req, res, next) {
    res.json({
        error: req.flash("error"),
        message: req.flash("message"),
    });
});

router.get("/logout", function(req, res, next) {
    req.session.destroy(function(err) {
        res.redirect("/"); //Inside a callback… bulletproof!
    });
});

module.exports = router;
