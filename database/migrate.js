const fs = require("fs");
const path = require("path");
const { query } = require("../utils/mysql");

(async function () {
  const sql = fs.readFileSync(
    path.join(__dirname, "./cinema-ticketing.sql"),
    "utf-8",
  );

  const deleteIndexes = (
    await Promise.all(
      sql
        .split("\n\n")
        .filter((f) => f.toLowerCase().includes("create table"))
        .map(
          (q) => (q.match(/CREATE TABLE IF NOT EXISTS \`(.*)\` \(/) ?? [])[1],
        )
        .map(async (tableName) => {
          try {
            console.log("Delete Indexes Table:", tableName);
            const dropIndexQueries = await query(
              `SELECT CONCAT('ALTER TABLE \`', t.table_name, '\` DROP FOREIGN KEY \`', k.index_name, '\`;') AS 'SQL1', CONCAT('ALTER TABLE \`', t.table_name, '\` DROP INDEX \`', k.index_name, '\`;') AS 'SQL2' FROM information_schema.tables t INNER JOIN information_schema.statistics k ON t.table_name = k.table_name WHERE t.table_schema = 'cinema_ticketing' AND t.table_name='${tableName}' AND k.index_name LIKE 'fk_%';`,
            );
            const q = await Promise.all(
              dropIndexQueries.map(async (qq) => [
                await query(qq.SQL1),
                await query(qq.SQL2),
              ]),
            );
            return q;
          } catch (error) {
            console.log(error);
          }
        }),
    )
  ).flat();

  const createTables = await Promise.all(
    sql
      .split("\n\n")
      .filter((f) => f.toLowerCase().includes("create table"))
      .map(async (q) => {
        try {
          const tableName = (q.match(
            /CREATE TABLE IF NOT EXISTS \`(.*)\` \(/,
          ) ?? [])[1];
          if (tableName) {
            console.log("Drop Table:", tableName);
            await query(`DROP TABLE IF EXISTS ${tableName};`);
          }
          console.log("Create Table:", tableName);
          const seedQuery = await query(q);
          return seedQuery;
        } catch (error) {
          return error;
        }
      }),
  );

  const modifyTables = await Promise.all(
    sql
      .split("\n\n")
      .filter((f) => !f.toLowerCase().includes("create table"))
      .map(async (q) => {
        try {
          const tableName = (q.match(/ALTER TABLE `([^`]+)` +/) ?? [])[1];
          console.log("Modify Table:", tableName);
          const seedQuery = await query(q);
          return seedQuery;
        } catch (error) {
          return error;
        }
      }),
  );

  console.log("Drop Indexes", deleteIndexes);
  console.log("Create Tables", createTables);
  console.log("Modify Table", modifyTables);
  process.exit(0);
})();
