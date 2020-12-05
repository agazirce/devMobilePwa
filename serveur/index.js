const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

let favoris = [];

const jsonParser = bodyParser.json();
app.use(cors());

app.get("/favoris", (request, response) => {
    response.send(favoris);
});

app.post("/favoris", jsonParser, (request, response) => {
    console.log(request.body);
    favoris = request.body;
    response.send(favoris);
});

app.listen(port, err => {
    console.log(`server is listening on ${port}`);
});