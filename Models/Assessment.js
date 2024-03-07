const mongoose = require("mongoose");

const AssessmentsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    dateOfInjury: {
      type: String,
      required: true,
    },
    timeOfInjury: {
      type: String,
      required: true,
    },
    coResponders: {
      type: String,
      required: true,
    },
    treatmentRendered: {
      type: String,
      required: true,
    },
    patientCondition: {
      type: String,
      required: true,
    },
    patientDisplacement: {
      type: String,
      required: true,
    },
    suspectedIntoxication: {
      type: String,
      required: true,
    },
    chiefComplaint: {
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

const AssessmentsModel = mongoose.model(
  "Assessment",
  AssessmentsSchema
);

module.exports = AssessmentsModel;
