const express = require("express");
const { cvUpload } = require("../multer/cvUpload-config");
const { MulterError } = require("multer");
const submitCV = express.Router();


const findMulterError = () => {
    return (err, req, res, next) => {
        if (err instanceof MulterError) {
            return res.json({ status: false, message: "File is too large. CV submission failed !" });
        } else if (err instanceof Error) {
            return res.json({ status: false, message: "File type is not allowed. CV submission failed !" });
        }
        next();
    }
}

submitCV.route("/cv/submitCV")
    .post(
        cvUpload.single("cv"),
        findMulterError(),
        function (req, res) {
            try {
                if (req?.file) {
                    console.log(req.body.index);
                    console.log("File is Uploaded");
                    console.log(req.file);
                } else {
                    console.log(req.body.index);
                    console.log("File is not Uploaded");
                }
                return res.json(
                    {
                        status: true,
                        message: "Submitted Successfully"
                    }
                );
            } catch {
                return res.json(
                    {
                        status: false,
                        message: "Server Error. Please try again"
                    }
                );
            }
        });

module.exports = submitCV;