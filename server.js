const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sahilmaharaj:dr3amvill3@sauces.cwocyfm.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "nandos", // Specify the database name here
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a schema for the collection 'allusers'
const userSchema = new mongoose.Schema({
  email: String,
  age: Number,
  spiceLevel: String,
});

// Create a model from the schema
const User = mongoose.model("sauces", userSchema);

// Routes
app.post("/submit", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser); // Log the saved user for debugging
    res.status(201).send("User data saved to MongoDB");
  } catch (error) {
    console.error("Error saving data to MongoDB:", error); // Log any errors during save
    res.status(400).send("Error saving data");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
