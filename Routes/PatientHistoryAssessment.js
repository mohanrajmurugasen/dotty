const express = require("express");
const cors = require("cors");
const router = express.Router();
const PatientHistoryAssessment = require("../Models/PatientHistoryAssessment");
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
 * /api/PatientHistoryAssessment:
 *   post:
 *     tags:
 *       - PatientHistoryAssessment
 *     summary: Create a new PatientHistoryAssessment
 *     description: Create a new PatientHistoryAssessment with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               dateOfInjury:
 *                 type: string
 *               timeOfInjury:
 *                 type: string
 *               coResponders:
 *                 type: string
 *               treatmentRendered:
 *                 type: string
 *               patientCondition:
 *                 type: string
 *               patientDisplacement:
 *                 type: string
 *               suspectedIntoxication:
 *                 type: string
 *               chiefComplaint:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: PatientHistoryAssessment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/PatientHistoryAssessment", async (req, res) => {
  const details = {
    userId: req.body.userId,
    dateOfInjury: req.body.dateOfInjury,
    timeOfInjury: req.body.timeOfInjury,
    coResponders: req.body.coResponders,
    treatmentRendered: req.body.treatmentRendered,
    patientCondition: req.body.patientCondition,
    patientDisplacement: req.body.patientDisplacement,
    suspectedIntoxication: req.body.suspectedIntoxication,
    chiefComplaint: req.body.chiefComplaint,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new PatientHistoryAssessment(details);
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
 * /api/PatientHistoryAssessment:
 *   get:
 *     tags:
 *       - PatientHistoryAssessment
 *     summary: Get all PatientHistoryAssessment
 *     description: Retrieve a list of all PatientHistoryAssessment
 *     responses:
 *       200:
 *         description: A list of PatientHistoryAssessment
 */
router.get("/PatientHistoryAssessment", (req, res) => {
  PatientHistoryAssessment.find()
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
 * /api/PatientHistoryAssessmentByUserId/{userId}:
 *   get:
 *     tags:
 *       - PatientHistoryAssessment
 *     summary: Get a PatientHistoryAssessment by ID
 *     description: Retrieve a PatientHistoryAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the PatientHistoryAssessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientHistoryAssessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientHistoryAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientHistoryAssessment not found
 */
router.get("/PatientHistoryAssessmentByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  PatientHistoryAssessment.find({ userId: userId })
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
 * /api/PatientHistoryAssessmentById/{_id}:
 *   get:
 *     tags:
 *       - PatientHistoryAssessment
 *     summary: Get a PatientHistoryAssessment by ID
 *     description: Retrieve a PatientHistoryAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientHistoryAssessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientHistoryAssessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientHistoryAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientHistoryAssessment not found
 */
router.get("/PatientHistoryAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientHistoryAssessment.find({ _id: _id })
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
 * /api/PatientHistoryAssessment/{_id}:
 *   put:
 *     summary: Update a PatientHistoryAssessment by ID
 *     description: Update a PatientHistoryAssessment's information by ID
 *     tags:
 *       - PatientHistoryAssessment
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the PatientHistoryAssessment to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateOfInjury:
 *                 type: string
 *               timeOfInjury:
 *                 type: string
 *               coResponders:
 *                 type: string
 *     responses:
 *       200:
 *         description: PatientHistoryAssessment updated successfully
 *       400:
 *         description: Invalid PatientHistoryAssessment ID supplied or invalid PatientHistoryAssessment object
 *       404:
 *         description: PatientHistoryAssessment not found
 */
router.put("/PatientHistoryAssessment/:_id", (req, res) => {
  const _id = req.params._id;
  PatientHistoryAssessment.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.dateOfInjury = req.body.dateOfInjury),
        (result.timeOfInjury = req.body.timeOfInjury),
        (result.coResponders = req.body.coResponders),
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
 * /api/DeletePatientHistoryAssessmentById/{_id}:
 *   delete:
 *     tags:
 *       - PatientHistoryAssessment
 *     summary: Delete a PatientHistoryAssessment by ID
 *     description: Delete a PatientHistoryAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientHistoryAssessment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: PatientHistoryAssessment deleted successfully
 *       404:
 *         description: PatientHistoryAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientHistoryAssessment not found
 */
router.delete("/DeletePatientHistoryAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientHistoryAssessment.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
