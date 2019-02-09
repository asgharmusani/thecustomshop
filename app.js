var express = require("express"),
    app = express(),
    Handlebars = require("handlebars"),
    exphbs = require("express-handlebars"),
    server = require("http").createServer(app),
    path = require("path"),
    session = require("express-session"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    models = require("./models"),
    flash = require("connect-flash"),
    env = process.env.NODE_ENV || "development",
    config = require(path.join(__dirname, "config", "config.json"))[env],
    MySQLStore = require("express-mysql-session")(session);

//app environment
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    exphbs({
        extname: ".hbs",
        defaultLayout: "layout",
    }),
);
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

//register helper function to take out spaces" " and replace with hyphens"-""
Handlebars.registerHelper("titleLink", function(value) {
    return value.replace(/\s/g, "-");
});

//this helper function will generate a list of pages href with their html for pagination
//takes total number of pages, requested path and current page
Handlebars.registerHelper("generatePagination", function(pages, path, currentPage) {
    let pagination = "";
    //get the requested path without page number
    //path "/category/formal/shirts/page/2" will give you //path "/category/formal/shirts
    pathStart = path.split("/page").shift();
    pathEnd = path.split("/page/" + currentPage)[1];

    if (typeof pathEnd == "undefined") {
        pathEnd = "";
    }
    //pageStart and pageEnd will be added to all the page number
    //add page/:pageNumber to create href links
    //and then generate html accordingly
    for (let i = 1; i <= pages; i++) {
        if (i == currentPage) {
            pagination +=
                '<li class="active"><a href="' +
                pathStart +
                "/page/" +
                i +
                pathEnd +
                '">' +
                i +
                "</a></li>";
        } else {
            pagination +=
                '<li><a href="' + pathStart + "/page/" + i + pathEnd + '">' + i + "</a></li>";
        }
    }
    return pagination;
});

Handlebars.registerHelper("pageStart", function(path) {
    //get the requested path without page number
    return path.split("/page").shift();
});

Handlebars.registerHelper("incrementPage", function(currentPage, pages, path) {
    //current page ++
    //pathEnd represents after the page
    endPath = "";
    value = parseInt(currentPage) + 1;
    //if added value is greater than max pages then revert
    if (value >= pages || !value) {
        endPath = pages;
    } else endPath = value;

    pathEnd = path.split("/page/" + currentPage)[1];
    if (typeof pathEnd == "undefined") {
        pathEnd = "";
    }
    return endPath + pathEnd;
});

Handlebars.registerHelper("decrementPage", function(currentPage, path) {
    //current page --
    //pathEnd represents after the page
    endPath = "";
    value = parseInt(currentPage) - 1;
    //if subtracted value is less than 0 then revert
    if (value <= 0 || !value) {
        endPath = 1;
    } else endPath = value;
    pathEnd = path.split("/page/" + currentPage)[1];
    if (typeof pathEnd == "undefined") {
        pathEnd = "";
    }
    return endPath + pathEnd;
});
//using express builtin session is not a good for production environment
//usually mongoDB is used
//session environment
app.use(
    session({
        key: "session_id",
        secret: config.sessionSecret,
        store: new MySQLStore({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
        }),
        resave: true,
        saveUninitialized: true,
    }),
);
//route for image api loaded on top so no other middleware is called
app.use(require("./lib/image"));
//passport session should always come after app session.

app.use(passport.initialize());
app.use(passport.session());

//flash messages for passport
//flash messages are stored in session
app.use(flash());

//sync models
models.sequelize
    .sync({ force: false })
    .then(function() {
        console.log("Models have been synced");
    })
    .catch(function(err) {
        console.log(err);
    });

//load middlewares
//auth Strategy
require("./config/passport/passport.js")(passport, models.User, models.Admin);
//attaches user to every response
app.use(require("./lib/middlewares/loadUser"));

//under construction
app.use(require("./lib/middlewares/loadBasket"));

//sends productNew as an object containing 10 new products
app.use(require("./lib/middlewares/loadNew"));

//sends productFeatured as an object containing 10 featured  products
app.use(require("./lib/middlewares/loadFeatured"));

//routes
app.use(require("./routes/index"));
app.use(require("./routes/product"));
app.use(require("./routes/auth"));
app.use(require("./routes/cart"));
app.use(require("./routesAdmin/auth"));
app.use(require("./routesAdmin/product"));

// error handler
app.use(function(err, req, res, next) {
    // No routes handled the request and no system error, that means 404 issue.
    // Forward to next middleware to handle it.
    if (!err) return next();

    // set locals, only providing error in development
    console.log("OUCH! INTERNAL ERROR!");
    console.log(err);
    res.locals.message = err.message;
    res.locals.error =
        req.app.get("env") === "development" ? err : "Today's not a good day. Errorrrrr! :(";

    // render the error page
    res.status(err.status || 500);
    res.render("error", {
        titlePage: "Ambassador - The Custom Shop | Internal Error",
    });
});

//lastware - error route
app.use(function(req, res, next) {
    console.log("404. Path: ", req.path);
    res.status(404).render("error", {
        titlePage: "Ambassador - The Custom Shop | Error",
        errorCustom: "Error 404",
        messageCustom: "OOPS! You have stumbled in to the darkness.",
    });
});

app.set("port", process.env.PORT || 3100);
server.listen(app.get("port"), function() {
    console.log("Server working working at port", app.get("port"));
});
