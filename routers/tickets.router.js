const destination = {
  ICN: "인천",
  CJU: "제주",
  HKG: "홍콩",
  HAN: "하노이",
  KIX: "오사카",
  NRT: "도쿄",
  SHA: "상하이",
  CDG: "파리",
  LHR: "런던",
  SPN: "사이판",
};

// 항공사 데이터
const airline = {
  KOREANAIR: "대한항공",
  ASIANA: "아시아나항공",
  TEEWAY: "티웨이항공",
  JINAIR: "진에어",
  AIRSEOUL: "에어서울",
  JEJUAIR: "제주항공",
  EASTAR: "이스타항공",
};

const ticketsData = require("../data/tickets.json");
const router = require("express").Router();
router.get("/", (req, res) => {
  const { departures, arrivals, date } = req.query;
  if (!departures || !arrivals || !date) {
    return res.status(400).json({
      isError: true,
      data: [],
      message: "(!) Invalid [departures, arrivals, date] query data.",
    });
  }
  const resultData = ticketsData.filter(
    (data) =>
      data.departures === destination[departures] &&
      data.arrivals === destination[arrivals] &&
      new Date(data.date).getTime() >= new Date(date).getTime()
  );
  return res.status(200).json({ isError: false, data: resultData });
});

module.exports = router;
