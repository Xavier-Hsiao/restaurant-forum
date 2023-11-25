const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;

app.engine("handlebars", engine({extname: ".hbs"}));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("This is my first route!");
});

app.listen(port, () => {
  console.log(`The server runs on port ${port}`);
});
