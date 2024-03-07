const express = require("express");
const cors = require("cors");
const router = express.Router();
const PatientCallDetails = require("../Models/PatientCallDetails");
const nodemailer = require("nodemailer");

router.use(express.json());
router.use(cors());

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test@dev-dottycare.org",
    pass: "devtest123!",
  },
});

/**
 * @swagger
 * /api/PatientCallDetails:
 *   post:
 *     tags:
 *       - PatientCallDetails
 *     summary: Create a new PatientCallDetails
 *     description: Create a new PatientCallDetails with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               sureName:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               telePhone:
 *                 type: string
 *               DOB:
 *                 type: string
 *               age:
 *                 type: string
 *               gender:
 *                 type: string
 *               aadhar:
 *                 type: string
 *               medicalInsurance:
 *                 type: string
 *               typeOfInsurance:
 *                 type: string
 *               governmentInsurance_insuranceId:
 *                 type: string
 *               governmentInsurance_coverageAmount:
 *                 type: string
 *               governmentInsurance_benefits:
 *                 type: string
 *               privateInsurance_insuranceId:
 *                 type: string
 *               privateInsurance_benefits:
 *                 type: string
 *               hospitalChart:
 *                 type: string
 *               comments:
 *                 type: string
 *               email1:
 *                 type: string
 *               email2:
 *                 type: string
 *     responses:
 *       201:
 *         description: PatientCallDetails created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/PatientCallDetails", async (req, res) => {
  const details = {
    userId: req.body.userId,
    firstName: req.body.firstName,
    sureName: req.body.sureName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    postalCode: req.body.postalCode,
    telePhone: req.body.telePhone,
    DOB: req.body.DOB,
    age: req.body.age,
    gender: req.body.gender,
    aadhar: req.body.aadhar,
    medicalInsurance: req.body.medicalInsurance,
    typeOfInsurance: req.body.typeOfInsurance,
    governmentInsurance_insuranceId: req.body.governmentInsurance_insuranceId,
    governmentInsurance_coverageAmount:
      req.body.governmentInsurance_coverageAmount,
    governmentInsurance_benefits: req.body.governmentInsurance_benefits,
    privateInsurance_insuranceId: req.body.privateInsurance_insuranceId,
    privateInsurance_benefits: req.body.privateInsurance_benefits,
    hospitalChart: req.body.hospitalChart,
    comments: req.body.comments,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email2}, ${req.body.email1}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new PatientCallDetails(details);
  newDetails.save((err, savedObject) => {
    if (err) throw err;

    mailTransporter.sendMail(mails, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Email sending failed!");
      } else {
        console.log("Email send successsfully");
        res.send({
          message: "Your request is successfully submitted!",
          data: savedObject,
        });
      }
    });
  });
});

/**
 * @swagger
 * /api/PatientCallDetails:
 *   get:
 *     tags:
 *       - PatientCallDetails
 *     summary: Get all PatientCallDetails
 *     description: Retrieve a list of all PatientCallDetails
 *     responses:
 *       200:
 *         description: A list of PatientCallDetails
 */
router.get("/PatientCallDetails", (req, res) => {
  PatientCallDetails.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.status(400).send(err));
});

/**
 * @swagger
 * /api/PatientCallDetailsById/{_id}:
 *   get:
 *     tags:
 *       - PatientCallDetails
 *     summary: Get a PatientCallDetails by ID
 *     description: Retrieve a PatientCallDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientCallDetails to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientCallDetails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientCallDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientCallDetails not found
 */
router.get("/PatientCallDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientCallDetails.find({ _id: _id })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.json(err.message));
});

/**
 * @swagger
 * /api/PatientCallDetails/{_id}:
 *   put:
 *     summary: Update a PatientCallDetails by ID
 *     description: Update a PatientCallDetails's information by ID
 *     tags:
 *       - PatientCallDetails
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the PatientCallDetails to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               sureName:
 *                 type: string
 *     responses:
 *       200:
 *         description: PatientCallDetails updated successfully
 *       400:
 *         description: Invalid PatientCallDetails ID supplied or invalid PatientCallDetails object
 *       404:
 *         description: PatientCallDetails not found
 */
router.put("/PatientCallDetails/:_id", (req, res) => {
  const _id = req.params._id;
  PatientCallDetails.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.firstName = req.body.firstName),
        (result.sureName = req.body.sureName),
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

/**
 * @swagger
 * info:
 *   title: My API
 *   description: This is a sample API for demonstration purposes.
 *   version: 1.0.0
 *
 * /api/DeletePatientCallDetailsById/{_id}:
 *   delete:
 *     tags:
 *       - PatientCallDetails
 *     summary: Delete a PatientCallDetails by ID
 *     description: Delete a PatientCallDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientCallDetails to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: PatientCallDetails deleted successfully
 *       404:
 *         description: PatientCallDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientCallDetails not found
 */
router.delete("/DeletePatientCallDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientCallDetails.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
