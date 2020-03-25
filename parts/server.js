
var express = require("express");
var app = express();

app.get("/api/warehouse/parts", (req, res, next) => {
    res.json(["Nut", "Bolt", "Screw", "Nail", "Washer", "Shim"]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});