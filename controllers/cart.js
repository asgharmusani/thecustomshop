var models = require("../models"),
    exports = (module.exports = {}),
    async = require("async");

exports.addToBasket = function(req, res, next) {
    var productID = req.params.productID,
        qty = typeof req.body.qty == "undefined" || req.body.qty === "" ? 1 : req.body.qty,
        qtyReplace = req.body.qtyReplace,
        i,
        basket,
        cartData;
    //check if number is integer (can be converted to a number)
    if (productID % 1 === 0) {
        //if basket is empty
        if (!req.session.basket) req.session.basket = [];

        basket = req.session.basket;

        //if basket is empty that means a push to its array is easy
        if (!basket.length) {
            req.session.basket.push({ productID: productID, qty: qty });
            //if user signed in its data is saved in DB
            if (typeof req.user != "undefined") {
                cartData = { productID: productID, qty: qty, userID: req.user.id };
            }
        } else {
            // checking if there is product with the same productID in the basket
            for (i = 0; i < basket.length; i++) {
                var product = basket[i];
                if (product.productID === productID) {
                    //for some peculiar reason this updates the request session basket as well MYSTERY!
                    product.qty = parseInt(product.qty) + parseInt(qty);

                    //if user signed in its data is saved in DB
                    if (typeof req.user != "undefined") {
                        cartData = { productID: productID, qty: product.qty, userID: req.user.id };
                        updateCart(cartData);
                    }
                    return res.redirect("back");
                }
            }
            if (typeof req.user != "undefined") {
                cartData = { productID: productID, qty: qty, userID: req.user.id };
            }
            req.session.basket.push({ productID: productID, qty: qty });
        }
        //if user signed in its data is saved in DB
        if (typeof req.user != "undefined") addToCart(cartData);
        res.redirect("back");
    } else next();
};

//update database of the user cart
function addToCart(cartData) {
    models.Cart.create({
        product_id: cartData.productID,
        quantity: cartData.qty,
        user_id: cartData.userID,
    })
        .then(function(cart) {
            console.log("AddToCart Database executing");
        })
        .catch(function(err) {
            next(err);
        });
}

function updateCart(cartData) {
    models.Cart.update(
        { quantity: cartData.qty },
        {
            where: {
                product_id: cartData.productID,
                user_id: cartData.userID,
            },
        },
    )
        .then(function() {
            console.log("UpdateCart Database executing");
        })
        .catch(function(err) {
            next(err);
        });
}

exports.removeFromBasket = function(req, res, next) {
    var productID = req.params.productID,
        basket = req.session.basket,
        i;

    basket = basket.filter(product => product.productID !== productID);
    if (typeof req.user != "undefined") {
        cartData = { productID: productID, userID: req.user.id };
        removeFromCart(cartData);
    }
    req.session.basket = basket;
    res.redirect("back");
};

//remove product from database cart
function removeFromCart(cartData) {
    models.Cart.destroy({
        where: {
            product_id: cartData.productID,
            user_id: cartData.userID,
        },
    })
        .then(function() {
            console.log("removeFromCart Database executing");
        })
        .catch(function(err) {
            next(err);
        });
}

exports.showCart = function(req, res, next) {
    productID = [];
    if (!req.session.basket || req.session.basket.length === 0) {
        res.render("front/cart", {
            titlePage: "Custom Ecommerce | Cart",
        });
        // res.json({ message: "Shopping Cart is empty!" });
    } else {
        async.waterfall(
            [
                function(callback) {
                    let productID = [];
                    let basket = req.session.basket;
                    for (var i = 0; i < basket.length; i++) {
                        productID.push(basket[i].productID);
                    }
                    callback(null, productID, basket);
                },
                function(productID, basket, callback) {
                    let orderTotal = 0;
                    models.Product.findAll({
                        where: {
                            id: productID,
                        },
                        include: [
                            { model: models.ProductImage, where: { id: 1 } },
                            { model: models.ProductCategory },
                            { model: models.Tag },
                            {
                                model: models.ProductPrice,
                                order: [["id", "DESC"]],
                                limit: 1,
                            },
                        ],
                    })
                        .then(function(rows) {
                            rows.forEach(function(row) {
                                basket.forEach(function(item) {
                                    if (item.productID == row.id) {
                                        row.qty = item.qty;
                                        row.totalPrice =
                                            parseInt(item.qty) * row.ProductPrices[0].price;
                                        orderTotal += parseInt(row.totalPrice);
                                        return;
                                    }
                                });
                            });
                            callback(null, rows, orderTotal);
                        })
                        .catch(function(err) {
                            callback(err, null);
                        });
                },
            ],
            function(err, rows, orderTotal) {
                if (rows) {
                    res.render("front/cart", {
                        titlePage: "Custom Ecommerce | Cart",
                        cartProducts: rows,
                        orderTotal: orderTotal,
                        page: req.path,
                    });
                } else if (err) {
                    next(err);
                }
            },
        );
    }
};

exports.checkout = function(req, res, next) {
    if (req.user) {
        productID = [];
        if (!req.session.basket || req.session.basket.length === 0) {
            res.render("front/cart", {
                titlePage: "Custom Ecommerce | Cart",
            });
            // res.json({ message: "Shopping Cart is empty!" });
        } else {
            async.waterfall(
                [
                    function(callback) {
                        let productID = [];
                        let basket = req.session.basket;
                        for (var i = 0; i < basket.length; i++) {
                            productID.push(basket[i].productID);
                        }
                        callback(null, productID, basket);
                    },
                    function(productID, basket, callback) {
                        let orderTotal = 0;
                        models.Product.findAll({
                            where: {
                                id: productID,
                            },
                            include: [
                                { model: models.ProductImage, where: { id: 1 } },
                                {
                                    model: models.ProductPrice,
                                    order: [["id", "DESC"]],
                                    limit: 1,
                                },
                            ],
                        })
                            .then(function(rows) {
                                rows.forEach(function(row) {
                                    basket.forEach(function(item) {
                                        if (item.productID == row.id) {
                                            row.qty = item.qty;
                                            row.totalPrice =
                                                parseInt(item.qty) * row.ProductPrices[0].price;
                                            orderTotal += parseInt(row.totalPrice);
                                            return;
                                        }
                                    });
                                });
                                callback(null, rows, orderTotal);
                            })
                            .catch(function(err) {
                                callback(err, null);
                            });
                    },
                ],
                function(err, rows, orderTotal) {
                    if (rows) {
                        res.render("front/checkout", {
                            titlePage: "Custom Ecommerce | Checkout",
                            cartProducts: rows,
                            orderTotal: orderTotal,
                            page: req.path,
                        });
                    } else if (err) {
                        next(err);
                    }
                },
            );
        }
    } else {
        res.redirect("/signup");
    }
};
