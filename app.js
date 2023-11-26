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
  const restaurant = restaurants.find((restau) => restau.id.toString() === id);
  // 將符合 id 的餐廳物件傳給樣板引擎進行渲染
  res.render("show", { restaurant });
});

// 搜尋餐廳路由
app.get("/search", (req, res) => {
  // 取得使用者於搜尋欄輸入的關鍵字
  const keyword = req.query.keyword.trim();
  // 檢查使用者是否有輸入關鍵字
  if (!keyword.length) {
    return res.redirect("/");
  }
  // 透過關鍵字找出餐廳陣列中符合的餐廳
  // 🙀 踩雷紀錄：這邊原先我用 array.find 但這樣是不行的，因為 find 回傳的不是陣列，會造成在 index.hbs 渲染失敗
  const matchedRestaurants = restaurants.filter((restaurant) =>
    // 將每一家餐廳物件的值取出來，回傳新的陣列，透過 array.some 來比對關鍵字
    Object.values(restaurant).some((property) => {
      // 只比對字串屬性
      if (typeof property === "string") {
        return property.toLowerCase().includes(keyword.toLowerCase());
      }
      return false;
    })
  );

  console.log(matchedRestaurants);

  res.render("index", { restaurants: matchedRestaurants, keyword });
});

app.listen(port, () => {
  console.log(`The server runs on port ${port}`);
});
