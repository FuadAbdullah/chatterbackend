const express = require("express");
const {
  getAvailableModel,
  getTestTurbo,
  getResponseTurbo,
  createDummyRecord,
} = require("../controllers/openAIController.js");

const router = express.Router();

router.get("/getAvailableModel", getAvailableModel);
router.get("/getTestTurbo", getTestTurbo);
router.get("/getResponseTurbo", getResponseTurbo);
router.get("/createDummyRecord", createDummyRecord);

module.exports = router;
