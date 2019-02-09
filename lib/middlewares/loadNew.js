models = require("../../models");

module.exports = function(req, res, next) {
    if ((res.locals.productNew && res.locals.productNew.length) || !(req.path === "/")) {
        next();
    } else {
        console.log("loadNew executing");

        models.Product.findAll({
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
                productNew = res.locals.productNew = row;
                next();
            })
            .catch(function(err) {
                next(err);
            });
    }
};
