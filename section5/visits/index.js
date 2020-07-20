const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server", // Comes from the docker-compose.yml. docker-compose will assume this refers to the redis-sever in the docker-compose file
  port: 6379,
});

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
