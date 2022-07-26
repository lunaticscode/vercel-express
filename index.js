const express = require("express");
const app = express();
const PORT = 8888;

app.use(express.json());
app.get("/test", (req, res) => {
  return res.status(200).json({ result: true });
});

app.post("/test", (req, res) => {
  console.log(req.body);
  return res.status(200).json({ result: true });
});

app.listen(PORT, () => {
  console.log(`Express running on ${PORT}`);
});

module.exports = app;
