const app = require("./config/custom-express");
require("dotenv").config();

const port = process.env.PORT || 3000;

const mongoClient = require("mongodb").MongoClient;
console.log(process.env.URI_DATABASE);

mongoClient.connect(process.env.URI_DATABASE, function (err, client) {
  if (err) {
    throw err;
  } else {
    db = client.db('memorial')
    console.log("Coneected to the database");

    app.listen(3000, () => {
      console.log(`Working on ${3000}`);
    });
  }
});
