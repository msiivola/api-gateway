
var express = require("express");
var app = express();

app.get("/api/tools/all", (req, res, next) => {
    res.json(["Hammer", "Chisel", "Saw", "Grinder", "Drill"]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});