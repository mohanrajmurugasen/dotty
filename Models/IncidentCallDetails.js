const mongoose = require("mongoose");

const IncidentCallDetailsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    serviceCode: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    dateOfIncident: {
      type: String,
      required: true,
    },
    timeOfIncident: {
      type: String,
      required: true,
    },
    incidentLocation_street: {
      type: String,
      required: true,
    },
    incidentLocation_city: {
      type: String,
      required: true,
    },
    incidentLocation_state: {
      type: String,
      required: true,
    },
    incidentLocation_postalCode: {
      type: String,
      required: true,
    },
    destinationDeterminant: {
      type: String,
      required: true,
    },
    graphicLocator: {
      type: String,
      required: true,
    },
    sceneLocationType: {
      type: String,
      required: true,
    },
    destinationFacility: {
      type: String,
      required: true,
    },
    sceneFacility: {
      type: String,
      required: true,
    },
    destinationLocationType: {
      type: String,
      required: true,
    },
    destinationLocation_street: {
      type: String,
      required: true,
    },
    destinationLocation_city: {
      type: String,
      required: true,
    },
    destinationLocation_state: {
      type: String,
      required: true,
    },
    destinationLocation_postalCode: {
      type: String,
      required: true,
    },
    responsibility: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    EMS: {
      type: String,
      required: true,
    },
    patientDisposition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const IncidentCallDetailsModel = mongoose.model(
  "IncidentCallDetail",
  IncidentCallDetailsSchema
);

module.exports = IncidentCallDetailsModel;
