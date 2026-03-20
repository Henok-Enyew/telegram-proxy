// api/webhook.js
const axios = require("axios");

module.exports = async (req, res) => {
  const DESTINATION_URL =
    "https://apitours.tankwatravels.com/api/telegram/webhook/"; // Your HahuCloud URL

  if (req.method === "POST") {
    try {
      // Forward the Telegram body to your Django app
      await axios.post(DESTINATION_URL, req.body);
      res.status(200).send("Forwarded to HahuCloud");
    } catch (error) {
      console.error("Error forwarding:", error.message);
      res.status(500).send("Failed to forward");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
