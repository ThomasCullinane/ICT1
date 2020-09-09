"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    assessmentCollection: []
  }),
  collection: "assessmentCollection",

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });

  },
  getSong(id, songId) {
    const assessment = this.store.findOneBy(this.collection, { id: id });
    const songs = assessment.songs.filter(song => song.id == songId);
    return songs[0];},
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addAssessment(assessment) {
    this.store.add(this.collection,assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
  
  updateAssessment(assessment,newAssessment) {
    assessment.comment = newAssessment.comment;
    this.store.save();
  },

  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addSong(id, song) {
    const assessment = this.getAssessment(id);
    assessment.songs.push(song);

    let duration = 0;
    for (let i = 0; i < assessment.songs.length; i++) {
      duration += assessment.songs[i].duration;
    }

    assessment.duration = duration;
    this.store.save();
  },

  removeSong(id, songId) {
    const assessment = this.getAssessment(id);
    const songs = assessment.songs;
    _.remove(songs, { id: songId });
    this.store.save();
  },

  getSong(id, songId) {
    const assessment = this.store.findOneBy(this.collection, { id: id });
    const songs = assessment.songs.filter(song => song.id == songId);
    return songs[0];
  },

  updateSong(song, updatedSong) {
    song.title = updatedSong.title;
    song.artist = updatedSong.artist;
    song.duration = updatedSong.duration;
    this.store.save();
  }
};

module.exports = assessmentStore;
