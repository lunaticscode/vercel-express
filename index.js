const express = require("express");
const cors = require("cors");
const { _makeUserData } = require("./makeData");
const app = express();
const PORT = 8888;

app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
  return res.status(200).json({ result: _makeUserData() });
});

app.post("/user", (req, res) => {
  const cnt = req.body.count || 0;
  let resultData;
  if (!cnt) {
    resultData = [];
    return res.status(200).json({ result: resultData });
  }

  resultData = new Array(cnt).fill(0).map((elem) => {
    return _makeUserData();
  });
  return res.status(200).json({ result: resultData });
});

app.listen(PORT, () => {
  console.log(`Express running on ${PORT}`);
});

module.exports = app;
