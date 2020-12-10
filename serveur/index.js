const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

let favoris = [];

// for express v4.16.*
app.use(express.json({type: '*/*'}));
app.use(cors());

app.get("/favoris", (request, response) => {
    response.json(JSON.stringify(favoris));
});

app.post("/favoris", (request, response) => {
    request.body.forEach(function (img) {
        let indexFav = favoris.map(function(e) { return e.img; }).indexOf(img.img);
        if (indexFav === -1) {
            favoris.push(img);
        } else {
            favoris.splice(indexFav, 1);
        }
    })
    console.log(favoris)
    response.json(JSON.stringify(favoris));
});

app.listen(port, err => {
    console.log(`server is listening on ${port}`);
});