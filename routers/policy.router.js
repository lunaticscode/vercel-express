const express = require("express");
const connection = require("../db_init");
const router = express.Router();

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

const getUpdatedAt = (createdAt) => {
  return new Date(
    createdAt.getTime() +
      Math.floor(Math.random() * 1000 * 3600 * 24 * 30 + 1000 * 3600)
  );
};

const getPolicyAllData = async () => {
  return await new Promise((resolve, _) => {
    connection.query("Select * from policy", (err, results) => {
      if (err) {
        console.log(err);
        return resolve(null);
      }
      return resolve(results);
    });
  });
};

router.get("/", async (req, res) => {
  const policyListData = await getPolicyAllData();
  return res.json({ data: policyListData });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const createdAt = getCreatedAt();
  const updatedAt = getUpdatedAt(createdAt);
  return res.json({
    data: {
      id,
      policyName: policyNames[Math.floor(Math.random() * policyNames.length)],
      deviceCnt: Math.floor(Math.random() * 250 + 50),
      os: osNames[Math.floor(Math.random() * osNames.length)],
      descId: 56 + id,
      updatedAt,
      createdAt,
    },
  });
});

const policyDescs = policyNames.map((name) => `${name} - 정책 상세내용`);

router.get("/detail/:id", (req, res) => {
  const id = Number(req.params.id);
  const createdAt = getCreatedAt();
  const updatedAt = getUpdatedAt(createdAt);
  return res.json({
    data: {
      id,
      policyName: policyNames[id - 56],
      description: policyDescs[id - 56],
      createdAt,
      updatedAt,
    },
  });
});

router.get("/");

module.exports = router;
