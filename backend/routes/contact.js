const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const contactController = require("../controllers/contactController");

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Please enter a valid email").normalizeEmail(),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 2000 })
    .withMessage("Message is too long (max 2000 characters)"),
];

router.post("/", contactValidation, contactController.submitContact);

module.exports = router;
