const Contact = require("../models/Contact");
const { validationResult } = require("express-validator");

// POST /api/contact — submit contact form
exports.submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, subject, message } = req.body;

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("SubmitContact error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
