const mongoose = require("mongoose");

const PatientHistoryAssessmentsSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const PatientHistoryAssessmentsModel = mongoose.model(
  "PatientHistoryAssessment",
  PatientHistoryAssessmentsSchema
);

module.exports = PatientHistoryAssessmentsModel;
