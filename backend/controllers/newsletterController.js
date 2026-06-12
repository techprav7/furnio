const Newsletter = require("../models/Newsletter");
const { validationResult } = require("express-validator");

// POST /api/newsletter — subscribe
exports.subscribe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email } = req.body;

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }

    const subscriber = new Newsletter({ email: email.toLowerCase() });
    await subscriber.save();

    res.status(201).json({ message: "Successfully subscribed to our newsletter!" });
  } catch (error) {
    console.error("Subscribe error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
