"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const assessmentStore = require("../models/assessment-store");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    
    const BMI = analytics.getBMI(loggedInUser,assessmentStore.getUserAssessments(loggedInUser.id)) ;
    
    const viewData = {
      title: "Assessment Dashboard",
      assessments: assessmentStore.getUserAssessments(loggedInUser.id),
      BMI: BMI,
      BMICategory: analytics.getBMICategory(BMI),
      user: loggedInUser,
      isIdealBodyWeight: analytics.isIdealBodyWeight(loggedInUser,assessmentStore.getUserAssessments(loggedInUser.id))
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    var ts = new Date().toJSON();
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      weight: parseFloat(request.body.weight),
      chest: parseFloat(request.body.chest),
      thigh: parseFloat(request.body.thigh),
      upperarm: parseFloat(request.body.upperarm),
      waist: parseFloat(request.body.waist),
      hips: parseFloat(request.body.hips),
      comment: "",
      timestamp: ts
    };
    logger.debug("Creating a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
