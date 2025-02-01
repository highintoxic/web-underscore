const { Router } = require("express");
const errorHandler = require("strong-error-handler");

const authRoute = require("./auth.route");
const meetingRoute = require("./meeting.route");

const router = Router();

router.use("/auth", authRoute);
router.use("/meetings", meetingRoute);

/**
 * GET /health
 * Health check endpoint.
 */
router.get("/health", (req, res) => {
  res.send("Ok");
});

// Error handling middleware
router.use(
  errorHandler({
    debug: process.env.ENV !== "prod",
    log: true,
  })
);

module.exports = router;
