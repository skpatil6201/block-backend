const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require("dotenv")
const postRoutes = require("./routes/postRoutes");
const auth=require("./routes/auth")

const blogRoutes = require("./routes/blog");
const app = express();
const PORT = 8000;
// import dotenv from "dotenv";

// Load environment variables
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", auth);

app.use("/api/blogs", blogRoutes); 
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
