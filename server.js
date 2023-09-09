const express = require("express");
const config = require("./app/services/config.service");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { databaseUrl } = config;

app.use(express.json());
app.use(cors());

async function connectDB() {
  await mongoose.connect(databaseUrl);
  console.log("MongoDB connected!");
}

connectDB()
  .catch((err) => console.log("DB Error: ", err))
  .then(() => app.use("/api/v1", require("./app/routes/routeGroups")))
  .catch((err) => console.log("Express error: ", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
