const models = require("../../models");

module.exports = function(req, res, next) {
    if ((res.locals.productFeatured && res.locals.productFeatured.length) || !(req.path === "/")) {
        next();
    } else {
        console.log("loadFeatured executing");

        models.Product.findAll({
            where: {
                isFeatured: true,
            },
            limit: 10,
            order: [["createdAt", "DESC"]],
            include: [
                { model: models.ProductImage },
                { model: models.ProductFabric },
                { model: models.ProductPrice },
                { model: models.ProductCategory },
                { model: models.Tag },
            ],
        })
            .then(function(row) {
                productFeatured = res.locals.productFeatured = row;
                next();
            })
            .catch(function(err) {
                console.log("loadFeatured Error ", err.message);
                next(err);
            });
    }
};
