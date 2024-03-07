const mongoose = require("mongoose");

const PatientCallDetailsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    sureName: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    telePhone: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    aadhar: {
      type: String,
      required: false,
    },
    medicalInsurance: {
      type: String,
      required: true,
    },
    typeOfInsurance: {
      type: String,
      required: false,
    },
    governmentInsurance_insuranceId: {
      type: String,
      required: false,
    },
    governmentInsurance_coverageAmount: {
      type: String,
      required: false,
    },
    governmentInsurance_benefits: {
      type: String,
      required: false,
    },
    privateInsurance_insuranceId: {
      type: String,
      required: false,
    },
    privateInsurance_benefits: {
      type: String,
      required: false,
    },
    hospitalChart: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PatientCallDetailsModel = mongoose.model(
  "PatientCallDetail",
  PatientCallDetailsSchema
);

module.exports = PatientCallDetailsModel;
