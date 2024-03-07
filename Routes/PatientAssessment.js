const express = require("express");
const cors = require("cors");
const router = express.Router();
const PatientAssessment = require("../Models/PatientAssessment");
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
 * /api/PatientAssessment:
 *   post:
 *     tags:
 *       - PatientAssessment
 *     summary: Create a new PatientAssessment
 *     description: Create a new PatientAssessment with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               respiration:
 *                 type: string
 *               seizure:
 *                 type: string
 *               toxicExposure:
 *                 type: string
 *               cardiacArrest:
 *                 type: string
 *               chestPain:
 *                 type: string
 *               neonatal:
 *                 type: string
 *               obstetric:
 *                 type: string
 *               trauma:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: PatientAssessment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/PatientAssessment", async (req, res) => {
  const details = {
    userId: req.body.userId,
    respiration: req.body.respiration,
    seizure: req.body.seizure,
    toxicExposure: req.body.toxicExposure,
    cardiacArrest: req.body.cardiacArrest,
    chestPain: req.body.chestPain,
    neonatal: req.body.neonatal,
    obstetric: req.body.obstetric,
    trauma: req.body.trauma,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new PatientAssessment(details);
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
 * /api/PatientAssessment:
 *   get:
 *     tags:
 *       - PatientAssessment
 *     summary: Get all PatientAssessment
 *     description: Retrieve a list of all PatientAssessment
 *     responses:
 *       200:
 *         description: A list of PatientAssessment
 */
router.get("/PatientAssessment", (req, res) => {
  PatientAssessment.find()
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
 * /api/PatientAssessmentByUserId/{userId}:
 *   get:
 *     tags:
 *       - PatientAssessment
 *     summary: Get a PatientAssessment by ID
 *     description: Retrieve a PatientAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the PatientAssessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientAssessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientAssessment not found
 */
router.get("/PatientAssessmentByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  PatientAssessment.find({ userId: userId })
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
 * /api/PatientAssessmentById/{_id}:
 *   get:
 *     tags:
 *       - PatientAssessment
 *     summary: Get a PatientAssessment by ID
 *     description: Retrieve a PatientAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientAssessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PatientAssessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PatientAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientAssessment not found
 */
router.get("/PatientAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientAssessment.find({ _id: _id })
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
 * /api/PatientAssessment/{_id}:
 *   put:
 *     summary: Update a PatientAssessment by ID
 *     description: Update a PatientAssessment's information by ID
 *     tags:
 *       - PatientAssessment
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the PatientAssessment to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respiration:
 *                 type: string
 *               seizure:
 *                 type: string
 *               toxicExposure:
 *                 type: string
 *     responses:
 *       200:
 *         description: PatientAssessment updated successfully
 *       400:
 *         description: Invalid PatientAssessment ID supplied or invalid PatientAssessment object
 *       404:
 *         description: PatientAssessment not found
 */
router.put("/PatientAssessment/:_id", (req, res) => {
  const _id = req.params._id;
  PatientAssessment.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.respiration = req.body.respiration),
        (result.seizure = req.body.seizure),
        (result.toxicExposure = req.body.toxicExposure),
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
 * /api/DeletePatientAssessmentById/{_id}:
 *   delete:
 *     tags:
 *       - PatientAssessment
 *     summary: Delete a PatientAssessment by ID
 *     description: Delete a PatientAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PatientAssessment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: PatientAssessment deleted successfully
 *       404:
 *         description: PatientAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PatientAssessment not found
 */
router.delete("/DeletePatientAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  PatientAssessment.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
