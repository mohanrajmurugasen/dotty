const express = require("express");
const cors = require("cors");
const router = express.Router();
const PrimaryAssessment = require("../Models/PrimaryAssessment");
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
 * /api/PrimaryAssessment:
 *   post:
 *     tags:
 *       - PrimaryAssessment
 *     summary: Create a new PrimaryAssessment
 *     description: Create a new PrimaryAssessment with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
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
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: PrimaryAssessment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/PrimaryAssessment", async (req, res) => {
  const details = {
    userId: req.body.userId,
    neroResponse: req.body.neroResponse,
    bodySystem: req.body.bodySystem,
    glasGlow: req.body.glasGlow,
    generalAssessment: req.body.generalAssessment,
    airway: req.body.airway,
    symptoms: req.body.symptoms,
  };

  let mails = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email}`,
    subject: `Subject`,
    text: `Text Message`,
  };

  const newDetails = new PrimaryAssessment(details);
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
 * /api/PrimaryAssessment:
 *   get:
 *     tags:
 *       - PrimaryAssessment
 *     summary: Get all PrimaryAssessment
 *     description: Retrieve a list of all PrimaryAssessment
 *     responses:
 *       200:
 *         description: A list of PrimaryAssessment
 */
router.get("/PrimaryAssessment", (req, res) => {
  PrimaryAssessment.find()
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
 * /api/PrimaryAssessmentByUserId/{userId}:
 *   get:
 *     tags:
 *       - PrimaryAssessment
 *     summary: Get a PrimaryAssessment by ID
 *     description: Retrieve a PrimaryAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the PrimaryAssessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PrimaryAssessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PrimaryAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PrimaryAssessment not found
 */
router.get("/PrimaryAssessmentByUserId/:userId", (req, res) => {
  const userId = req.params.userId;
  PrimaryAssessment.find({ userId: userId })
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
 * /api/PrimaryAssessmentById/{_id}:
 *   get:
 *     tags:
 *       - PrimaryAssessment
 *     summary: Get a PrimaryAssessment by ID
 *     description: Retrieve a PrimaryAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PrimaryAssessment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PrimaryAssessment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: PrimaryAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PrimaryAssessment not found
 */
router.get("/PrimaryAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  PrimaryAssessment.find({ _id: _id })
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
 * /api/PrimaryAssessment/{_id}:
 *   put:
 *     summary: Update a PrimaryAssessment by ID
 *     description: Update a PrimaryAssessment's information by ID
 *     tags:
 *       - PrimaryAssessment
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the PrimaryAssessment to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               neroResponse:
 *                 type: string
 *               bodySystem:
 *                 type: string
 *               glasGlow:
 *                 type: string
 *     responses:
 *       200:
 *         description: PrimaryAssessment updated successfully
 *       400:
 *         description: Invalid PrimaryAssessment ID supplied or invalid PrimaryAssessment object
 *       404:
 *         description: PrimaryAssessment not found
 */
router.put("/PrimaryAssessment/:_id", (req, res) => {
  const _id = req.params._id;
  PrimaryAssessment.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.neroResponse = req.body.neroResponse),
        (result.bodySystem = req.body.bodySystem),
        (result.glasGlow = req.body.glasGlow),
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
 * /api/DeletePrimaryAssessmentById/{_id}:
 *   delete:
 *     tags:
 *       - PrimaryAssessment
 *     summary: Delete a PrimaryAssessment by ID
 *     description: Delete a PrimaryAssessment's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the PrimaryAssessment to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: PrimaryAssessment deleted successfully
 *       404:
 *         description: PrimaryAssessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: PrimaryAssessment not found
 */
router.delete("/DeletePrimaryAssessmentById/:_id", (req, res) => {
  const _id = req.params._id;
  PrimaryAssessment.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
