const mongoose = require("mongoose");

const PrimaryAssessmentsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    neroResponse: {
      type: String,
      required: true,
    },
    bodySystem: {
      type: String,
      required: true,
    },
    glasGlow: {
      type: String,
      required: true,
    },
    generalAssessment: {
      type: String,
      required: true,
    },
    airway: {
      type: String,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PrimaryAssessmentsModel = mongoose.model(
  "PrimaryAssessment",
  PrimaryAssessmentsSchema
);

module.exports = PrimaryAssessmentsModel;
