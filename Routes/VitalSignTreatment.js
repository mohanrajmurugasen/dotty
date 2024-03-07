const express = require("express");
const cors = require("cors");
const router = express.Router();
const VitalSignTreatment = require("../Models/VitalSignTreatment");
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
 * /api/VitalSignTreatment:
 *   post:
 *     tags:
 *       - VitalSignTreatment
 *     summary: Create a new VitalSignTreatment
 *     description: Create a new VitalSignTreatment with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
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
 *               moisture:
 *                 type: string
 *               bloodPressure_diastolic:
 *                 type: object
 *               bloodPressure_systolic:
 *                 type: object
 *               respiration:
 *                 type: string
 *               bloodGlucose:
 *                 type: string
 *               oxygenSaturation_preOxygen:
 *                 type: object
 *               oxygenSaturation1:
 *                 type: object
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: VitalSignTreatment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/VitalSignTreatment", async (req, res) => {
  const details = {
    userId: req.body.userId,
    assessmentTime: req.body.assessmentTime,
    consciousnessLevel: req.body.consciousnessLevel,
    pulseRate: req.body.pulseRate,
    siteOfPulseCheck: req.body.siteOfPulseCheck,
    temperature: req.body.temperature,
    siteOfTemperatureCheck: req.body.siteOfTemperatureCheck,
    skinColor: req.body.skinColor,
    moisture: req.body.moisture,
    bloodPressure_diastolic: req.body.bloodPressure_diastolic,
    bloodPressure_systolic: req.body.bloodPressure_systolic,
    respiration: req.body.respiration,
    bloodGlucose: req.body.bloodGlucose,
    oxygenSaturation_preOxygen: req.body.oxygenSaturation_preOxygen,
    oxygenSaturation_postOxygen: req.body.oxygenSaturation_postOxygen,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new VitalSignTreatment(details);
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
 * /api/VitalSignTreatment:
 *   get:
 *     tags:
 *       - VitalSignTreatment
 *     summary: Get all VitalSignTreatment
 *     description: Retrieve a list of all VitalSignTreatment
 *     responses:
 *       200:
 *         description: A list of VitalSignTreatment
 */
router.get("/VitalSignTreatment", (req, res) => {
  VitalSignTreatment.find()
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
 * /api/VitalSignTreatmentById/{_id}:
 *   get:
 *     tags:
 *       - VitalSignTreatment
 *     summary: Get a VitalSignTreatment by ID
 *     description: Retrieve a VitalSignTreatment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the VitalSignTreatment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: VitalSignTreatment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: VitalSignTreatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: VitalSignTreatment not found
 */
router.get("/VitalSignTreatmentById/:_id", (req, res) => {
  const _id = req.params._id;
  VitalSignTreatment.find({ _id: _id })
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
 * /api/VitalSignTreatment/{_id}:
 *   put:
 *     summary: Update a VitalSignTreatment by ID
 *     description: Update a VitalSignTreatment's information by ID
 *     tags:
 *       - VitalSignTreatment
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the VitalSignTreatment to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skinColor:
 *                 type: string
 *               moisture:
 *                 type: string
 *     responses:
 *       200:
 *         description: VitalSignTreatment updated successfully
 *       400:
 *         description: Invalid VitalSignTreatment ID supplied or invalid VitalSignTreatment object
 *       404:
 *         description: VitalSignTreatment not found
 */
router.put("/VitalSignTreatment/:_id", (req, res) => {
  const _id = req.params._id;
  VitalSignTreatment.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.dateOfIncident = req.body.dateOfIncident),
        (result.timeOfIncident = req.body.timeOfIncident),
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
 * /api/DeleteVitalSignTreatmentById/{_id}:
 *   delete:
 *     tags:
 *       - VitalSignTreatment
 *     summary: Delete a VitalSignTreatment by ID
 *     description: Delete a VitalSignTreatment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the VitalSignTreatment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: VitalSignTreatment deleted successfully
 *       404:
 *         description: VitalSignTreatment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: VitalSignTreatment not found
 */
router.delete("/DeleteVitalSignTreatmentById/:_id", (req, res) => {
  const _id = req.params._id;
  VitalSignTreatment.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
