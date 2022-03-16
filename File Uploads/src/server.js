const app = require("./index");

const connect = require("./configs/db.connect");

app.listen(6000, async () => {
  try {
    await connect();
    console.log("listining at port 6000");
  } catch (err) {
    console.log(err);
  }
});
