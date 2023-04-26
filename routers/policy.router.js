const express = require("express");
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

router.get("/", (req, res) => {
  const policyData = Array.from({ length: 87 }).map((val, index) => {
    const createdAt = getCreatedAt();
    const updatedAt = getUpdatedAt(createdAt);
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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const createdAt = getCreatedAt();
  const updatedAt = getUpdatedAt(createdAt);
  return res.json({
    data: {
      id,
      policyName: policyNames[Math.floor(Math.random() * policyNames.length)],
      deviceCnt: Math.floor(Math.random() * 250 + 50),
      os: osNames[Math.floor(Math.random() * osNames.length)],
      updatedAt,
      createdAt,
    },
  });
});

module.exports = router;
