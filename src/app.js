require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");

// Application
const app = express();
app.use(
  cors({
    origin: [
      "https://bookstore.eevos.be",
      "https://epidemic-escapes.netlify.app/",
      "http://localhost:4200",
      "http://localhost",
    ],
  })
);
app.use(express.json());
app.use(express.static("public"));

// Database initialization
const db = require("./models");
db.sequelize
  .authenticate()
  .then(() => console.log("Connection DB successful"))
  .catch((err) => console.log("Connection DB failed : ", err));

if (process.env.NODE_ENV === "development") {
  db.sequelize.sync({ force: true });
  // db.sequelize.sync({ alter: { drop: false } });
} else {
  db.sequelize.sync({ force: false });
}

// Router
const router = require("./routes");
app.use("/", router);

// Starting the application
app.listen(process.env.API_PORT, () => {
  console.log(`Server API started on port:${process.env.API_PORT}`);
});
