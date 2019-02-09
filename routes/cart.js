var express = require("express"),
    router = express.Router(),
    cart = require("../controllers/cart");

router.post("/cart/add/:productID", cart.addToBasket);
router.get("/cart/add/:productID", cart.addToBasket);

router.get("/cart/remove/:productID", cart.removeFromBasket);

router.get("/checkout", cart.checkout);

router.get("/cart/show", cart.showCart);

module.exports = router;
