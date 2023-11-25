const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;

// 導入 json 靜態資料，變數值為陣列
const restaurants = require("./public/json/restaurant.json").results;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants });
});

app.listen(port, () => {
  console.log(`The server runs on port ${port}`);
});
