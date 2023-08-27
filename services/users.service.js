const dbConnection = require("../db_init");
const insertUser = async (data) => {
  const { email, password } = data;
  return await new Promise((resolve) => {
    dbConnection.query(
      "insert into users (email, password) values (?, ?)",
      [email, password],
      (err) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
};

const findUser = async (data) => {
  const { email, password } = data;
  return await new Promise((resolve, reject) => {
    dbConnection.query(
      "select count(*) as count from users where email=? and password =?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        const count = result[0].count;
        if (count) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      }
    );
  });
};

module.exports = {
  insertUser,
  findUser,
};
