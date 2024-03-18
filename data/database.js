// decyduj który potrzebujesz sql czy mongo, pamiętaj, że trzeba uruchomić bazę danych przed przystąpieniem do programowania, chyba, że mongo to nie trzeba - ponieważ jest w chmurze ale może być i lokalnie.
//tutaj jest sql
//   const mysql = require("mysql2/promise");
// 		const pool = mysql.createPool({
// 		  host: "localhost",
// 		  databasea: "blog",
// 		  user: "root",
// 		  password: "Sojokotojo1@3",
// 		});
// 		module.exports = pool;
// ---------------------------------------------------------------
//tutaj jest mongodb

const mongodb = require("mongodb");
const password = require("./password");
const url = `mongodb+srv://fluktar:${password}@cluster0.xw4ekbx.mongodb.net/?retryWrites=true&w=majority`;

const MongoClient = mongodb.MongoClient;
let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(url);
  database = client.db("natours");
}
function getDb() {
  if (!database) {
    throw new Error("You mast connect to database first!");
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
