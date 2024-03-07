const express = require("express");
const cors = require("cors");
const router = express.Router();
const RequirementFormDetails = require("../Models/Requirement-Form-Details");
const nodemailer = require("nodemailer");

router.use(express.json());
router.use(cors());

const secretKey = process.env.SECRET_KEY;

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test@dev-dottycare.org",
    pass: "devtest123!",
  },
});

/**
 * @swagger
 * /api/RequirementFormDetails:
 *   post:
 *     tags:
 *       - RequirementFormDetails
 *     summary: Create a new RequirementFormDetails
 *     description: Create a new RequirementFormDetails with the given information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               serviceCode:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               dateOfIncident:
 *                 type: string
 *               timeOfIncident:
 *                 type: string
 *               incidentLocation_street:
 *                 type: string
 *               incidentLocation_city:
 *                 type: string
 *               incidentLocation_state:
 *                 type: string
 *               incidentLocation_postalCode:
 *                 type: string
 *               incident_destinationDeterminant:
 *                 type: string
 *               graphicLocator:
 *                 type: string
 *               sceneLocationType:
 *                 type: string
 *               destinationFacility:
 *                 type: string
 *               sceneFacility:
 *                 type: string
 *               destinationLocationType:
 *                 type: string
 *               destinationLocation_street:
 *                 type: string
 *               destinationLocation_city:
 *                 type: string
 *               destinationLocation_state:
 *                 type: string
 *               destinationLocation_postalCode:
 *                 type: string
 *               responsibility:
 *                 type: string
 *               number:
 *                 type: string
 *               EMS:
 *                 type: string
 *               patientDisposition:
 *                 type: string
 *               firstName:
 *                 type: string
 *               sureName:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               telePhone:
 *                 type: string
 *               DOB:
 *                 type: string
 *               age:
 *                 type: string
 *               gender:
 *                 type: string
 *               aadhar:
 *                 type: string
 *               medicalInsurance:
 *                 type: string
 *               typeOfInsurance:
 *                 type: string
 *               governmentInsurance_insuranceId:
 *                 type: string
 *               governmentInsurance_coverageAmount:
 *                 type: string
 *               governmentInsurance_benefits:
 *                 type: string
 *               privateInsurance_insuranceId:
 *                 type: string
 *               privateInsurance_benefits:
 *                 type: string
 *               hospitalChart:
 *                 type: string
 *               hospitalName:
 *                 type: string
 *               comments:
 *                 type: string
 *               timeNotified:
 *                 type: string
 *               timeEnroute:
 *                 type: string
 *               timeAtScene:
 *                 type: string
 *               crewPatient:
 *                 type: string
 *               timeOutScene:
 *                 type: string
 *               timeAtDestination:
 *                 type: string
 *               available:
 *                 type: string
 *               backArea:
 *                 type: string
 *               responseToScene:
 *                 type: string
 *               responseFromScene:
 *                 type: string
 *               crewType:
 *                 type: string
 *               mileage:
 *                 type: string
 *               patientContact:
 *                 type: string
 *               vehicle_destinationDeterminant:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               dateModified:
 *                 type: string
 *               dateOfInjury:
 *                 type: string
 *               timeOfInjury:
 *                 type: string
 *               coResponders:
 *                 type: string
 *               treatmentRendered:
 *                 type: string
 *               patientCondition:
 *                 type: string
 *               patientDisplacement:
 *                 type: string
 *               suspectedIntoxication:
 *                 type: string
 *               chiefComplaint:
 *                 type: string
 *               neroResponse:
 *                 type: string
 *               bodySystem:
 *                 type: string
 *               glasGlow:
 *                 type: string
 *               generalAssessment:
 *                 type: string
 *               airway:
 *                 type: string
 *               symptoms:
 *                 type: string
 *               respiration:
 *                 type: string
 *               seizure:
 *                 type: string
 *               toxicExposure:
 *                 type: string
 *               cardiacArrest:
 *                 type: string
 *               chestPain:
 *                 type: string
 *               neonatal:
 *                 type: string
 *               obstetric:
 *                 type: string
 *               trauma:
 *                 type: string
 *               procedureStartTime:
 *                 type: string
 *               procedureType:
 *                 type: string
 *               procedureEndTime:
 *                 type: string
 *               deviceMethod:
 *                 type: string
 *               technicianID:
 *                 type: string
 *               deviceSize:
 *                 type: string
 *               outcome:
 *                 type: string
 *               successfull:
 *                 type: string
 *               treatment:
 *                 type: string
 *               totalTime:
 *                 type: string
 *               treatmentType:
 *                 type: string
 *               administrativeRoute:
 *                 type: string
 *               assessmentTime:
 *                 type: string
 *               consciousnessLevel:
 *                 type: string
 *               pulseRate:
 *                 type: string
 *               siteOfPulseCheck:
 *                 type: string
 *               temperature:
 *                 type: string
 *               siteOfTemperatureCheck:
 *                 type: string
 *               skinColor:
 *                 type: string
 *               skinCondition:
 *                 type: string
 *               moisture:
 *                 type: string
 *               bloodPressure:
 *                 type: string
 *               treatment_respiration:
 *                 type: string
 *               bloodGlucose:
 *                 type: string
 *               oxygenSaturation:
 *                 type: string
 *               email1:
 *                 type: string
 *               email2:
 *                 type: string
 *     responses:
 *       201:
 *         description: RequirementFormDetails created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/RequirementFormDetails", async (req, res) => {
  const calls = {
    serviceCode: req.body.serviceCode,
    serviceType: req.body.serviceType,
    dateOfIncident: req.body.dateOfIncident,
    timeOfIncident: req.body.timeOfIncident,
    incidentLocation_street: req.body.incidentLocation_street,
    incidentLocation_city: req.body.incidentLocation_city,
    incidentLocation_state: req.body.incidentLocation_state,
    incidentLocation_postalCode: req.body.incidentLocation_postalCode,
    incident_destinationDeterminant: req.body.incident_destinationDeterminant,
    graphicLocator: req.body.graphicLocator,
    sceneLocationType: req.body.sceneLocationType,
    destinationFacility: req.body.destinationFacility,
    sceneFacility: req.body.sceneFacility,
    destinationLocationType: req.body.destinationLocationType,
    destinationLocation_street: req.body.destinationLocation_street,
    destinationLocation_city: req.body.destinationLocation_city,
    destinationLocation_state: req.body.destinationLocation_state,
    destinationLocation_postalCode: req.body.destinationLocation_postalCode,
    responsibility: req.body.responsibility,
    number: req.body.number,
    EMS: req.body.EMS,
    patientDisposition: req.body.patientDisposition,
    firstName: req.body.firstName,
    sureName: req.body.sureName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    postalCode: req.body.postalCode,
    telePhone: req.body.telePhone,
    DOB: req.body.DOB,
    age: req.body.age,
    gender: req.body.gender,
    aadhar: req.body.aadhar,
    medicalInsurance: req.body.medicalInsurance,
    typeOfInsurance: req.body.typeOfInsurance,
    governmentInsurance_insuranceId: req.body.governmentInsurance_insuranceId,
    governmentInsurance_coverageAmount:
      req.body.governmentInsurance_coverageAmount,
    governmentInsurance_benefits: req.body.governmentInsurance_benefits,
    privateInsurance_insuranceId: req.body.privateInsurance_insuranceId,
    privateInsurance_benefits: req.body.privateInsurance_benefits,
    hospitalChart: req.body.hospitalChart,
    hospitalName: req.body.hospitalName,
    comments: req.body.comments,
    timeNotified: req.body.timeNotified,
    timeEnroute: req.body.timeEnroute,
    timeAtScene: req.body.timeAtScene,
    crewPatient: req.body.crewPatient,
    timeOutScene: req.body.timeOutScene,
    timeAtDestination: req.body.timeAtDestination,
    available: req.body.available,
    backArea: req.body.backArea,
    responseToScene: req.body.responseToScene,
    responseFromScene: req.body.responseFromScene,
    crewType: req.body.crewType,
    mileage: req.body.mileage,
    patientContact: req.body.patientContact,
    vehicle_destinationDeterminant: req.body.vehicle_destinationDeterminant,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    dateModified: req.body.dateModified,
  };
  const assess = {
    dateOfInjury: req.body.dateOfInjury,
    timeOfInjury: req.body.timeOfInjury,
    coResponders: req.body.coResponders,
    treatmentRendered: req.body.treatmentRendered,
    patientCondition: req.body.patientCondition,
    patientDisplacement: req.body.patientDisplacement,
    suspectedIntoxication: req.body.suspectedIntoxication,
    chiefComplaint: req.body.chiefComplaint,
    neroResponse: req.body.neroResponse,
    bodySystem: req.body.bodySystem,
    glasGlow: req.body.glasGlow,
    generalAssessment: req.body.generalAssessment,
    airway: req.body.airway,
    symptoms: req.body.symptoms,
    respiration: req.body.respiration,
    seizure: req.body.seizure,
    toxicExposure: req.body.toxicExposure,
    cardiacArrest: req.body.cardiacArrest,
    chestPain: req.body.chestPain,
    neonatal: req.body.neonatal,
    obstetric: req.body.obstetric,
    trauma: req.body.trauma,
  };
  const tret = {
    procedureStartTime: req.body.procedureStartTime,
    procedureType: req.body.procedureType,
    procedureEndTime: req.body.procedureEndTime,
    deviceMethod: req.body.deviceMethod,
    technicianID: req.body.technicianID,
    deviceSize: req.body.deviceSize,
    outcome: req.body.outcome,
    successfull: req.body.successfull,
    treatment: req.body.treatment,
    totalTime: req.body.totalTime,
    treatmentType: req.body.treatmentType,
    administrativeRoute: req.body.administrativeRoute,
    assessmentTime: req.body.assessmentTime,
    consciousnessLevel: req.body.consciousnessLevel,
    pulseRate: req.body.pulseRate,
    siteOfPulseCheck: req.body.siteOfPulseCheck,
    temperature: req.body.temperature,
    siteOfTemperatureCheck: req.body.siteOfTemperatureCheck,
    skinColor: req.body.skinColor,
    skinCondition: req.body.skinCondition,
    moisture: req.body.moisture,
    bloodPressure: req.body.bloodPressure,
    treatment_respiration: req.body.treatment_respiration,
    bloodGlucose: req.body.bloodGlucose,
    oxygenSaturation: req.body.oxygenSaturation,
  };
  const details = {
    userId: req.body.userId,
    ...calls,
    ...assess,
    ...tret,
  };

  let mails1 = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email1}`,
    subject: `Form Submission`,
    text: `Text Message`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    </style>
    </head>
    <body>

    <h2>Requirement Form Submission.</h2>

    <h5>Call Details</h5>
    <table style="width:100%">
      <tr>
        <td style="width:50%;padding: 5px"><b>ServiceCode:</b>  ${calls.serviceCode}</td>
        <td style="width:50%;padding: 5px"><b>ServiceType:</b>  ${calls.serviceType}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>DateOfIncident:</b>  ${calls.dateOfIncident}</td>
        <td style="width:50%;padding: 5px"><b>TimeOfIncident:</b>  ${calls.timeOfIncident}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>Street:</b>  ${calls.incidentLocation_street}</td>
        <td style="width:50%;padding: 5px"><b>City:</b>  ${calls.incidentLocation_city}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>State:</b>  ${calls.incidentLocation_state}</td>
        <td style="width:50%;padding: 5px"><b>PostalCode:</b>  ${calls.incidentLocation_postalCode}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>DestinationDeterminant:</b>  ${calls.incident_destinationDeterminant}</td>
        <td style="width:50%;padding: 5px"><b>GraphicLocator:</b>  ${calls.graphicLocator}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>SceneLocationType:</b>  ${calls.sceneLocationType}</td>
        <td style="width:50%;padding: 5px"><b>DestinationFacility:</b>  ${calls.destinationFacility}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>SceneFacility:</b>  ${calls.sceneFacility}</td>
        <td style="width:50%;padding: 5px"><b>DestinationLocationType:</b>  ${calls.destinationLocationType}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>Responsibility:</b>  ${calls.responsibility}</td>
        <td style="width:50%;padding: 5px"><b>ServicePaymentNumber:</b>  ${calls.number}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>EMS:</b>  ${calls.EMS}</td>
        <td style="width:50%;padding: 5px"><b>PatientDisposition:</b>  ${calls.patientDisposition}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>FirstName:</b>  ${calls.firstName}</td>
        <td style="width:50%;padding: 5px"><b>SureName:</b>  ${calls.sureName}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>TelePhone:</b>  ${calls.telePhone}</td>
        <td style="width:50%;padding: 5px"><b>DOB:</b>  ${calls.DOB}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>Age:</b>  ${calls.age}</td>
        <td style="width:50%;padding: 5px"><b>Gender:</b>  ${calls.gender}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>aadhar:</b>  ${calls.aadhar}</td>
        <td style="width:50%;padding: 5px"><b>medicalInsurance:</b>  ${calls.medicalInsurance}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>typeOfInsurance:</b>  ${calls.typeOfInsurance}</td>
        <td style="width:50%;padding: 5px"><b>governmentInsurance_insuranceId:</b>  ${calls.governmentInsurance_insuranceId}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>governmentInsurance_coverageAmount:</b>  ${calls.governmentInsurance_coverageAmount}</td>
        <td style="width:50%;padding: 5px"><b>governmentInsurance_benefits:</b>  ${calls.governmentInsurance_benefits}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>privateInsurance_insuranceId:</b>  ${calls.privateInsurance_insuranceId}</td>
        <td style="width:50%;padding: 5px"><b>privateInsurance_benefits:</b>  ${calls.privateInsurance_benefits}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>hospitalChart:</b>  ${calls.hospitalChart}</td>
        <td style="width:50%;padding: 5px"><b>hospitalName:</b>  ${calls.hospitalName}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>comments:</b>  ${calls.comments}</td>
        <td style="width:50%;padding: 5px"><b>timeNotified:</b>  ${calls.timeNotified}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>comments:</b>  ${calls.comments}</td>
        <td style="width:50%;padding: 5px"><b>timeNotified:</b>  ${calls.timeNotified}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>timeEnroute:</b>  ${calls.timeEnroute}</td>
        <td style="width:50%;padding: 5px"><b>timeAtScene:</b>  ${calls.timeAtScene}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>crewPatient:</b>  ${calls.crewPatient}</td>
        <td style="width:50%;padding: 5px"><b>timeOutScene:</b>  ${calls.timeOutScene}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>timeAtDestination:</b>  ${calls.timeAtDestination}</td>
        <td style="width:50%;padding: 5px"><b>available:</b>  ${calls.available}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>backArea:</b>  ${calls.backArea}</td>
        <td style="width:50%;padding: 5px"><b>responseToScene:</b>  ${calls.responseToScene}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>responseFromScene:</b>  ${calls.responseFromScene}</td>
        <td style="width:50%;padding: 5px"><b>crewType:</b>  ${calls.crewType}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>mileage:</b>  ${calls.mileage}</td>
        <td style="width:50%;padding: 5px"><b>patientContact:</b>  ${calls.patientContact}</td>
      </tr>
    </table>
    <br>
    <h5>Assessments Details</h5>
    <table style="width:100%">
      <tr>
        <td style="width:50%;padding: 5px"><b>dateOfInjury:</b>  ${assess.dateOfInjury}</td>
        <td style="width:50%;padding: 5px"><b>timeOfInjury:</b>  ${assess.timeOfInjury}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>coResponders:</b>  ${assess.coResponders}</td>
        <td style="width:50%;padding: 5px"><b>treatmentRendered:</b>  ${assess.treatmentRendered}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>patientCondition:</b>  ${assess.patientCondition}</td>
        <td style="width:50%;padding: 5px"><b>patientDisplacement:</b>  ${assess.patientDisplacement}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>suspectedIntoxication:</b>  ${assess.suspectedIntoxication}</td>
        <td style="width:50%;padding: 5px"><b>chiefComplaint:</b>  ${assess.chiefComplaint}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>neroResponse:</b>  ${assess.neroResponse}</td>
        <td style="width:50%;padding: 5px"><b>bodySystem:</b>  ${assess.bodySystem}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>glasGlow:</b>  ${assess.glasGlow}</td>
        <td style="width:50%;padding: 5px"><b>generalAssessment:</b>  ${assess.generalAssessment}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>airway:</b>  ${assess.airway}</td>
        <td style="width:50%;padding: 5px"><b>symptoms:</b>  ${assess.symptoms}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>respiration:</b>  ${assess.respiration}</td>
        <td style="width:50%;padding: 5px"><b>seizure:</b>  ${assess.seizure}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>toxicExposure:</b>  ${assess.toxicExposure}</td>
        <td style="width:50%;padding: 5px"><b>cardiacArrest:</b>  ${assess.cardiacArrest}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>chestPain:</b>  ${assess.chestPain}</td>
        <td style="width:50%;padding: 5px"><b>neonatal:</b>  ${assess.neonatal}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>obstetric:</b>  ${assess.obstetric}</td>
        <td style="width:50%;padding: 5px"><b>trauma:</b>  ${assess.trauma}</td>
      </tr>
    </table>
    <br>
    <h5>Treatments</h5>
    <table style="width:100%">
      <tr>
        <td style="width:50%;padding: 5px"><b>procedureStartTime:</b>  ${tret.procedureStartTime}</td>
        <td style="width:50%;padding: 5px"><b>procedureType:</b>  ${tret.procedureType}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>procedureEndTime:</b>  ${tret.procedureEndTime}</td>
        <td style="width:50%;padding: 5px"><b>deviceMethod:</b>  ${tret.deviceMethod}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>technicianID:</b>  ${tret.technicianID}</td>
        <td style="width:50%;padding: 5px"><b>deviceSize:</b>  ${tret.deviceSize}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>outcome:</b>  ${tret.outcome}</td>
        <td style="width:50%;padding: 5px"><b>successfull:</b>  ${tret.successfull}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>treatment:</b>  ${tret.treatment}</td>
        <td style="width:50%;padding: 5px"><b>totalTime:</b>  ${tret.totalTime}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>treatmentType:</b>  ${tret.treatmentType}</td>
        <td style="width:50%;padding: 5px"><b>administrativeRoute:</b>  ${tret.administrativeRoute}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>assessmentTime:</b>  ${tret.assessmentTime}</td>
        <td style="width:50%;padding: 5px"><b>consciousnessLevel:</b>  ${tret.consciousnessLevel}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>pulseRate:</b>  ${tret.pulseRate}</td>
        <td style="width:50%;padding: 5px"><b>siteOfPulseCheck:</b>  ${tret.siteOfPulseCheck}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>temperature:</b>  ${tret.temperature}</td>
        <td style="width:50%;padding: 5px"><b>siteOfTemperatureCheck:</b>  ${tret.siteOfTemperatureCheck}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>skinColor:</b>  ${tret.skinColor}</td>
        <td style="width:50%;padding: 5px"><b>skinCondition:</b>  ${tret.skinCondition}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>moisture:</b>  ${tret.moisture}</td>
        <td style="width:50%;padding: 5px"><b>bloodPressure:</b>  ${tret.bloodPressure}</td>
      </tr>
      <tr>
        <td style="width:50%;padding: 5px"><b>bloodGlucose:</b>  ${tret.bloodGlucose}</td>
        <td style="width:50%;padding: 5px"><b>oxygenSaturation:</b>  ${tret.oxygenSaturation}</td>
      </tr>
    </table>

    <p>Thank you,</p>

    </body>
  </html>
              `,
  };

  let mails2 = {
    from: "test@dev-dottycare.org",
    to: `${req.body.email2}`,
    subject: `Form Submission`,
    text: `Text Message`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      </style>
      </head>
      <body>
  
      <h2>Requirement Form Submission.</h2>
  
      <h5>Call Details</h5>
      <table style="width:100%">
        <tr>
          <td style="width:50%;padding: 5px"><b>ServiceCode:</b>  ${calls.serviceCode}</td>
          <td style="width:50%;padding: 5px"><b>ServiceType:</b>  ${calls.serviceType}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>DateOfIncident:</b>  ${calls.dateOfIncident}</td>
          <td style="width:50%;padding: 5px"><b>TimeOfIncident:</b>  ${calls.timeOfIncident}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>Street:</b>  ${calls.incidentLocation_street}</td>
          <td style="width:50%;padding: 5px"><b>City:</b>  ${calls.incidentLocation_city}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>State:</b>  ${calls.incidentLocation_state}</td>
          <td style="width:50%;padding: 5px"><b>PostalCode:</b>  ${calls.incidentLocation_postalCode}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>DestinationDeterminant:</b>  ${calls.incident_destinationDeterminant}</td>
          <td style="width:50%;padding: 5px"><b>GraphicLocator:</b>  ${calls.graphicLocator}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>SceneLocationType:</b>  ${calls.sceneLocationType}</td>
          <td style="width:50%;padding: 5px"><b>DestinationFacility:</b>  ${calls.destinationFacility}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>SceneFacility:</b>  ${calls.sceneFacility}</td>
          <td style="width:50%;padding: 5px"><b>DestinationLocationType:</b>  ${calls.destinationLocationType}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>Responsibility:</b>  ${calls.responsibility}</td>
          <td style="width:50%;padding: 5px"><b>ServicePaymentNumber:</b>  ${calls.number}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>EMS:</b>  ${calls.EMS}</td>
          <td style="width:50%;padding: 5px"><b>PatientDisposition:</b>  ${calls.patientDisposition}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>FirstName:</b>  ${calls.firstName}</td>
          <td style="width:50%;padding: 5px"><b>SureName:</b>  ${calls.sureName}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>TelePhone:</b>  ${calls.telePhone}</td>
          <td style="width:50%;padding: 5px"><b>DOB:</b>  ${calls.DOB}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>Age:</b>  ${calls.age}</td>
          <td style="width:50%;padding: 5px"><b>Gender:</b>  ${calls.gender}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>aadhar:</b>  ${calls.aadhar}</td>
          <td style="width:50%;padding: 5px"><b>medicalInsurance:</b>  ${calls.medicalInsurance}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>typeOfInsurance:</b>  ${calls.typeOfInsurance}</td>
          <td style="width:50%;padding: 5px"><b>governmentInsurance_insuranceId:</b>  ${calls.governmentInsurance_insuranceId}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>governmentInsurance_coverageAmount:</b>  ${calls.governmentInsurance_coverageAmount}</td>
          <td style="width:50%;padding: 5px"><b>governmentInsurance_benefits:</b>  ${calls.governmentInsurance_benefits}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>privateInsurance_insuranceId:</b>  ${calls.privateInsurance_insuranceId}</td>
          <td style="width:50%;padding: 5px"><b>privateInsurance_benefits:</b>  ${calls.privateInsurance_benefits}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>hospitalChart:</b>  ${calls.hospitalChart}</td>
          <td style="width:50%;padding: 5px"><b>hospitalName:</b>  ${calls.hospitalName}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>comments:</b>  ${calls.comments}</td>
          <td style="width:50%;padding: 5px"><b>timeNotified:</b>  ${calls.timeNotified}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>comments:</b>  ${calls.comments}</td>
          <td style="width:50%;padding: 5px"><b>timeNotified:</b>  ${calls.timeNotified}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>timeEnroute:</b>  ${calls.timeEnroute}</td>
          <td style="width:50%;padding: 5px"><b>timeAtScene:</b>  ${calls.timeAtScene}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>crewPatient:</b>  ${calls.crewPatient}</td>
          <td style="width:50%;padding: 5px"><b>timeOutScene:</b>  ${calls.timeOutScene}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>timeAtDestination:</b>  ${calls.timeAtDestination}</td>
          <td style="width:50%;padding: 5px"><b>available:</b>  ${calls.available}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>backArea:</b>  ${calls.backArea}</td>
          <td style="width:50%;padding: 5px"><b>responseToScene:</b>  ${calls.responseToScene}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>responseFromScene:</b>  ${calls.responseFromScene}</td>
          <td style="width:50%;padding: 5px"><b>crewType:</b>  ${calls.crewType}</td>
        </tr>
        <tr>
          <td style="width:50%;padding: 5px"><b>mileage:</b>  ${calls.mileage}</td>
          <td style="width:50%;padding: 5px"><b>patientContact:</b>  ${calls.patientContact}</td>
        </tr>
      </table>
  
      <p>Thank you,</p>
  
      </body>
    </html>
                `,
  };

  const newDetails = new RequirementFormDetails(details);
  newDetails.save((err, savedObject) => {
    if (err) throw err;

    res.status(201).send({
      message: "Your request is successfully submitted!",
      data: savedObject,
    });
    mailTransporter.sendMail(mails1, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send("Email sending failed!");
      } else {
        console.log(info);
      }
    });
    mailTransporter.sendMail(mails2, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send("Email sending failed!");
      } else {
        console.log(info);
      }
    });
  });
});

/**
 * @swagger
 * /api/RequirementFormDetails:
 *   get:
 *     tags:
 *       - RequirementFormDetails
 *     summary: Get all RequirementFormDetails
 *     description: Retrieve a list of all RequirementFormDetails
 *     responses:
 *       200:
 *         description: A list of RequirementFormDetails
 */
