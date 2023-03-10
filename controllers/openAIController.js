const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ENDPOINT_BASE_URL = "https://api.openai.com";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

// Query only
exports.getResponseTurbo = async (req, res) => {
  let prompt = req.query.prompt
    ? req.query.prompt
    : "Reply me with 'No prompt provided!'";
  try {
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
