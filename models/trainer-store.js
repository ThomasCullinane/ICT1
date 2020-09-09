"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const trainerStore = {
  store: new JsonStore("./models/trainer-store.json", { trainers: [] }),
  collection: "trainers",

  getAllTrainers() {
    return this.store.findAll(this.collection);
  },

  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  isCorrectPassword(email,pass) {
    if(this.store.findOneBy(this.collection, { email: email }).password === pass) {
      return true
    }
    else {
      return false
    }
  },
  

};

module.exports = trainerStore;