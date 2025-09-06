// app.js
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

// ميدل وير
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const shoppingItems = [
  { name: "نجيلة طبيعية", price: 100, quantity: 1 },
  { name: "نجيلة صناعية", price: 80, quantity: 1 },
];

app.get("/", (req, res) => {
  res.send("✅ السيرفر شغال على Railway! جرب /products أو /contact");
});

app.get("/products", (req, res) => {
  res.json(shoppingItems); // نرجع البيانات كـ JSON للتجربة
});

app.get("/contact", (req, res) => {
  res.send("📞 صفحة التواصل شغالة!");
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
