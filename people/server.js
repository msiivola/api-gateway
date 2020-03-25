
var express = require("express");
var app = express();

// app.get("/api/warehouse/", (req, res, next) => {
//     res.json(["people"]);
// });

app.get("/api/warehouse/people", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Harry"]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});