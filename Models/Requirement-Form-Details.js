const mongoose = require("mongoose");

const RequirementFormDetailsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    serviceCode: {
      type: String,
      required: false,
    },
    serviceType: {
      type: String,
      required: false,
    },
    dateOfIncident: {
      type: String,
      required: false,
    },
    timeOfIncident: {
      type: String,
      required: false,
    },
    incidentLocation_street: {
      type: String,
      required: false,
    },
    incidentLocation_city: {
      type: String,
      required: false,
    },
    incidentLocation_state: {
      type: String,
      required: false,
    },
    incidentLocation_postalCode: {
      type: String,
      required: false,
    },
    incident_destinationDeterminant: {
      type: String,
      required: false,
    },
    graphicLocator: {
      type: String,
      required: false,
    },
    sceneLocationType: {
      type: String,
      required: false,
    },
    destinationFacility: {
      type: String,
      required: false,
    },
    sceneFacility: {
      type: String,
      required: false,
    },
    destinationLocationType: {
      type: String,
      required: false,
    },
    destinationLocation_street: {
      type: String,
      required: false,
    },
    destinationLocation_city: {
      type: String,
      required: false,
    },
    destinationLocation_state: {
      type: String,
      required: false,
    },
    destinationLocation_postalCode: {
      type: String,
      required: false,
    },
    responsibility: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    EMS: {
      type: String,
      required: false,
    },
    patientDisposition: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    sureName: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    telePhone: {
      type: String,
      required: false,
    },
    DOB: {
      type: String,
      required: false,
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
      required: false,
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
      required: false,
    },
    hospitalName: {
      type: String,
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
    timeNotified: {
      type: String,
      required: false,
    },
    timeEnroute: {
      type: String,
      required: false,
    },
    timeAtScene: {
      type: String,
      required: false,
    },
    crewPatient: {
      type: String,
      required: false,
    },
    timeOutScene: {
      type: String,
      required: false,
    },
    timeAtDestination: {
      type: String,
      required: false,
    },
    available: {
      type: String,
      required: false,
    },
    backArea: {
      type: String,
      required: false,
    },
    responseToScene: {
      type: String,
      required: false,
    },
    responseFromScene: {
      type: String,
      required: false,
    },
    crewType: {
      type: String,
      required: false,
    },
    mileage: {
      type: String,
      required: false,
    },
    patientContact: {
      type: String,
      required: false,
    },
    vehicle_destinationDeterminant: {
      type: String,
      required: false,
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
    // assess
    dateOfInjury: {
      type: String,
      required: false,
    },
    timeOfInjury: {
      type: String,
      required: false,
    },
    coResponders: {
      type: String,
      required: false,
    },
    treatmentRendered: {
      type: String,
      required: false,
    },
    patientCondition: {
      type: String,
      required: false,
    },
    patientDisplacement: {
      type: String,
      required: false,
    },
    suspectedIntoxication: {
      type: String,
      required: false,
    },
    chiefComplaint: {
      type: String,
      required: false,
    },
    neroResponse: {
      type: String,
      required: false,
    },
    bodySystem: {
      type: String,
      required: false,
    },
    glasGlow: {
      type: String,
      required: false,
    },
    generalAssessment: {
      type: String,
      required: false,
    },
    airway: {
      type: String,
      required: false,
    },
    symptoms: {
      type: String,
      required: false,
    },
    respiration: {
      type: String,
      required: false,
    },
    seizure: {
      type: String,
      required: false,
    },
    toxicExposure: {
      type: String,
      required: false,
    },
    cardiacArrest: {
      type: String,
      required: false,
    },
    chestPain: {
      type: String,
      required: false,
    },
    neonatal: {
      type: String,
      required: false,
    },
    obstetric: {
      type: String,
      required: false,
    },
    trauma: {
      type: String,
      required: false,
    },
    // treatment
    procedureStartTime: {
      type: String,
      required: false,
    },
    procedureType: {
      type: String,
      required: false,
    },
    procedureEndTime: {
      type: String,
      required: false,
    },
    deviceMethod: {
      type: String,
      required: false,
    },
    technicianID: {
      type: String,
      required: false,
    },
    deviceSize: {
      type: String,
      required: false,
    },
    outcome: {
      type: String,
      required: false,
    },
    successfull: {
      type: String,
      required: false,
    },
    treatment: {
      type: String,
      required: false,
    },
    totalTime: {
      type: String,
      required: false,
    },
    treatmentType: {
      type: String,
      required: false,
    },
    administrativeRoute: {
      type: String,
      required: false,
    },
    assessmentTime: {
      type: String,
      required: false,
    },
    consciousnessLevel: {
      type: String,
      required: false,
    },
    pulseRate: {
      type: String,
      required: false,
    },
    siteOfPulseCheck: {
      type: String,
      required: false,
    },
    temperature: {
      type: String,
      required: false,
    },
    siteOfTemperatureCheck: {
      type: String,
      required: false,
    },
    skinColor: {
      type: String,
      required: false,
    },
    skinCondition: {
      type: String,
      required: false,
    },
    moisture: {
      type: String,
      required: false,
    },
    bloodPressure: {
      type: String,
      required: false,
    },
    treatment_respiration: {
      type: String,
      required: false,
    },
    bloodGlucose: {
      type: String,
      required: false,
    },
    oxygenSaturation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const RequirementFormDetailsModel = mongoose.model("RequirementFormDetail", RequirementFormDetailsSchema);

module.exports = RequirementFormDetailsModel;
