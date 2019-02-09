var models = require("../models"),
    exports = (module.exports = {}),
    Op = require("sequelize").Op;

function prettify(str) {
    return str.replace(/(-|^)([^-]?)/g, function(_, prep, letter) {
        return (prep && " ") + letter.toUpperCase();
    });
}

exports.category = function(req, res, next) {
    console.log("category executing");
    let category = req.params.category,
        page = req.params.page,
        sort = req.query.sort,
        order = req.query.order,
        limit = 6;

    //page input sanitization
    //if page is not defined at all it will assume page 1
    //if page is less than 0 or not a number it will move forward to next middleware
    page = typeof page == "undefined" ? 1 : page;
    if (page < 1 || !parseInt(page)) {
        return next();
    }

    //sort with input sanitization
    //only can choose from the sortType given below
    //else will move forward to the next middleware
    sortType = ["title", "price", "createdAt"];
    sort = typeof sort == "undefined" ? "createdAt" : sort;
    if (!sortType.includes(sort)) {
        return next();
    }

    //sanitizing order input as well
    order = typeof order == "undefined" ? "desc" : order;
    if (order != "desc" && order != "asc") {
        return next();
    }

    //creating sort object for sequelize
    //for associating models use its model name
    if (sort == "price") {
        sortBy = [models.ProductPrice, "price", order];
    } else if (sort == "title" || sort == "createdAt") {
        sortBy = [sort, order];
    }

    let offset = limit * (page - 1);
    models.Product.findAndCountAll({
        order: [sortBy],
        limit: limit,
        //because we are using many to many in Tag hence need distinct true as result will have duplicate records
        //bug/feature of sequelize is it will not show duplicated content
        //but data.count will include duplicated
        //hence you are left wondering how does count is more than the result
        distinct: true,
        offset: offset,
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory, where: { category: category } },
            { model: models.Tag },
        ],
    })
        .then(function(data) {
            //if data is not found move to next middleware
            if (!data.rows.length) {
                return next();
            }
            let pages = Math.ceil(data.count / limit);
            category = category.charAt(0).toUpperCase() + category.slice(1);
            let startCount = offset + 1;
            let endCount = offset + limit;
            res.render("front/product_list", {
                titlePage: "Custom Ecommerce | " + category,
                products: data.rows,
                pathOriginal: req.originalUrl,
                path: req.path,
                pathBreak: req.path.split("/"),
                endCount: endCount <= data.count ? endCount : data.count,
                startCount: startCount,
                currentPage: page,
                pages: pages,
                count: data.count,
                imageUrl: "/data/header/" + category.toLowerCase() + "/870/240",
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.subCategory = function(req, res, next) {
    console.log("subCategory executing");

    let category = req.params.category,
        subCategory = req.params.subCategory,
        page = req.params.page,
        sort = req.query.sort,
        order = req.query.order,
        limit = 6;

    //page input sanitization
    //if page is not defined at all it will assume page 1
    //if page is less than 0 or not a number it will move forward to next middleware
    page = typeof page == "undefined" ? 1 : page;
    if (page < 1 || !parseInt(page)) {
        return next();
    }

    //sort with input sanitization
    //only can choose from the sortType given below
    //else will move forward to the next middleware
    sortType = ["title", "price", "createdAt"];
    sort = typeof sort == "undefined" ? "createdAt" : sort;
    if (!sortType.includes(sort)) {
        return next();
    }

    //sanitizing order input as well
    order = typeof order == "undefined" ? "desc" : order;
    if (order != "desc" && order != "asc") {
        return next();
    }

    //creating sort object for sequelize
    //for associating models use its model name
    if (sort == "price") {
        sortBy = [models.ProductPrice, "price", order];
    } else if (sort == "title" || sort == "createdAt") {
        sortBy = [sort, order];
    }

    let offset = limit * (page - 1);
    models.Product.findAndCountAll({
        order: [sortBy],
        limit: limit,
        offset: offset,
        //because we are using many to many in Tag hence need distinct true as result will have duplicate records
        //bug/feature of sequelize is it will not show duplicated content
        //but data.count will include duplicated
        //hence you are left wondering how does count is more than the result
        distinct: true,
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory, where: { category: category } },
            { model: models.Tag, where: { tag: subCategory } },
        ],
    })
        .then(function(data) {
            //if data is not found move to next middleware
            if (!data.rows.length) {
                return next();
            }
            let pages = Math.ceil(data.count / limit);
            let startCount = offset + 1;
            let endCount = offset + limit;
            category = category.charAt(0).toUpperCase() + category.slice(1);
            subCategory = prettify(subCategory);
            res.render("front/product_list", {
                titlePage: "Custom Ecommerce | " + category + " | " + subCategory,
                products: data.rows,
                pathOriginal: req.originalUrl,
                path: req.path,
                pathBreak: req.path.split("/"),
                endCount: endCount <= data.count ? endCount : data.count,
                startCount: startCount,
                currentPage: page,
                pages: pages,
                count: data.count,
                imageUrl: "/data/header/" + category.toLowerCase() + "/870/240",
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.categoryFindByTag = function(req, res, next) {
    console.log("categoryFindByTag executing");
    var category = req.params.category;
    var tags = req.query.tag;
    console.log(tags);

    models.Product.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory, where: { category: category } },
            { model: models.Tag, where: { tag: { [Op.in]: tags } } },
        ],
    })
        .then(function(rows) {
            if (!rows.length) {
                return next();
            }
            category = category.charAt(0).toUpperCase() + category.slice(1);
            res.json({
                titlePage: "Custom Ecommerce | " + category,
                products: rows,
                page: req.path,
                imageUrl: "/data/header/" + category.toLowerCase() + "/870/240",
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.subCategoryFindByTag = function(req, res, next) {
    console.log("subCategoryFindByTag executing");
    var category = req.params.category;
    var tags = req.params.tag;
    var subCategory = req.params.subCategory;

    models.Product.findAll({
        order: [["createdAt", "DESC"]],
        include: [
            { model: models.ProductImage },
            { model: models.ProductFabric },
            { model: models.ProductPrice },
            { model: models.ProductCategory, where: { category: category } },
            {
                model: models.Tag,
                where: {
                    [Op.and]: [
                        {
                            tag: {
                                [Op.in]: [tags],
                            },
                        },
                        {
                            tag: {
                                [Op.eq]: [subCategory],
                            },
                        },
                    ],
                },
            },
        ],
    })
        .then(function(rows) {
            if (!rows.length) {
                return next(err);
            }
            category = category.charAt(0).toUpperCase() + category.slice(1);
            subCategory = prettify(subCategory);
            res.json("front/product_list", {
                titlePage: "Custom Ecommerce | " + category + " | " + subCategory,
                products: rows,
                page: req.path,
                imageUrl: "/data/header/" + category.toLowerCase() + "/870/240",
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.productDetail = function(req, res, next) {
    console.log("productShow executing");

    var category = req.params.category;
    var productTitle = prettify(req.params.productTitle);
    var subCategory = req.params.subCategory;

    models.Product.findOne({
        where: {
            title: productTitle,
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
            if (!row) {
                return next();
            }
            category = category.charAt(0).toUpperCase() + category.slice(1);
            subCategory = prettify(subCategory);
            res.render("front/product", {
                titlePage: "Custom Ecommerce | " + category + " | " + subCategory,
                product: row,
                page: req.path,
            });
        })
        .catch(function(err) {
            next(err);
        });
};
