const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

// We need raw body parsing for Clerk webhooks verification
router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  webhookController.handleClerkWebhook
);

module.exports = router;
