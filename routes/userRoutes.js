const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// Get logged-in user's profile
router.get("/profile", authenticate, async (req, res) => {
  res.json(req.user);
});

// Get all users (Admin only)
router.get("/", authenticate, authorize(["Admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update a user's role (Admin only)
router.put(
  "/role/:id",
  authenticate,
  authorize(["Admin"]),
  async (req, res) => {
    const { role } = req.body;
    if (!["Admin", "Client"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(user);
  }
);

module.exports = router;
