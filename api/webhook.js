const axios = require("axios");

module.exports = async (req, res) => {
  // Ensure this exact string is used
  const DESTINATION_URL =
    "https://apitours.tankwatravels.com/api/telegram/webhook/tankwa_tours_secure_notify_2026_x86_v1_99f2b8/";

  if (req.method === "POST") {
    try {
      // Log for your own Vercel dashboard to see it's trying
      console.log("Forwarding payload to Django...");

      const response = await axios({
        method: "post",
        url: DESTINATION_URL,
        data: req.body,
        headers: {
          "Content-Type": "application/json",
          // This tells Django this is a trusted proxy
          "X-Forwarded-For":
            req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        },
        timeout: 10000, // 10 second timeout
      });

      res.status(200).send("Django Accepted: " + response.status);
    } catch (error) {
      console.error(
        "Proxy Error:",
        error.response ? error.response.status : error.message,
      );
      // Return the specific error from Django if it exists
      res
        .status(error.response ? error.response.status : 500)
        .send(error.message);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
