const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

let meetings = [];

const scheduleMeeting = async (req, res) => {
  try {
    // Parse JWT from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Missing Authorization header");
      return res.status(401).json({ error: "Missing Authorization header" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Missing JWT token");
      return res.status(401).json({ error: "Missing JWT token" });
    }

    // Verify JWT and retrieve user from DB (mocked here)
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (err) {
      console.log("Invalid JWT");
      return res.status(401).json({ error: "Invalid JWT" });
    }

    // Look up actual user in your database
    // const user = await User.findById(userId);
    // Example mock user:
    const user = {
      _id: userId,
    };

    // If user not found
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "User not found" });
    }

    // Store meeting details
    const { title, startTime } = req.body;
    const id = Date.now().toString();
    meetings.push({ id, title, startTime });
    console.log(`Meeting scheduled: ${id}`);
    res.json({ id, title, startTime });

    // Schedule meeting start notification
    const startDelay = new Date(startTime).getTime() - Date.now();
    setTimeout(() => {
      console.log(`Meeting ${id} started`);
      const io = new Server(req.app.get("server"));
      io.to(id).emit("meeting-start", { id, title, startTime });
    }, startDelay);
  } catch (error) {
    console.error("Failed to create meeting:", error);
    return res.status(500).json({ error: "Failed to create meeting" });
  }
};

const checkMeeting = (req, res) => {
  const meeting = meetings.find((m) => m.id === req.params.id);
  if (!meeting) {
    console.log("Meeting not found");
    return res.status(404).json({ error: "Meeting not found" });
  }
  const canJoin = Date.now() >= new Date(meeting.startTime).getTime();
  console.log(`Meeting status: ${meeting.id}, canJoin: ${canJoin}`);
  res.json({ ...meeting, canJoin });
};

module.exports = { scheduleMeeting, checkMeeting };
