const express = require("express");
const app = express();
const cors = require("cors");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
);
app.use(require("./routes/submitcv"));
app.get("/", (req, res) => {
    return res.json({
        message: "Server is running",
        active: true,
    });
});

app.listen(1337, () => {
    console.log("Node Server running on  port 1337");
});
