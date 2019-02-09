const models = require("../models"),
    fs = require("fs");
var exports = (module.exports = {});

exports.infoUpdate = (req, res, next) => {
    let infoToUpdate;
    if (req.body.description) {
        infoToUpdate = {
            description: req.body.description,
        };
    } else if (req.body.title) {
        infoToUpdate = {
            title: req.body.title,
        };
    }
    models.Product.update(infoToUpdate, {
        where: { id: req.params.productID },
    })
        .then(() => {
            generateSuccessToast(req, res);
        })
        .catch(err => {
            generateErrorToast(req, res, err);
        });
};

exports.priceAdd = (req, res, next) => {
    models.ProductPrice.create({ price: req.body.price, product_id: req.params.productID })
        .then(() => {
            generateSuccessToast(req, res);
        })
        .catch(err => {
            generateErrorToast(req, res, err);
        });
};

exports.stockAdd = (req, res, next) => {
    models.ProductStock.findOne({
        where: {
            product_id: req.param.productID,
        },
        order: [["createdAt", "DESC"]],
    }).then(latestRow => {
        let newStock;
        if (latestRow) {
            //old stock + new stock
            newStock = parseInt(latestRow.price) + parseInt(req.body.qty);
        } else {
            newStock = req.body.qty;
        }
        models.ProductStock.create({
            product_id: req.params.productID,
            stock: newStock,
        })
            .then(() => {
                generateSuccessToast(req, res);
            })
            .catch(err => {
                generateErrorToast(req, res, err);
            });
    });
};

exports.imageDelete = (req, res) => {
    let imageID = req.params.imageID,
        productID = req.params.ProductID,
        path = __dirname + "/data/product/" + productID + "-" + imageID;
    models.ProductImage.destroy({
        where: { id: imageID, product_id: productID },
    }).then(() => {
        fs.unlink(path, err => {
            if (err) generateErrorToast();
            generateSuccessToast();
        });
    });
};

//generate success message on popup and redirect to the page
function generateSuccessToast(req, res) {
    req.flash("flashMessage", {
        status: "success",
        value: "Product Updated Successfully!",
    });
    res.redirect("back");
}

//generate error message on popup and redirect to the page
function generateErrorToast(req, res, err) {
    req.flash("flashMessage", {
        status: "error",
        value: err.stack,
    });
    res.redirect("back");
}
