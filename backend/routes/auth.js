const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

// Validation rules
const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const profileValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

// Public routes
router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.post("/logout", authController.logout);

// Protected routes
router.get("/me", auth, authController.getMe);
router.put("/profile", auth, profileValidation, authController.updateProfile);

module.exports = router;
