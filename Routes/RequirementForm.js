const express = require("express");
const cors = require("cors");
const router = express.Router();
const RequirementForm = require("../Models/RequirementForm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { upload } = require("../FileHelper/Upload");
const nodemailer = require("nodemailer");
const fs = require("fs");

router.use(express.json());
router.use(cors());

const secretKey = process.env.SECRET_KEY;

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test@dev-dottycare.org",
    pass: "devtest123!",
  },
});

router.post(
  "/RequirementForm",
  upload.array("file"),
  async (req, res, next) => {
    try {
      let filesArray = [];

      let details = {
        from: "test@dev-dottycare.org",
        to: `${req.body.email}`,
        subject: `${req.body.designation}`,
        text: `${req.body.responsbilities}`,
      };

      req.files.forEach((element) => {
        const files = {
          fileName: element.originalname,
          filePath: element.path,
          fileType: element.mimetype,
        };
        filesArray.push(files);
      });
      const multipleFiles = new RequirementForm({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        designation: req.body.designation,
        primary: req.body.primary,
        secondary: req.body.secondary,
        certificate: filesArray,
        experience: req.body.experience,
        responsbilities: req.body.responsbilities,
        shift: req.body.shift,
        shiftFixedStart: req.body.shiftFixedStart,
        shiftFixedEnd: req.body.shiftFixedEnd,
        shiftRotation: req.body.shiftRotation,
        dateOfJoin: req.body.dateOfJoin,
        contractType: req.body.contractType,
        contractDuration: req.body.contractDuration,
        status: "Active",
      });

      await multipleFiles.save();
      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Email sending failed!");
        } else {
          console.log("Email send successsfully");
          res.status(201).send({
            message: "Your request is successfully submitted!",
          });
        }
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

router.get("/RequirementForm", (req, res) => {
  RequirementForm.find({}, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({
        message: "Success",
        data: result,
      });
    }
  });
});

router.get("/RequirementFormByEmail/:email", (req, res) => {
  const email = req.params.email;
  RequirementForm.find({ email: email, status: "Active" })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.json(err.message));
});

router.get("/RequirementFormByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  RequirementForm.find({ userId: userId, status: "Active" })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.json(err.message));
});

router.put("/RequirementFormDeActive/:id", (req, res) => {
  const id = req.params.id;
  RequirementForm.findById(id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      result.status = "DeActive";

      result
        .save()
        .then((user) => {
          res.status(200).send({
            message: "Updated Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: "Unable to update data please try again!",
          });
        });
    }
  });
});

router.put("/RequirementFormActive/:id", (req, res) => {
  const id = req.params.id;
  RequirementForm.findById(id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      result.status = "Active";

      result
        .save()
        .then((user) => {
          res.status(200).send({
            message: "Updated Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: "Unable to update data please try again!",
          });
        });
    }
  });
});

router.delete("/RequirementForm/:id/:path", (req, res) => {
  const id = req.params.id;
  const path = req.params.path;

  RequirementForm.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.json(err);
      res.status(400).send({
        message: "Unable to delete this data please try again!",
      });
    } else {
      fs.unlink(`./uploads/${path}`, (err) => {
        if (err) return console.error(err);
        console.log("success!");
      });
      res.status(200).send({
        message: "Deleted Successfully",
        data: result,
      });
    }
  });
});

module.exports = router;
