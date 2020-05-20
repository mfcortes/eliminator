const morgan = require("morgan");
const express = require("express");
const static = express.static("public");

const app = express();
const port = process.env.PORT || 2000;

// Middleware
const morg = morgan("dev");
//const morg = morgan(':method :url :status :res[content-length] - :response-time ms');

app.use(morg);


app.listen(port, () => {
    console.log(`COnexcion en http://localhost:${port}`);
});

app.use(static);