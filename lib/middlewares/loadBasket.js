const Cart = require("../../models").Cart;

module.exports = async function(req, res, next) {
    //load basket from database if the user exists
    if (typeof req.user !== "undefined" && req.path !== "/logout") {
        console.log("Cart Load Middleware executing");

        await Cart.findAll({
            where: { user_id: req.user.id },
            attributes: [["product_id", "productID"], ["quantity", "qty"]],
            raw: true,
        })
            .then(function(cartProduct) {
                if (cartProduct.length < 1) {
                    req.session.basket = [];
                } else {
                    req.session.basket = cartProduct;
                }
                // console.log("before first attempt", req.session.basket.length);
            })
            .catch(function(err) {
                next(err);
            });
    }

    //normal load if user doesn't exist using sessions
    //load basket if old session data exists
    if (typeof req.session.basket == "undefined") {
        basket = res.locals.basket = req.session.basket = [];
        console.log("x attempt", basket.length);
        next();
    } else {
        console.log("first attempt", req.session.basket.length);
        res.locals.basket = req.session.basket;
        next();
    }
};
