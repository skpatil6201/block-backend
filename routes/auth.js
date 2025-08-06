const express = require("express");
const router = express.Router();
const Admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const admin = require("../models/admin.js");

const jwt=require("jsonwebtoken")
const JWT_SECRET = "TOGdvPLvZgypKDAGsk1GefrU9tsQzU4eCCoWvmRB724=";
// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "email and pass");
  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const admin = await Admin.findOne({ email });
    console.log(admin)
    if (!admin)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(isMatch,"ismatch")
     const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "2h" });
    console.log("token is ", token);
   
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