router.get("/RequirementFormDetails", (req, res) => {
  RequirementFormDetails.find()
    .sort({ createdAt: -1 })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.status(400).send(err));
});

/**
 * @swagger
 * /api/RequirementFormDetailsByGraphicLocator/{graphicLocator}:
 *   get:
 *     tags:
 *       - RequirementFormDetails
 *     summary: Get a RequirementFormDetails by ID
 *     description: Retrieve a RequirementFormDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: graphicLocator
 *         required: true
 *         description: ID of the RequirementFormDetails to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: RequirementFormDetails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphicLocator:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: RequirementFormDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RequirementFormDetails not found
 */
router.get("/RequirementFormDetailsByGraphicLocator/:graphicLocator", (req, res) => {
  const graphicLocator = req.params.graphicLocator;
  RequirementFormDetails.find({ graphicLocator: graphicLocator })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.json(err.message));
});

/**
 * @swagger
 * /api/RequirementFormDetailsById/{_id}:
 *   get:
 *     tags:
 *       - RequirementFormDetails
 *     summary: Get a RequirementFormDetails by ID
 *     description: Retrieve a RequirementFormDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the RequirementFormDetails to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: RequirementFormDetails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 12345
 *       404:
 *         description: RequirementFormDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RequirementFormDetails not found
 */
