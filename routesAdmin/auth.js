var express = require("express"),
    passport = require("passport"),
    router = express.Router();

//admin temporary Routes
router.get("/admin-panel/login", function(req, res, next) {
    res.render("admin/admin_login", {
        titlePage: "Ambassador - The Custom Shop | Admin",
        layout: "admin_layout",
    });
});

router.get("/admin-panel/dashboard", function(req, res, next) {
    res.render("admin/admin_dashboard", {
        titlePage: "Ambassador - The Custom Shop | Dashboard",
        layout: "admin_layout",
    });
});

router.get("/admin-panel/orders", function(req, res, next) {
    res.render("admin/admin_orders", {
        titlePage: "Ambassador - The Custom Shop | Orders",
        layout: "admin_layout",
    });
});

router.get("/admin-panel/sales-report", function(req, res, next) {
    res.render("admin/admin_salesReport", {
        titlePage: "Ambassador - The Custom Shop | Sales Report",
        layout: "admin_layout",
    });
});

router.get("/admin-panel/customer-report", function(req, res, next) {
    res.render("admin/admin_customersReport", {
        titlePage: "Ambassador - The Custom Shop | Customers Report",
        layout: "admin_layout",
    });
});

router.get("/admin-panel/product-report", function(req, res, next) {
    res.render("admin/admin_productsReport", {
        titlePage: "Ambassador - The Custom Shop | Products Report",
        layout: "admin_layout",
    });
});

// router.post("/admin-panel/login")

module.exports = router;
