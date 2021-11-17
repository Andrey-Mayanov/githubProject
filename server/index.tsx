const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/auth", (req, res) => {
  const { code, clientId, clientSecret } = req.body;

  axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    },
  })
    .then((response) => {
      let params = new URLSearchParams(response.data);
      const access_token = params.get("access_token");
      return res.status(200).json(access_token);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
