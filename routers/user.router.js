const express = require("express");
const router = express.Router();

const dummyUsers = [
  { id: "A0", name: "제우스", createdAt: new Date("2022-01-01") },
  { id: "A1", name: "헤라클레스", createdAt: new Date("2022-01-02") },
  { id: "A2", name: "헤파이토스", createdAt: new Date("2022-01-03") },
  { id: "A3", name: "아레스", createdAt: new Date("2022-01-04") },
];

router.get("/", (req, res) => {
  return res.json(dummyUsers);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const targetUser = dummyUsers.find((user) => user.id === id);
  return res.json({ data: targetUser });
});
module.exports = router;
