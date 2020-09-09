~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const about = require("./controllers/about.js");
const assessment = require("./controllers/assessment.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.post("/settings/update", accounts.update);
router.get("/settings", accounts.profile);


router.get("/dashboard", dashboard.index);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);
router.post("/dashboard/addassessment", dashboard.addAssessment);

router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerdashboard/:id", trainerdashboard.user);
router.get("/trainerdashboard/deleteuser/:id", trainerdashboard.deleteUser);
router.post("/trainerdashboard/updateassessment/:id", trainerdashboard.updateAssessment);

router.get("/about", about.index);
router.get("/assessment/", assessment.index);

module.exports = router;
