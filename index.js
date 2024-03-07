const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require("./Routes/Users");
const Requirement_Form_Details = require("./Routes/Requirement-Form-Details");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://ROOTADMIN:7kSuB8yRilWhqvn2@dotty-test.llluezk.mongodb.net/EMS?retryWrites=true&w=majority&appName=dotty-test"
);

console.log("MongoDB connected!");

// Group the endpoints under their respective headings
const options = {
  swaggerOptions: {
    tagsSorter: "alpha",
    operationsSorter: "alpha",
  },
};

// Add Swagger middleware
app.use("/EMS-Swagger-API", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", Users);
app.use("/api", Requirement_Form_Details);

app.listen(PORT, () => {
  console.log(`Server Started successfully on PORT ${PORT}`);
});
