const app = require("./index");
const connect = require("./configs/db.connect");

app.listen(5000, async () => {
    try {
        await connect();
        console.log("listening at port 5000")
    } catch (err) {
        console.error(err.message);
    }
});