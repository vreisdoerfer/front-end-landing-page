var express = require("express");
var app = express();
const path = require('path');
//DEFAULT ROUTE
app.get("", (req, res, next) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use(express.static(path.join(__dirname, '/')));
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});