router.get("/RequirementFormDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  RequirementFormDetails.find({ _id: _id })
    .then((response) => {
      res.status(200).send({
        message: "Success",
        data: response,
      });
    })
    .catch((err) => res.json(err.message));
});

/**
 * @swagger
 * /api/RequirementFormDetails/{_id}:
 *   put:
 *     summary: Update a RequirementFormDetails by ID
 *     description: Update a RequirementFormDetails's information by ID
 *     tags:
 *       - RequirementFormDetails
 *     parameters:
 *       - name: _id
 *         in: path
 *         description: ID of the RequirementFormDetails to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateOfIncident:
 *                 type: string
 *               timeOfIncident:
 *                 type: string
 *     responses:
 *       200:
 *         description: RequirementFormDetails updated successfully
 *       400:
 *         description: Invalid RequirementFormDetails ID supplied or invalid RequirementFormDetails object
 *       404:
 *         description: RequirementFormDetails not found
 */
router.put("/RequirementFormDetails/:_id", (req, res) => {
  const _id = req.params._id;
  RequirementFormDetails.findById(_id, (err, result) => {
    if (!result) {
      res.status(400).send({
        message: "Unable to update data please try again!",
      });
    } else {
      (result.dateOfIncident = req.body.dateOfIncident),
        (result.timeOfIncident = req.body.timeOfIncident),
        result
          .save()
          .then((user) => {
            res.status(200).send({
              message: "Updated Successfully",
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: "Unable to update data please try again!",
            });
          });
    }
  });
});

/**
 * @swagger
 * info:
 *   title: My API
 *   description: This is a sample API for demonstration purposes.
 *   version: 1.0.0
 *
 * /api/DeleteRequirementFormDetailsById/{_id}:
 *   delete:
 *     tags:
 *       - RequirementFormDetails
 *     summary: Delete a RequirementFormDetails by ID
 *     description: Delete a RequirementFormDetails's information by their ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the RequirementFormDetails to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: RequirementFormDetails deleted successfully
 *       404:
 *         description: RequirementFormDetails not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RequirementFormDetails not found
 */
router.delete("/DeleteRequirementFormDetailsById/:_id", (req, res) => {
  const _id = req.params._id;
  RequirementFormDetails.findByIdAndRemove(_id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
