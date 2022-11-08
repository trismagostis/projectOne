const express = require("express");
const app = express();
const cors = require("cors");
const courseApi = require("./app/api/courseApi");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api", courseApi);
app.get("/", function (req, res) {
  res.send("<h2>Cześć</h2>");
});
app.listen(8080, function () {
  console.log("Serwer działa");
});
