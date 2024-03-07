const mongoose = require("mongoose");

const VehicleCallDetailsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    timeNotified: {
      type: String,
      required: true,
    },
    timeEnroute: {
      type: String,
      required: true,
    },
    timeAtScene: {
      type: String,
      required: true,
    },
    crewPatient: {
      type: String,
      required: true,
    },
    timeOutScene: {
      type: String,
      required: true,
    },
    timeAtDestination: {
      type: String,
      required: true,
    },
    available: {
      type: String,
      required: true,
    },
    backArea: {
      type: String,
      required: true,
    },
    responseToScene: {
      type: String,
      required: true,
    },
    responseFromScene: {
      type: String,
      required: true,
    },
    crewType: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    patientContact: {
      type: String,
      required: true,
    },
    destinationDeterminant: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: false,
    },
    endDate: {
      type: String,
      required: false,
    },
    dateModified: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const VehicleCallDetailsModel = mongoose.model(
  "VehicleCallDetail",
  VehicleCallDetailsSchema
);

module.exports = VehicleCallDetailsModel;
