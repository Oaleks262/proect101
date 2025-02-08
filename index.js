require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Використання статичних файлів (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Middleware для обробки JSON
app.use(express.json());

// Головна сторінка (якщо потрібно)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
});
