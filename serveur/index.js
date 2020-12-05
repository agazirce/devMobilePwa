const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let favoris = [];

app.use(express.json({type: '*/*'}));
app.use(cors());

app.get("/favoris", (request, response) => {
    response.send(favoris);
});

app.post("/favoris", (request, response) => {
    console.log(request.body);
    favoris = JSON.stringify(request.body);
    console.log(favoris)
    response.json({ text: 'test' });
});

app.listen(port, err => {
    console.log(`server is listening on ${port}`);
});