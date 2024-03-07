const express = require("express");
const cors = require("cors");
const router = express.Router();
const VehicleCallDetails = require("../Models/VehicleCallDetails");
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
 * /api/VehicleCallDetails:
 *   post:
 *     tags:
 *       - VehicleCallDetails
 *     summary: Create a new VehicleCallDetails
 *     description: Create a new VehicleCallDetails with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               timeNotified:
 *                 type: string
 *               timeEnroute:
 *                 type: string
 *               timeAtScene:
 *                 type: string
 *               crewPatient:
 *                 type: string
 *               timeOutScene:
 *                 type: string
 *               timeAtDestination:
 *                 type: string
 *               available:
 *                 type: string
 *               backArea:
 *                 type: string
 *               responseToScene:
 *                 type: string
 *               responseFromScene:
 *                 type: string
 *               crewType:
 *                 type: string
 *               mileage:
 *                 type: string
 *               patientContact:
 *                 type: string
 *               destinationDeterminant:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               dateModified:
 *                 type: string
 *               email1:
 *                 type: string
 *               email2:
 *                 type: string
 *     responses:
 *       201:
 *         description: VehicleCallDetails created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/VehicleCallDetails", async (req, res) => {
  const details = {
    userId: req.body.userId,
    timeNotified: req.body.timeNotified,
    timeEnroute: req.body.timeEnroute,
    timeAtScene: req.body.timeAtScene,
    crewPatient: req.body.crewPatient,
    timeOutScene: req.body.timeOutScene,
    timeAtDestination: req.body.timeAtDestination,
    available: req.body.available,
    backArea: req.body.backArea,
    responseToScene: req.body.responseToScene,
    responseFromScene: req.body.responseFromScene,
    crewType: req.body.crewType,
    mileage: req.body.mileage,
    patientContact: req.body.patientContact,
    destinationDeterminant: req.body.destinationDeterminant,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    dateModified: req.body.dateModified,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email2}, ${req.body.email1}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new VehicleCallDetails(details);
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
 * /api/VehicleCallDetails:
 *   get:
 *     tags:
 *       - VehicleCallDetails
 *     summary: Get all VehicleCallDetails
 *     description: Retrieve a list of all VehicleCallDetails
 *     responses:
 *       200:
 *         description: A list of VehicleCallDetails
 */
router.get("/VehicleCallDetails", (req, res) => {
  VehicleCallDetails.find()
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
 * /api/VehicleCallDetailsById/{_id}:
 *   get:
 *     tags:
 *       - VehicleCallDetails
 *     summary: Get a VehicleCallDetails by ID
 *     description: Retrieve a VehicleCallDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the VehicleCallDetails to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: VehicleCallDetails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: VehicleCallDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: VehicleCallDetails not found
 */
router.get("/VehicleCallDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  VehicleCallDetails.find({ _id: _id })
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
 * /api/VehicleCallDetails/{_id}:
 *   put:
 *     summary: Update a VehicleCallDetails by ID
 *     description: Update a VehicleCallDetails's information by ID
 *     tags:
 *       - VehicleCallDetails
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the VehicleCallDetails to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timeNotified:
 *                 type: string
 *               timeEnroute:
 *                 type: string
 *     responses:
 *       200:
 *         description: VehicleCallDetails updated successfully
 *       400:
 *         description: Invalid VehicleCallDetails ID supplied or invalid VehicleCallDetails object
 *       404:
 *         description: VehicleCallDetails not found
 */
router.put("/VehicleCallDetails/:_id", (req, res) => {
  const _id = req.params._id;
  VehicleCallDetails.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.timeNotified = req.body.timeNotified),
        (result.timeEnroute = req.body.timeEnroute),
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
 * /api/DeleteVehicleCallDetailsById/{_id}:
 *   delete:
 *     tags:
 *       - VehicleCallDetails
 *     summary: Delete a VehicleCallDetails by ID
 *     description: Delete a VehicleCallDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the VehicleCallDetails to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: VehicleCallDetails deleted successfully
 *       404:
 *         description: VehicleCallDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: VehicleCallDetails not found
 */
router.delete("/DeleteVehicleCallDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  VehicleCallDetails.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
