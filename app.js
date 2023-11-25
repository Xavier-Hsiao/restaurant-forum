const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;

// 導入 json 靜態資料，變數值為陣列
const restaurants = require("./public/json/restaurant.json").results;

// 樣板引擎與靜態檔案設定
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// index 頁面路由
app.get("/", (req, res) => {
  res.render("index", { restaurants });
});

// 餐廳詳細頁面路由
app.get("/restaurants/:id", (req, res) => {
  // 從 req.params 物件取得 URL 中的餐廳 id
  const id = req.params.id;
  // 從餐廳陣列中找出符合 id 的餐廳
  const restaurant = restaurants.find(restau => restau.id.toString() === id);
  // 將符合 id 的餐廳物件傳給樣板引擎進行渲染
  res.render("show", { restaurant });
})


app.listen(port, () => {
  console.log(`The server runs on port ${port}`);
});
