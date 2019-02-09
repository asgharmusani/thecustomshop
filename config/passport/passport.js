//load bcrypt
var bCrypt = require("bcrypt-nodejs");
module.exports = function(passport, user, admin) {
    var User = user;

    var LocalStrategy = require("passport-local").Strategy;

    //serialize
    passport.serializeUser(function(user, done) {
        //attaches to req.user
        done(null, user.id);
    });

    // deserialize user
    // done function is a call back to return request to the user
    // done is verify call back sends back message object in the form of "success" or "error"
    passport.deserializeUser(function(req, id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                console.log(req.path);
                //gets the user Id from the DB
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                //use login tag "ID" from html
                usernameField: "regEmail",
                //use password tag "ID" from html
                passwordField: "regPassword",
                //used to send the request to the callback below and also to the success callba
                //following the successDirect
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                //used to generate hashing for password
                var generateHash = function(password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                // call User model
                User.findOne({
                    where: {
                        email: username,
                    },
                }).then(function(user) {
                    if (user) {
                        return done(null, false, {
                            message: "That username is already taken",
                        });
                    } else {
                        var userPassword = generateHash(password);

                        var data = {
                            email: username,

                            password: userPassword,

                            fullname: req.body.regName,

                            phonenumber: req.body.regPhone,

                            status: "active",
                        };

                        User.create(data).then(function(newUser, created) {
                            if (!newUser) {
                                return done(null, false);
                            }

                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                });
            },
        ),
    );

    //LOCAL SIGNIN
    passport.use(
        "local-signin",
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with username

                usernameField: "loginEmail",

                passwordField: "loginPassword",

                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },

            function(req, username, password, done) {
                var User = user;
                var isValidPassword = function(userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                };

                User.findOne({
                    where: {
                        email: username,
                    },
                })
                    .then(function(user) {
                        if (!user) {
                            console.log(username + " not found");
                            return done(null, false, {
                                message: "Username does not exist",
                            });
                        }

                        if (!isValidPassword(user.password, password)) {
                            console.log(username + " password error");
                            return done(null, false, {
                                message: "Incorrect password.",
                            });
                        }

                        var userinfo = user.get();
                        return done(null, userinfo);
                    })
                    .catch(function(err) {
                        console.log("Something went wrong with your Signin");
                        console.log("Error:", err);

                        return done(null, false, {
                            message: "Something went wrong with your Signin",
                        });
                    });
            },
        ),
    );

    var Admin = admin;

    //serialize
    passport.serializeUser(function(admin, done) {
        //attaches to req.admin
        done(null, admin.id);
    });

    // deserialize admin
    // done function is a call back to return request to the admin
    // done is verify call back sends back message object in the form of "success" or "error"
    passport.deserializeUser(function(id, done) {
        Admin.findById(id).then(function(admin) {
            if (admin) {
                //gets the admin Id from the DB
                done(null, admin.get());
            } else {
                done(admin.errors, null);
            }
        });
    });

    passport.use(
        "admin-signup",
        new LocalStrategy(
            {
                //use login tag "ID" from html
                usernameField: "regEmail",
                //use password tag "ID" from html
                passwordField: "regPassword",
                //used to send the request to the callback below and also to the success callba
                //following the successDirect
                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                //used to generate hashing for password
                var generateHash = function(password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                // call Admin model
                Admin.findOne({
                    where: {
                        email: username,
                    },
                }).then(function(admin) {
                    if (admin) {
                        return done(null, false, {
                            message: "That username is already taken",
                        });
                    } else {
                        var adminPassword = generateHash(password);

                        var data = {
                            email: username,

                            password: adminPassword,

                            fullname: req.body.regName,

                            phonenumber: req.body.regPhone,

                            status: "active",
                        };

                        Admin.create(data).then(function(newAdmin, created) {
                            if (!newAdmin) {
                                return done(null, false);
                            }

                            if (newAdmin) {
                                return done(null, newAdmin);
                            }
                        });
                    }
                });
            },
        ),
    );

    //LOCAL SIGNIN
    passport.use(
        "admin-signin",
        new LocalStrategy(
            {
                // by default, local strategy uses username and password, we will override with username

                usernameField: "loginEmail",

                passwordField: "loginPassword",

                passReqToCallback: true, // allows us to pass back the entire request to the callback
            },

            function(req, username, password, done) {
                var Admin = admin;
                var isValidPassword = function(adminpass, password) {
                    return bCrypt.compareSync(password, adminpass);
                };

                Admin.findOne({
                    where: {
                        email: username,
                    },
                })
                    .then(function(admin) {
                        if (!admin) {
                            console.log(username + " not found");
                            return done(null, false, {
                                message: "Username does not exist",
                            });
                        }

                        if (!isValidPassword(admin.password, password)) {
                            console.log(username + " password error");
                            return done(null, false, {
                                message: "Incorrect password.",
                            });
                        }

                        var admininfo = admin.get();
                        return done(null, admininfo);
                    })
                    .catch(function(err) {
                        console.log("Something went wrong with your Signin");
                        console.log("Error:", err);

                        return done(null, false, {
                            message: "Something went wrong with your Signin",
                        });
                    });
            },
        ),
    );
};
