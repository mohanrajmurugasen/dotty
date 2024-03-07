const express = require("express");
const cors = require("cors");
const router = express.Router();
const Treatment = require("../Models/Treatment");
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
 * /api/Treatment:
 *   post:
 *     tags:
 *       - Treatment
 *     summary: Create a new Treatment
 *     description: Create a new Treatment with the given information
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
 *               assessmentTime:
 *                 type: string
 *               consciousnessLevel:
 *                 type: string
 *               pulseRate:
 *                 type: string
 *               siteOfPulseCheck:
 *                 type: string
 *               temperature:
 *                 type: string
 *               siteOfTemperatureCheck:
 *                 type: string
 *               skinColor:
 *                 type: string
 *               skinCondition:
 *                 type: string
 *               moisture:
 *                 type: string
 *               bloodPressure_diastolic:
 *                 type: string
 *               bloodPressure_systolic:
 *                 type: string
 *               respiration:
 *                 type: string
 *               bloodGlucose:
 *                 type: string
 *               oxygenSaturation_preOxygen:
 *                 type: string
 *               oxygenSaturation_postOxygen:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Treatment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/Treatment", async (req, res) => {
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
    assessmentTime: req.body.assessmentTime,
    consciousnessLevel: req.body.consciousnessLevel,
    pulseRate: req.body.pulseRate,
    siteOfPulseCheck: req.body.siteOfPulseCheck,
    temperature: req.body.temperature,
    siteOfTemperatureCheck: req.body.siteOfTemperatureCheck,
    skinColor: req.body.skinColor,
    skinCondition: req.body.skinCondition,
    moisture: req.body.moisture,
    bloodPressure: req.body.bloodPressure,
    respiration: req.body.respiration,
    bloodGlucose: req.body.bloodGlucose,
    oxygenSaturation: req.body.oxygenSaturation,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new Treatment(details);
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
 * /api/Treatment:
 *   get:
 *     tags:
 *       - Treatment
 *     summary: Get all Treatment
 *     description: Retrieve a list of all Treatment
 *     responses:
 *       200:
 *         description: A list of Treatment
 */
router.get("/Treatment", (req, res) => {
  Treatment.find()
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
 * /api/TreatmentByUserId/{userId}:
 *   get:
 *     tags:
 *       - Treatment
 *     summary: Get a Treatment by ID
 *     description: Retrieve a Treatment's information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the Treatment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treatment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Treatment not found
 */
router.get("/TreatmentByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  Treatment.find({ userId: userId })
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
 * /api/TreatmentById/{_id}:
 *   get:
 *     tags:
 *       - Treatment
 *     summary: Get a Treatment by ID
 *     description: Retrieve a Treatment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the Treatment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treatment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Treatment not found
 */
router.get("/TreatmentById/:_id", (req, res) => {
  const _id = req.params._id;
  Treatment.find({ _id: _id })
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
 * /api/Treatment/{_id}:
 *   put:
 *     summary: Update a Treatment by ID
 *     description: Update a Treatment's information by ID
 *     tags:
 *       - Treatment
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the Treatment to update
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
 *         description: Treatment updated successfully
 *       400:
 *         description: Invalid Treatment ID supplied or invalid Treatment object
 *       404:
 *         description: Treatment not found
 */
router.put("/Treatment/:_id", (req, res) => {
  const _id = req.params._id;
  Treatment.findById(_id, (err, result) => {
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
 * /api/DeleteTreatmentById/{_id}:
 *   delete:
 *     tags:
 *       - Treatment
 *     summary: Delete a Treatment by ID
 *     description: Delete a Treatment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the Treatment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Treatment deleted successfully
 *       404:
 *         description: Treatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Treatment not found
 */
router.delete("/DeleteTreatmentById/:_id", (req, res) => {
  const _id = req.params._id;
  Treatment.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
