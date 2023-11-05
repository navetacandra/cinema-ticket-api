const { createUser, loginUser } = require("./models/users");
const { query: sqlQuery } = require("./utils/mysql");

(async function () {
  try {
    // const date = new Date("2023-11-20");
    // const res = await sqlQuery(
    //   `INSERT INTO shows (studio_id, movie_id, schedule, price, date) VALUES (1, 1, '00:00', 100000, '2023-11-20')`
    // );
    // const res = await loginUser("admin", "12345678");
    // console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
})();
