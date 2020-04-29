const {seed, openConnection, closeDB} = require("./seeder");

const seedDb = async() => {
  await openConnection()
  await seed()
  await closeDB()
}

seedDb();