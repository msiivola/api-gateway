
var express = require("express");
var app = express();

// app. get('/', (req, res, next) => {
//     res.json(["animals"])
// });

app.get("/api/zoo/animals", (req, res, next) => {
    res.json(["Dog", "Horse", "Cat", "Tiger", "Zebra"]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});