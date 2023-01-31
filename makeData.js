const { faker } = require("@faker-js/faker");

const _makeUserData = () => {
  const createdAt = faker.date.past();
  const updatedAt = new Date(
    createdAt.getTime() + 3600 * 5 * 1000 + (Math.random() * 10000000 + 1000000)
  );
  return {
    uid: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    createdAt,
    updatedAt,
  };
};

const _makeApiData = () => {
  const regTimestamp = faker.date.past();
  const expireTimestamp = new Date(
    regTimestamp.getTime() +
      3600 * 24 * Math.floor(Math.random() * 100 + 30) * 1000
  );
  return {
    apiKey: faker.datatype.uuid(),
    account: faker.internet.email(),
    apiPermission:
      '{"canForceScan":true,"duplicationCheckTime":86400000,"searchIndex":false,"autoCollect":true,"isListing":true}',
    expireTimestamp,
    regTimestamp,
  };
};

const _apiDataList = Array.from({ length: 147 }, () => _makeApiData()).sort(
  (a, b) =>
    new Date(b.regTimestamp).getTime() - new Date(a.regTimestamp).getTime()
);
// console.log(_apiDataList);

module.exports = {
  _makeUserData,
  _makeApiData,
  _apiDataList,
};
