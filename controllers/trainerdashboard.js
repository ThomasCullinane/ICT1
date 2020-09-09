"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const assessmentStore = require("../models/assessment-store");
const userstore = require("../models/user-store");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentTrainer(request);
      
    const viewData = {
      title: "Trainer Dashboard",
      //assessments: assessmentStore.getAllAssessments(),
      users: userstore.getAllUsers()
    };
    //logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("trainerdashboard", viewData);
  },
  
  user(request, response) {
    const viewData = {
      title: "Trainer Dashboard",
      assessments: assessmentStore.getUserAssessments(request.params.id),
      name: userstore.getUserById(request.params.id)
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("trainerassessment", viewData);
  },
 
  deleteUser(request, response) {
    const userId = request.params.id;
    logger.debug(`Deleting User ${userId}`);
    userstore.deleteUser(userId);
    response.redirect("/trainerdashboard");
  },
  
  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/trainerdashboard");
  },
  
  updateAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Updating Assessment ${assessmentId}`);
    const assessment = assessmentStore.getAssessment(assessmentId);
    const newAssessment = {
      id: assessment.id,
      userid: assessment.userid,
      weight: assessment.weight,
      chest: assessment.chest,
      thigh: assessment.thigh,
      upperarm: assessment.upperarm,
      waist: assessment.waist,
      hips: assessment.hips,
      trend: assessment.trend,
      timestamp: assessment.timestamp,
      comment: request.body.comment
    }
    assessmentStore.updateAssessment(assessment, newAssessment);
    response.redirect("/trainerdashboard/");
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
    response.redirect("/trainerdashboard");
  }
};

module.exports = trainerdashboard;