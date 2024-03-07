const express = require("express");
const cors = require("cors");
const router = express.Router();
const PatientTreatmentDetails = require("../Models/PatientTreatmentDetails");
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
 * /api/PatientTreatmentDetails:
 *   post:
 *     tags:
 *       - PatientTreatmentDetails
 *     summary: Create a new PatientTreatmentDetails
 *     description: Create a new PatientTreatmentDetails with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               procedureStartTime:
 *                 type: string
 *               procedureType:
 *                 type: string
 *               procedureEndTime:
 *                 type: string
 *               deviceMethod:
 *                 type: string
 *               technicianID:
 *                 type: string
 *               deviceSize:
 *                 type: string
 *               outcome:
 *                 type: string
 *               successfull:
 *                 type: string
 *               treatment:
 *                 type: string
 *               totalTime:
 *                 type: string
 *               treatmentType:
 *                 type: string
 *               administrativeRoute:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: PatientTreatmentDetails created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/PatientTreatmentDetails", async (req, res) => {
  const details = {
    userId: req.body.userId,
    procedureStartTime: req.body.procedureStartTime,
    procedureType: req.body.procedureType,
    procedureEndTime: req.body.procedureEndTime,
    deviceMethod: req.body.deviceMethod,
    technicianID: req.body.technicianID,
    deviceSize: req.body.deviceSize,
    outcome: req.body.outcome,
    successfull: req.body.successfull,
    treatment: req.body.treatment,
    totalTime: req.body.totalTime,
    treatmentType: req.body.treatmentType,
    administrativeRoute: req.body.administrativeRoute,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new PatientTreatmentDetails(details);
  newDetails.save((err, savedObject) => {
    if (err) throw err;

    mailTransporter.sendMail(mails, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Email sending failed!");
      } else {
        console.log("Email send successsfully");
        res.status(201).send({
          message: "Your request is successfully submitted!",
          data: savedObject,
        });
      }
    });
  });
});

/**
 * @swagger
 * /api/PatientTreatmentDetails:
 *   get:
 *     tags:
 *       - PatientTreatmentDetails
 *     summary: Get all PatientTreatmentDetails
 *     description: Retrieve a list of all PatientTreatmentDetails
 *     responses:
 *       200:
 *         description: A list of PatientTreatmentDetails
 */
router.get("/PatientTreatmentDetails", (req, res) => {
  PatientTreatmentDetails.find()
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
 * /api/PatientTreatmentDetailsByUserId/{userId}:
 *   get:
 *     tags:
 *       - PatientTreatmentDetails
 *     summary: Get a PatientTreatmentDetails by ID
 *     description: Retrieve a PatientTreatmentDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the PatientTreatmentDetails to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientTreatmentDetails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientTreatmentDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientTreatmentDetails not found
 */
router.get("/PatientTreatmentDetailsByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  PatientTreatmentDetails.find({ userId: userId })
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
 * /api/PatientTreatmentDetailsById/{_id}:
 *   get:
 *     tags:
 *       - PatientTreatmentDetails
 *     summary: Get a PatientTreatmentDetails by ID
 *     description: Retrieve a PatientTreatmentDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientTreatmentDetails to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientTreatmentDetails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientTreatmentDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientTreatmentDetails not found
 */
router.get("/PatientTreatmentDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientTreatmentDetails.find({ _id: _id })
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
 * /api/PatientTreatmentDetails/{_id}:
 *   put:
 *     summary: Update a PatientTreatmentDetails by ID
 *     description: Update a PatientTreatmentDetails's information by ID
 *     tags:
 *       - PatientTreatmentDetails
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the PatientTreatmentDetails to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               procedureStartTime:
 *                 type: string
 *               procedureType:
 *                 type: string
 *               procedureEndTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: PatientTreatmentDetails updated successfully
 *       400:
 *         description: Invalid PatientTreatmentDetails ID supplied or invalid PatientTreatmentDetails object
 *       404:
 *         description: PatientTreatmentDetails not found
 */
router.put("/PatientTreatmentDetails/:_id", (req, res) => {
  const _id = req.params._id;
  PatientTreatmentDetails.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.procedureStartTime = req.body.procedureStartTime),
        (result.procedureType = req.body.procedureType),
        (result.procedureEndTime = req.body.procedureEndTime),
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
 * /api/DeletePatientTreatmentDetailsById/{_id}:
 *   delete:
 *     tags:
 *       - PatientTreatmentDetails
 *     summary: Delete a PatientTreatmentDetails by ID
 *     description: Delete a PatientTreatmentDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientTreatmentDetails to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: PatientTreatmentDetails deleted successfully
 *       404:
 *         description: PatientTreatmentDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientTreatmentDetails not found
 */
router.delete("/DeletePatientTreatmentDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientTreatmentDetails.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
