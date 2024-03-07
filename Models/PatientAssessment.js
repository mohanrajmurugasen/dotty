const mongoose = require("mongoose");

const PatientAssessmentsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    respiration: {
      type: String,
      required: true,
    },
    seizure: {
      type: String,
      required: true,
    },
    toxicExposure: {
      type: String,
      required: true,
    },
    cardiacArrest: {
      type: String,
      required: true,
    },
    chestPain: {
      type: String,
      required: true,
    },
    neonatal: {
      type: String,
      required: true,
    },
    obstetric: {
      type: String,
      required: true,
    },
    trauma: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PatientAssessmentsModel = mongoose.model(
  "PatientAssessment",
  PatientAssessmentsSchema
);

module.exports = PatientAssessmentsModel;
