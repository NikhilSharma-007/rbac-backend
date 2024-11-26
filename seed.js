const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const admin = await User.findOne({ email: "admin@rbacapp.com" });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Default Admin",
        email: "admin@rbacapp.com",
        password: hashedPassword,
        role: "Admin",
      });
      console.log("Admin user created: admin@rbacapp.com / admin123");
    }

    mongoose.disconnect();
  });
