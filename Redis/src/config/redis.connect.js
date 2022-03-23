const { createClient } = require("redis");

const client = createClient("redes://localhost:6379");

client.on("error", function (err) {
  console.error({ redisConnect: err.message });
});


module.exports=client;