const { requireAuth } = require("@clerk/express");

module.exports = (req, res, next) => {
  // Check if CLERK_SECRET_KEY is defined. If not, bypass middleware and print warning.
  if (!process.env.CLERK_SECRET_KEY) {
    console.warn("⚠️ CLERK_SECRET_KEY is missing. Clerk requireAuth middleware is bypassed.");
    return next();
  }
  
  return requireAuth()(req, res, next);
};
