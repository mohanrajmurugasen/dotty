const express = require("express");
const cors = require("cors");
const router = express.Router();
const userModel = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Validation = require("../Auth/Validation");

router.use(express.json());
router.use(cors());

process.env.SECRET_KEY = "Users";

/**
 * @swagger
 * /api/Users:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new Users
 *     description: Create a new Users with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: string
 *               userType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Users created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/Users", async (req, res) => {
  const users = {
    userName: req.body.userName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    status: "Active",
    userType: req.body.userType,
  };

  userModel.findOne({ email: req.body.email }, (err, result) => {
    if (!result) {
      bcrypt.hash(req.body.password, 10, async (errs, hash) => {
        users.password = hash;
        let token = jwt.sign(users.userName, process.env.SECRET_KEY);

        const newUser = new userModel(users);
        await newUser.save();

        res.status(200).send({
          message: "Success",
          data: { token, newUser },
        });
      });
    } else {
      res.status(200).send({
        message: "Email already exists!",
      });
    }
  });
});

/**
 * @swagger
 * /api/UsersLogin:
 *   post:
 *     summary: Logs in a user.
 *     description: Logs in a user with the provided email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JSON Web Token (JWT) used to authenticate future requests.
 */
router.post("/UsersLogin", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    console.log(result, password);
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        let token = jwt.sign(result.userName, process.env.SECRET_KEY);

        res.status(200).send({
          status: "Success",
          message: "Logged in successfully!",
          data: { result, token },
        });
      } else {
        res.send({
          status: "error",
          message: "Incorrect password !",
          data: [],
        });
      }
    } else {
      res.send({
        status: "error",
        message: "Incorrect email !",
        data: [],
      });
    }
  });
});

/**
 * @swagger
 * /api/Users:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/Users", (req, res) => {
  userModel
    .find()
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
 * /api/UsersById/{_id}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get a Users by ID
 *     description: Retrieve a Users's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the Users to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: Users not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users not found
 */
router.get("/UsersById/:_id", (req, res) => {
  const _id = req.params._id;
  userModel
    .find({ _id: _id })
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
 * /api/UsersByEmail/{email}:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get a Users by ID
 *     description: Retrieve a Users's information by their ID
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: ID of the Users to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: Users not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users not found
 */
router.get("/UsersByEmail/:email", (req, res) => {
  const email = req.params.email;
  userModel
    .find({ email: email })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) =>
      res.status(400).send({
        message: "Failure",
        data: err,
      })
    );
});

/**
 * @swagger
 * /api/UpdateUsersById/{_id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user's information by ID
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid user ID supplied or invalid user object
 *       404:
 *         description: User not found
 */
router.put("/UpdateUsersById/:_id", (req, res) => {
  const _id = req.params._id;
  userModel.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Please register first!",
        data: err,
      });
    } else {
      result.userName = req.body.userName;
      result.phone = req.body.phone;
      result.password = req.body.password;
      result.email = req.body.email;
      result.userType = req.body.userType;

      bcrypt.hash(req.body.password, 10, async (errs, hash) => {
        result.password = hash;
        let token = jwt.sign(result.userName, process.env.SECRET_KEY);

        result
          .save()
          .then((user) => {
            res.status(200).send({
              message: "Updated Successfully",
              data: user,
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: "Unable to update data please try again!",
              data: err,
            });
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
 * /api/DeleteUsersById/{_id}:
 *   delete:
 *     tags:
 *       - Authentication
 *     summary: Delete a Users by ID
 *     description: Delete a Users's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the Users to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Users deleted successfully
 *       404:
 *         description: Users not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users not found
 */
router.delete("/DeleteUsersById/:_id", (req, res) => {
  const _id = req.params._id;
  userModel.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
