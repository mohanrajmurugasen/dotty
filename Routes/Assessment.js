const express = require("express");
const cors = require("cors");
const router = express.Router();
const Assessment = require("../Models/Assessment");
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
 * /api/Assessment:
 *   post:
 *     tags:
 *       - Assessment
 *     summary: Create a new Assessment
 *     description: Create a new Assessment with the given information
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
 *               neroResponse:
 *                 type: string
 *               bodySystem:
 *                 type: string
 *               glasGlow:
 *                 type: string
 *               generalAssessment:
 *                 type: string
 *               airway:
 *                 type: string
 *               symptoms:
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
 *         description: Assessment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/Assessment", async (req, res) => {
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
    neroResponse: req.body.neroResponse,
    bodySystem: req.body.bodySystem,
    glasGlow: req.body.glasGlow,
    generalAssessment: req.body.generalAssessment,
    airway: req.body.airway,
    symptoms: req.body.symptoms,
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

  const newDetails = new Assessment(details);
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
 * /api/Assessment:
 *   get:
 *     tags:
 *       - Assessment
 *     summary: Get all Assessment
 *     description: Retrieve a list of all Assessment
 *     responses:
 *       200:
 *         description: A list of Assessment
 */
router.get("/Assessment", (req, res) => {
  Assessment.find()
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
 * /api/AssessmentByUserId/{userId}:
 *   get:
 *     tags:
 *       - Assessment
 *     summary: Get a Assessment by ID
 *     description: Retrieve a Assessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the Assessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assessment not found
 */
router.get("/AssessmentByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  Assessment.find({ userId: userId })
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
 * /api/AssessmentById/{_id}:
 *   get:
 *     tags:
 *       - Assessment
 *     summary: Get a Assessment by ID
 *     description: Retrieve a Assessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the Assessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assessment not found
 */
router.get("/AssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  Assessment.find({ _id: _id })
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
 * /api/Assessment/{_id}:
 *   put:
 *     summary: Update a Assessment by ID
 *     description: Update a Assessment's information by ID
 *     tags:
 *       - Assessment
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the Assessment to update
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
 *         description: Assessment updated successfully
 *       400:
 *         description: Invalid Assessment ID supplied or invalid Assessment object
 *       404:
 *         description: Assessment not found
 */
router.put("/Assessment/:_id", (req, res) => {
  const _id = req.params._id;
  Assessment.findById(_id, (err, result) => {
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
 * /api/DeleteAssessmentById/{_id}:
 *   delete:
 *     tags:
 *       - Assessment
 *     summary: Delete a Assessment by ID
 *     description: Delete a Assessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the Assessment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Assessment deleted successfully
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assessment not found
 */
router.delete("/DeleteAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  Assessment.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
