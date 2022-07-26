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

module.exports = {
  _makeUserData,
};
