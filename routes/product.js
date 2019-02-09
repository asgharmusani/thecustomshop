var express = require("express"),
    router = express.Router(),
    product = require("../controllers/product");

router.get("/category/:category", product.category);
router.get("/category/:category/page/:page", product.category);

router.get("/category/:category/:subCategory", product.subCategory);
router.get("/category/:category/:subCategory/page/:page", product.subCategory);
router.get("/category/:category/:subCategory/:productTitle", product.productDetail);


module.exports = router;
