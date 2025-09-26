const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./model/User");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    adminRegister();
  })
  .catch((err) => console.log("MongoDB connection error:", err));

const adminRegister = async () => {
  try {
    const password = process.env.ADMIN_PASSWORD;
    const email = process.env.ADMIN_EMAIL;

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      username: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin registered successfully");
    process.exit(); // exit after seeding
  } catch (err) {
    console.log(err.message);
  }
};
