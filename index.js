const express = require("express");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cors = require("cors");
const {
  _makeUserData,
  _apiDataList,
  _licenseDataList,
  _prodDataList,
} = require("./makeData");
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
    prod: _prodDataList,
  };
  const _dataList = mapTypeToDataList[type];
  const content = _dataList.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
  const isLast =
    content.length < pageSize || content.length === _dataList.length;
  return {
    pageNumber: Number(pageNumber),
    allCnt: _dataList.length,
    contentCnt: content.length,
    content,
    isLast,
  };
};

//* _id, productName, price, quantity,image, createdAt

//* select * from cart where createdAt < 2022-02-01 orderby id
const getCreatedAtData = () => {
  return new Date(
    new Date().getTime() - Math.random(1000 * 3600 * 24 * 30) - 1000 * 50
  );
};

const productNames = ["커피", "후추", "소금", "설탕", "고춧가루"];

const cartData = Array.from({ length: 50 }).map((_, index) => ({
  _id: index,
  productName: productNames[Math.floor(Math.random() * 5)],
  price: Math.floor(Math.random() * 50000 + 50000),
  quantity: Math.floor(Math.random() * 20 + 1),
  image: "https://source.unsplash.com/random/300×300",
  createdAt: getCreatedAt(),
}));

const sleep = async () =>
  await new Promise((resolve) => setTimeout(() => resolve(), 500));

app.get("/dummy/cart", async (req, res) => {
  await sleep();
  return res.json({ data: cartData });
});

const policyNames = [
  "통합 에이전트 기본 정책 1",
  "통합 에이전트 기본 정책 2",
  "통합 에이전트 기본 정책 3",
  "interaction 정책",
  "interaction 정책 1",
  "interaction 정책 2",
  "interaction 정책 3",
];

const osNames = ["Windows", "Mac", "Linux"];

const getCreatedAt = () => {
  return new Date(
    new Date().getTime() -
      Math.floor(Math.random() * 1000 * 3600 * 24 * 30 + 1000 * 3600)
  );
};

app.get("/dummy/policy", (req, res) => {
  const policyData = Array.from({ length: 87 }).map((val, index) => {
    const createdAt = getCreatedAt();
    const updatedAt = new Date(
      createdAt.getTime() +
        Math.floor(Math.random() * 1000 * 3600 * 24 * 30 + 1000 * 3600)
    );
    return {
      id: index,
      policyName: policyNames[Math.floor(Math.random() * policyNames.length)],
      deviceCnt: Math.floor(Math.random() * 250 + 50),
      os: osNames[Math.floor(Math.random() * osNames.length)],
      updatedAt,
      createdAt,
    };
  });
  return res.json({ data: policyData });
});

app.get("/api", (req, res) => {
  const { pageNumber, pageSize = 10 } = req.query;
  return res.json(paginating(pageNumber, pageSize, "api"));
});

app.get("/license", (req, res) => {
  const { pageNumber, pageSize = 10 } = req.query;
  return res.json(paginating(pageNumber, pageSize, "license"));
});

app.get("/prod/:id", (req, res) => {
  const { id } = req.params;
  const prodData = _prodDataList.find((prod) => prod.prodId === id);
  return res.json(prodData);
});

app.get("/prod", (req, res) => {
  const { pageNumber, pageSize = 10 } = req.query;
  return res.json(paginating(pageNumber, pageSize, "prod"));
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
