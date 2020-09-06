"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const uuid = require("uuid");

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug("Assessment id = ", assessmentId);
    const viewData = {
      title: "Assessment",
      assessment: assessmentStore.getAssessment(assessmentId)
    };
    response.render("assessment", viewData);
  },

  deleteSong(request, response) {
    const assessmentId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Assessment ${assessmentId}`);
    assessmentStore.removeSong(assessmentId, songId);
    response.redirect("/assessment/" + assessmentId);
  },

  addSong(request, response) {
    const assessmentId = request.params.id;
    const assessment = assessmentStore.getAssessment(assessmentId);
    const newSong = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug("New Song = ", newSong);
    assessmentStore.addSong(assessmentId, newSong);
    response.redirect("/assessment/" + assessmentId);
  }
};

module.exports = assessment;
