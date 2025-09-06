const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// استخدام PORT من البيئة أو 3000 محليًا
const PORT = process.env.PORT || 3000;

// الاتصال بقاعدة البيانات (Atlas)
const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Arafa:Arafa123@cluster0.zdjypgk.mongodb.net/3rafa_data?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// إعدادات محرك القوالب hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ميدل وير
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// بيانات تجريبية (ممكن تتخزن في MongoDB بعدين)
const shoppingItems = [
  {
    id: 1,
    productName: "نجيلة طبيعية",
    price: 100,
    quantity: 1,
    images: ["https://via.placeholder.com/400x200?text=نجيلة+طبيعية"],
    descriptions: ["نجيلة عالية الجودة ومناسبة للحدائق"],
    videoPath: "",
  },
  {
    id: 2,
    productName: "نجيلة صناعية",
    price: 80,
    quantity: 1,
    images: ["https://via.placeholder.com/400x200?text=نجيلة+صناعية"],
    descriptions: ["نجيلة صناعية عملية وسهلة التركيب"],
    videoPath: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { arr: shoppingItems });
});

app.get("/products", (req, res) => {
  res.render("products", { arr: shoppingItems });
});

app.get("/product/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = shoppingItems.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).send("❌ المنتج غير موجود");
  }

  res.render("product", { obj: product });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});

module.exports = app;
