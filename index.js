const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");
const auth=require("./routes/auth")

const blogRoutes = require("./routes/blog");
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://tejas:1fp9VTFu1nPeuVMg@hvpmspost.jtckgrx.mongodb.net", {
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
