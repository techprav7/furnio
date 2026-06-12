const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const newsletterController = require("../controllers/newsletterController");

const subscribeValidation = [
  body("email").trim().isEmail().withMessage("Please enter a valid email").normalizeEmail(),
];

router.post("/", subscribeValidation, newsletterController.subscribe);

module.exports = router;
