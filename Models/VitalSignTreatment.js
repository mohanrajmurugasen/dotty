const mongoose = require("mongoose");

const VitalSignTreatmentsSchema = mongoose.Schema(
  {
    userId: {
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
    moisture: {
      type: String,
      required: true,
    },
    bloodPressure_systolic: {
      type: String,
      required: true,
    },
    bloodPressure_diastolic: {
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
    oxygenSaturation_preOxygen: {
      type: String,
      required: true,
    },
    oxygenSaturation_postOxygen: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VitalSignTreatmentsModel = mongoose.model(
  "VitalSignTreatment",
  VitalSignTreatmentsSchema
);

module.exports = VitalSignTreatmentsModel;
