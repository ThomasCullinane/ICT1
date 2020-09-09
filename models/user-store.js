"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  deleteUser(id) {
    const user = this.getUserById(id);
    this.store.remove(this.collection, user);
    this.store.save();
  },

  getUserByEmail(email) {
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
  
  updateUser(user,updatedUser) {
    user.name = updatedUser.name;
    user.height = updatedUser.height;
    user.weight = updatedUser.weight;
    user.gender = updatedUser.gender;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    this.store.save();
  }
};

module.exports = userStore;