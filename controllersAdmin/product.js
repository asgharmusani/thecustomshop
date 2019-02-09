var models = require("../models"),
    exports = (module.exports = {}),
    path = require("path"),
    async = require("async"),
    sequelize = models.sequelize,
    multer = require("multer");

function prettify(str) {
    return str.replace(/(-|^)([^-]?)/g, function(_, prep, letter) {
        return (prep && " ") + letter.toUpperCase();
    });
}

exports.category = function(req, res, next) {
    console.log("Admin Category executing");
    var category = req.params.category;

    models.Product.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory, where: { category: category } },
            { model: models.Tag },
        ],
    })
        .then(function(rows) {
            if (!rows.length) {
                return next();
            }

            category = category.charAt(0).toUpperCase() + category.slice(1);
            res.render("admin/admin_productList", {
                titlePage: "Custom Ecommerce | Admin | " + category,
                layout: "admin_layout",
                products: rows,
                page: req.path,
                imageUrl: "/data/header/" + category.toLowerCase() + "/870/240",
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.subCategory = function(req, res, next) {
    console.log("subCategory executing");
    var category = req.params.category;
    var subCategory = req.params.subCategory;

    models.Product.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory, where: { category: category } },
            { model: models.Tag, where: { tag: subCategory } },
        ],
    })
        .then(function(rows) {
            if (!rows.length) {
                return next();
            }
            category = category.charAt(0).toUpperCase() + category.slice(1);
            subCategory = prettify(subCategory);
            res.render("admin/admin_productList", {
                titlePage: "Custom Ecommerce | Admin | " + category + " | " + subCategory,
                layout: "admin_layout",
                products: rows,
                page: req.path,
                imageUrl: "/data/header/" + category.toLowerCase() + "/870/240",
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.productShow = function(req, res, next) {
    console.log("productShow executing");

    let productID = req.params.productID;

    models.Product.findOne({
        where: {
            id: productID,
        },
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory },
            { model: models.Tag },
        ],
    })
        .then(function(row) {
            // if (!row.length) {
            //     return next();
            // }
            res.render("admin/admin_productUpdate", {
                titlePage: "Custom Ecommerce | Edit Product",
                layout: "admin_layout",
                product: row,
                page: req.path,
            });
        })
        .catch(function(err) {
            next(err);
        });
};

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.fieldname === "fabricImage") {
            cb(null, "./data/fabric");
        } else {
            cb(null, "./data/product");
        }
    },
    filename: function(req, file, cb) {
        const ext = ".jpg";

        if (file.fieldname === "fabricImage") {
            cb(null, req.fabricID + ext);
        } else {
            id = req.files.productImage.length;
            cb(null, req.productID + "-" + id + ext);
        }
    },
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".JPG" && ext !== ".JPEG") {
            return cb(new Error("Image Error"));
        }
        if (file.fieldname === "fabricImage") {
            if (!req.body.isNewFabric) {
                return cb(null, false);
            }
        }
        cb(null, true);
    },
}).fields([{ name: "fabricImage", maxCount: 1 }, { name: "productImage", maxCount: 8 }]);

exports.productSave = async function(req, res, next) {
    async.waterfall(
        [
            function(callback) {
                models.Product.findOne({
                    attributes: [[sequelize.fn("max", sequelize.col("id")), "id"]],
                })
                    .then(function(product) {
                        let pID = 0;
                        pID += product.id + 1;
                        req.productID = pID;

                        //if fabric is attaching
                        models.ProductFabric.findOne({
                            attributes: [[sequelize.fn("max", sequelize.col("id")), "id"]],
                        })
                            .then(function(fabric) {
                                let fID = 0;
                                fID += fabric.id + 1;
                                req.fabricID = fID;
                                callback(null);
                            })
                            .catch(function(err) {
                                callback(err, null);
                            });
                    })
                    .catch(function(err) {
                        callback(err, null);
                    });
            },
            //calling upload will parse the body to req.body from multer
            //now you can access the mutlipart form data
            //upload will also upload images to the server
            function(callback) {
                upload(req, res, function(err) {
                    if (err) {
                        //show error
                        return callback(err, null);
                    }
                    callback(null, req.body, req.files);
                });
            },
            function(allFormData, images, callback) {
                // arg1 now equals 'allFormData'
                category = allFormData.subCategory.split(";")[0];
                subCategory = allFormData.subCategory.split(";")[1];
                console.log("cat " + category + "sub " + subCategory);
                console.log("Form data");
                console.log(allFormData);
                console.log("Images");
                console.log(images);
                // if allFormData.
                let pID = req.productID;
                let fID = req.fabricID;
                if (allFormData.isNewFabric) {
                    models.ProductFabric.create({
                        id: fID,
                        text: allFormData.fabricName,
                    });
                }
                models.Product.create({
                    id: pID,
                    title: allFormData.title.trim(),
                    description: allFormData.description,
                    haveStock: 1,
                    current_stock: allFormData.qty,
                    isActive: 1,
                    category_id: category,
                    fabric_id: fID,
                }).then(function(product) {
                    models.ProductTag.create({ tag_id: subCategory, product_id: pID });
                    if (allFormData.tags !== "undefined") {
                        arrTags = allFormData.tags.split(",");
                        arrTags.forEach(function(tagIn) {
                            models.Tag.findOne({
                                where: {
                                    tag: tagIn.trim().toLowerCase(),
                                },
                            }).then(function(tag) {
                                models.ProductTag.create({ tag_id: tag.id, product_id: pID });
                            });
                        });
                    }
                    models.ProductPrice.findOne({
                        where: { product_id: pID },
                        attributes: [[sequelize.fn("max", sequelize.col("id")), "id"]],
                    }).then(function(price) {
                        let priceID = 0;
                        priceID += price.id + 1;
                        models.ProductPrice.create({
                            id: priceID,
                            price: allFormData.price,
                            product_id: pID,
                        });
                    });
                    models.ProductStock.findOne({
                        where: { product_id: pID },
                        attributes: [[sequelize.fn("max", sequelize.col("id")), "id"]],
                    }).then(function(stock) {
                        let stockID = 0;
                        stockID += stock.id + 1;
                        models.ProductStock.create({
                            id: stockID,
                            stock: allFormData.stock,
                            product_id: pID,
                        });
                    });
                    for (let i = 1; i <= images.productImage.length; i++) {
                        models.ProductImage.create({ id: i, product_id: pID });
                    }
                });
                callback(null, "done");
            },
        ],
        function(err, done) {
            if (done) {
                console.log("UPLOAD IS DONE");
                console.log(done);
                res.locals.flashMessage = {
                    status: "success",
                    value: "Product Added Successfuly!",
                };
                res.redirect("back");
            } else if (err) {
                console.log(err);
                next(err);
            }
        },
    );
};

exports.getTags = function(req, res, next) {
    models.Tag.findAll({ offset: 6 })
        .then(row => {
            res.render("admin/admin_tags", {
                titlePage: "Custom Ecommerce | Edit Tags",
                layout: "admin_layout",
                tags: row,
                page: req.path,
            });
        })
        .catch(err => next(err));
};
