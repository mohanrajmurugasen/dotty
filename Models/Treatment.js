const mongoose = require("mongoose");

const TreatmentsSchema = mongoose.Schema(
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
    assessmentTime: {
      type: String,
      required: true,
    },
    consciousnessLevel: {
      type: String,
      required: true,
    },
    pulseRate: {
      type: String,
      required: true,
    },
    siteOfPulseCheck: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
    siteOfTemperatureCheck: {
      type: String,
      required: true,
    },
    skinColor: {
      type: String,
      required: true,
    },
    skinCondition: {
      type: String,
      required: true,
    },
    moisture: {
      type: String,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    respiration: {
      type: String,
      required: true,
    },
    bloodGlucose: {
      type: String,
      required: true,
    },
    oxygenSaturation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TreatmentsModel = mongoose.model(
  "Treatment",
  TreatmentsSchema
);

module.exports = TreatmentsModel;
