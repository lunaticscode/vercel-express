const express = require("express");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cors = require("cors");
const { _makeUserData, _apiDataList, _licenseDataList } = require("./makeData");
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

const paginating = (pageNumber, pageSize, type) => {
  const mapTypeToDataList = {
    api: _apiDataList,
    license: _licenseDataList,
  };
  const _dataList = mapTypeToDataList[type];
  const content = _dataList.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
  const isLast =
    content.length < pageSize || content.length === _dataList.length;
  return {
    allCnt: _dataList.length,
    contentCnt: content.length,
    content,
    isLast,
  };
};

app.get("/api", (req, res) => {
  const { pageNumber, pageSize = 10 } = req.query;
  return res.json(paginating(pageNumber, pageSize, "api"));
});

app.get("/license", (req, res) => {
  const { pageNumber, pageSize = 10 } = req.query;

  return res.json(paginating(pageNumber, pageSize, "license"));
});

app.post("/elice-gmail", async (req, res) => {
  const { gmailUrl, ...emailContent } = req.body;
  const { email, name, message = "없음", phone = "없음" } = emailContent;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("message", message);
  formData.append("phone", phone);

  // console.log(emailContent);
  // console.log({ gmailUrl });
  const result = await fetch(gmailUrl, {
    method: "post",
    body: formData,
    // headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log({ err });
      return false;
    });
  if (!result) {
    return res.json({
      isError: true,
      message: "(!) Request 값을 다시 확인해주세요.",
    });
  }
  return res.json({ isError: false, result });
});

app.listen(PORT, () => {
  console.log(`Express running on ${PORT}`);
});

module.exports = app;
