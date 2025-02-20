require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const CONTENT_FILE = path.join(__dirname, "content.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// Використання статичних файлів (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Middleware для обробки JSON
app.use(express.json());

// Головна сторінка (якщо потрібно)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Авторизація адміністратора
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "Невірний пароль" });
});

// Middleware для перевірки токена
const authenticateAdmin = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ success: false, message: "Доступ заборонено" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Невірний токен" });
    }
    req.admin = decoded.admin;
    next();
  });
};

// Отримання тексту для відображення
app.get("/api/content", (req, res) => {
  fs.readFile(CONTENT_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Помилка читання файлу" });
    }
    res.json(JSON.parse(data));
  });
});

// Оновлення тексту (тільки для адмінів)
app.post("/api/content", authenticateAdmin, (req, res) => {
  const { text, link } = req.body;

  if (!text || !link) {
    return res.status(400).json({ success: false, message: "Усі поля обов'язкові!" });
  }

  const updatedData = { text, link };

  fs.writeFile(CONTENT_FILE, JSON.stringify(updatedData), "utf8", (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Помилка запису у файл" });
    }
    res.json({ success: true, message: "Дані оновлено!" });
  });
});

// Обробка форми
app.post("/send-email", async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: "Всі поля обов'язкові!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: "Нова заявка з форми на сертефікат",
      html: `
        <h2>Нове повідомлення з форми</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Повідомлення:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Лист успішно надіслано!" });
  } catch (error) {
    console.error("Помилка при надсиланні листа:", error);
    res.status(500).json({ success: false, message: "Помилка при надсиланні листа" });
  }
});


// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на http://localhost:${PORT}`);

  // Якщо файл контенту не існує, створити його
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify({ text: "Тут буде ваш текст" }), "utf8");
}

});

