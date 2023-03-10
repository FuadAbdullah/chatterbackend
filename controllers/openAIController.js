const axios = require("axios");
const mongoose = require("mongoose");
const Completion = require("../models/completion.js");
const debugOutput = require("../utils/debugOutput.js");
require("dotenv").config();

const API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ENDPOINT_BASE_URL = "https://api.openai.com";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

// Query only
exports.getResponseTurbo = async (req, res) => {
  // Mongoose init
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@chatterapp.xsrerzf.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(async () => {
      let prompt = req.query.prompt
        ? req.query.prompt
        : "Reply me with 'No prompt provided!'";
      // Main payload to OpenAI backend
      const payload = {
        messages: [
          {
            role: "user",
            content: `${prompt}`,
          },
        ],
        temperature: 0.7,
        model: "gpt-3.5-turbo",
      };
      // axios POST to OpenAI backend
      const response = await axios.post(
        `${OPENAI_ENDPOINT_BASE_URL}/v1/chat/completions`,
        payload,
        {
          headers,
        }
      );

      // Storing response to MongoDB
      const newCompletion = new Completion(response.data);
      newCompletion
        .save()
        .then((result) => {
          mongoose.connection.close();
          // Response to client
          return res
            .status(200)
            .set("Content-Type", "application/json")
            .json(result);
        })
        .catch((err) => {
          console.error(err);
          return res
            .status(500)
            .set("Content-Type", "application/json")
            .json({ error: err });
        });
    })
    .catch((error) => {
      if (error.response) {
        return res
          .status(error.response.status)
          .set("Content-Type", "application/json")
          .json(error.response.data);
      } else {
        return res.status(500).set("Content-Type", "application/json").json({
          error: error.message,
        });
      }
    });
};

exports.getTestTurbo = async (req, res) => {
  try {
    const payload = {
      messages: [
        {
          role: "user",
          content:
            'If you received this prompt, reply with "Hello chatterbackend!"',
        },
      ],
      temperature: 0.7,
      model: "gpt-3.5-turbo",
    };
    const response = await axios.post(
      `${OPENAI_ENDPOINT_BASE_URL}/v1/chat/completions`,
      payload,
      {
        headers,
      }
    );
    return res
      .status(200)
      .set("Content-Type", "application/json")
      .json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .set("Content-Type", "application/json")
        .json(error.response.data);
    } else {
      return res.status(500).set("Content-Type", "application/json").json({
        error: error.message,
      });
    }
  }
};

exports.getAvailableModel = async (req, res) => {
  try {
    const response = await axios.get(`${OPENAI_ENDPOINT_BASE_URL}/v1/models`, {
      headers,
    });

    return res
      .status(200)
      .set("Content-Type", "application/json")
      .json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .set("Content-Type", "application/json")
        .json(error.response.data);
    } else {
      return res.status(500).set("Content-Type", "application/json").json({
        error: error.message,
      });
    }
  }
};

exports.createDummyRecord = async (req, res) => {
  // Mongoose init
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@chatterapp.xsrerzf.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      const newCompletion = new Completion({
        id: "chatcmpl-6sWRdXs2bHLua7VLJKWqjD4v2YvLZ",
        object: "chat.completion",
        created: 1678452449,
        model: "gpt-3.5-turbo-0301",
        usage: {
          prompt_tokens: 15,
          completion_tokens: 6,
          total_tokens: 21,
        },
        choices: [
          {
            message: {
              role: "assistant",
              content: "No prompt provided!",
            },
            finish_reason: "stop",
            index: 0,
          },
        ],
      });

      newCompletion
        .save()
        .then((result) => {
          mongoose.connection.close();
          return res
            .status(200)
            .set("Content-Type", "application/json")
            .json(result);
        })
        .catch((err) => {
          console.error(err);
          return res
            .status(500)
            .set("Content-Type", "application/json")
            .json(err);
        });
    })
    .catch((error) => {
      if (error.response) {
        return res
          .status(error.response.status)
          .set("Content-Type", "application/json")
          .json(error.response.data);
      } else {
        return res.status(500).set("Content-Type", "application/json").json({
          error: error.message,
        });
      }
    });
};
