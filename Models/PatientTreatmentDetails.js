const mongoose = require("mongoose");

const PatientTreatmentDetailsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    procedureStartTime: {
      type: String,
      required: true,
    },
    procedureType: {
      type: String,
      required: true,
    },
    procedureEndTime: {
      type: String,
      required: true,
    },
    deviceMethod: {
      type: String,
      required: true,
    },
    technicianID: {
      type: String,
      required: true,
    },
    deviceSize: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    successfull: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    totalTime: {
      type: String,
      required: true,
    },
    treatmentType: {
      type: String,
      required: true,
    },
    administrativeRoute: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PatientTreatmentDetailsModel = mongoose.model(
  "PatientTreatmentDetail",
  PatientTreatmentDetailsSchema
);

module.exports = PatientTreatmentDetailsModel;
