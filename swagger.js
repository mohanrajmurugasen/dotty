const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EMS Web API",
      version: "1.0.0",
      description: "EMS API documentation",
    },
  },
  apis: [
    "./Routes/Requirement-Form-Details.js",
    "./Routes/Users.js",
    "./Schemas/Requirement-Form-Details.yaml",
    "./Schemas/Users.yaml",
  ],
  // apis: [
  //   "./Routes/*.js", "./Routes/*.yaml",
  // ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
