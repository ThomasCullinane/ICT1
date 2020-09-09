"use strict";

const userstore = require("../models/user-store");
const trainerstore = require("../models/trainer-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("gym", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);  
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    var validPass = false;
    if(user) {
      validPass = userstore.isCorrectPassword(request.body.email,request.body.password);           
    }
    else if (trainer) {
      validPass = trainerstore.isCorrectPassword(request.body.email,request.body.password); 
    }
    
    if (user && validPass) {
      response.cookie("gym", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else if (trainer && validPass) {
      response.cookie("gym", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.gym;
    return userstore.getUserByEmail(userEmail);
  },
  
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.gym;
    return trainerstore.getTrainerByEmail(trainerEmail);
  },
  
  profile(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Settings",
      user: loggedInUser
    };
    response.render("settings", viewData);
  },

  
  update(request, response) {
    const user = accounts.getCurrentUser(request);
    const newUser = {
      id: request.body.id,
      name: request.body.name,
      height: parseFloat(request.body.height),
      weight: parseFloat(request.body.weight),
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
    }
    logger.debug(`Updating User ${user}`);
    userstore.updateUser(user, newUser);
    response.redirect("/settings");
  }
};

module.exports = accounts;