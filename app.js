// Imports
const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler.js");
const app = express();
const commonRouter = require("./routes/commonRouter.js");
const openAIRouter = require("./routes/openAIRouter.js");
require("dotenv").config();

// Express use
app.use(express.json());
app.use(errorHandler);
app.use(morgan(process.env.BACKEND_MODE));
app.use("/", commonRouter);
app.use("/openai", openAIRouter);

// Express server init
const portNumber = process.env.PORT || 3000;

app.listen(portNumber, () => {
  console.log(
    `chatterbackend server is currently running and listening on port ${portNumber}`
  );
});

// Shutdown sequence handler
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  console.log(`Received input: ${data}`);
  if (data.trim() === "shutdown") {
    console.log("Shutting down chatterbackend server...");
    process.exit();
  }
  if (data.trim() === "delayexit") {
    console.log("Shutting down chatterbackend server in 10 seconds...");
    setTimeout(() => {
      process.exit();
    }, 10000);
  }
});
