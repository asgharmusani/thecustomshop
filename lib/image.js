var express = require("express");
var router = express.Router();
const fs = require("fs");
const sharp = require("sharp");

sharp.concurrency(1);

router.get("/data/:imageLoc/:productID*?/:imageID/:w/:h", function(req, res, next) {
    let width, height, imageLoc;
    imageLoc = req.params.imageLoc;

    //if imageLoc matches any of the three
    //making api safe
    if (imageLoc === "header" || imageLoc === "fabric" || imageLoc === "product") {
        const widthString = req.params.w;
        const heightString = req.params.h;
        const path = returnPath(req);

        if (widthString) {
            width = parseInt(widthString);
        }
        if (heightString) {
            height = parseInt(heightString);
        }

        resize(path, width, height)
            .then(function(resizedImage) {
                res.type(`image/jpg`);
                resizedImage.pipe(res);
            })
            .catch(function(err) {
                next(err);
            });
    }
    //send error page
    else {
        next(err);
    }
});

//the function that returns a promise
function resize(path, width, height) {
    //using promise to send the resized image
    return new Promise(function(resolve, reject) {
        let transform = sharp();
        //if width or height is set
        if (width || height) {
            try {
                transform = transform.resize(width, height);
            } catch (err) {
                reject(err);
            }
        } else reject(err);
        //this is an asynchronous function hence using promise
        var readStream = fs.createReadStream(path);
        //detects if the file has been successfully opened (read from the path)
        //returns promise in the form of object of resized image
        readStream.on("open", function() {
            resolve(readStream.pipe(transform));
        });
        //detects if the file failed to open (read from the path)
        //sends reject and error object
        readStream.on("error", reject);
    });
}

function returnPath(req) {
    if (req.params.imageLoc === "fabric") {
        return "./data/fabric/" + req.params.imageID + ".jpg";
    }
    //for product
    else if (req.params.imageLoc === "product") {
        return "./data/product/" + req.params.productID + "-" + req.params.imageID + ".jpg";
    }
    //for header
    else if (req.params.imageLoc === "header") {
        return "./data/header/" + req.params.imageID.toLowerCase() + ".jpg";
    }
}

module.exports = router;
