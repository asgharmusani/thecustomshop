var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.render("front/index", {
        titlePage: "Ambassador - The Custom Shop | Home",
    });
});

//signup + login route
router.get("/signup", function(req, res, next) {
    if (req.isAuthenticated()) {
        //if user has signed in (using login or signup)
        //the user will be taken back to the main page
        //this route will be inaccessible for people who have logged in
        res.redirect("/");
    } else {
        res.render("front/signup", {
            titlePage: "Ambassador - The Custom Shop | Sign Up",
        });
    }
});

router.get("/my-account", function(req, res, next) {
    res.render("front/my-account", {
        titlePage: "Ambassador - The Custom Shop | My Account",
    });
});

router.get("/my-account/measurements", function(req, res, next) {
    res.render("front/measurements", {
        titlePage: "Ambassador - The Custom Shop | My Account | Measurements",
    });
});

router.get("/my-account/order-history", function(req, res, next) {
    res.render("front/order-history", {
        titlePage: "Ambassador - The Custom Shop | My Account | Order History",
    });
});

router.get("/my-account/change-password", function(req, res, next) {
    res.render("front/change-password", {
        titlePage: "Ambassador - The Custom Shop | My Account | Change Password",
    });
});

router.get("/contact-us", function(req, res, next) {
    res.render("front/contact", {
        titlePage: "Ambassador - The Custom Shop | Contact Us",
    });
});

router.get("/about-us", function(req, res, next) {
    res.render("front/about", {
        titlePage: "Ambassador - The Custom Shop | About Us",
    });
});

router.get("/test", function(req, res, next) {
    res.render("test", {
        titlePage: "Ambassador - The Custom Shop | Test",
        layout: false,
    });
});

module.exports = router;
