const express = require("express"),
    productUpdate = require("../controllersAdmin/productUpdate"),
    product = require("../controllersAdmin/product"),
    router = express.Router();

router.get("/admin-panel/*", (req, res, next) => {
    res.locals.flashMessage = req.flash("flashMessage")[0];
    next();
});
// render admin/product_list
router.get("/admin-panel/list/:category", product.category);

// render admin/product_list
router.get("/admin-panel/list/:category/:subCategory", product.subCategory);

//add product page
router.get("/admin-panel/product-detail", function(req, res, next) {
    res.render("admin/admin_productAdd", {
        titlePage: "Ambassador - The Custom Shop | Products",
        layout: "admin_layout",
    });
});

// render admin/product
router.get("/admin-panel/product/update/:productID", product.productShow);

router.post("/admin-panel/product/save", product.productSave);

router.get("/admin-panel/product/tags", product.getTags);

router.post("/admin-panel/product/info/update/:productID", productUpdate.infoUpdate);
router.post("/admin-panel/product/price/add/:productID", productUpdate.priceAdd);
router.post("/admin-panel/product/stock/add/:productID", productUpdate.priceAdd);

router.post("/admin-panel/product/image/delete/:productID/:imageID", productUpdate.imageDelete);

module.exports = router;
