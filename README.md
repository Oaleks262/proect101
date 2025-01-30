# 🏥 Сайт для лікаря-психотерапевта

## 📢 Опис проекту
Цей проект – це **комерційний веб-сайт для лікаря-психотерапевта**, який надає інформацію про послуги, прийом пацієнтів та контактні дані. Також реалізована **форма зворотного зв’язку**, яка надсилає повідомлення лікарю. 

Сайт включає:
- Головну сторінку з описом послуг
- Відгуки пацієнтів
- Функцію запису на прийом
- Інтерактивний **Swiper.js** 
- Адаптивний дизайн для мобільних пристроїв

---

## 📂 Структура проекту
```
/backend-psychotherapy
│── /public            # Статичні файли (HTML, CSS, JS)
│   ├── index.html     # Головна сторінка
│   ├── styles.css     # Стилі сайту
│   ├── script.js      # Логіка форми
│   ├── swiper.js      # Ініціалізація Swiper.js
│── /server            # Бекенд на Express
│   ├── index.js      # Головний серверний файл
│── .env               # Файл з налаштуваннями
│── .gitignore         # Файл ігнорування для Git
│── package.json       # Конфігурація проекту
│── README.md          # Документація
```

---

## 🔧 Встановлення та запуск

### 1️⃣ **Клонування репозиторію**
```bash
git clone https://github.com/your-repo/proect101.git
cd proect101
```

### 2️⃣ **Встановлення залежностей**
```bash
npm install
```

### 3️⃣ **Налаштування `.env`**
Створіть файл `.env` і додайте:
```
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
OWNER_EMAIL=doctor_email@gmail.com
```
⚠ **Якщо використовуєте Gmail, потрібно отримати App Password**
👉 [Як отримати App Password у Gmail](https://support.google.com/accounts/answer/185833?hl=uk)

### 4️⃣ **Запуск сервера**
```bash
node server/index.js
```
або з `nodemon` (для автооновлення):
```bash
nodemon server/index.js
```

Сервер буде доступний за адресою: **http://localhost:5000**

---

## 🖥️ Функціонал

### 📄 **Головна сторінка (`public/index.html`)**
- Інформація про лікаря та його послуги
- Відгуки пацієнтів (Swiper.js)
- Форма для запису на прийом

### 📜 **Логіка форми (`public/script.js`)**
- Відправка запиту на `/send-email`
- Відображення повідомлення про успіх або помилку

### 🎡 **Ініціалізація Swiper.js (`public/swiper.js`)**
```javascript
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});
```

### 📦 **Підключення `Swiper.js` в `index.html`**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
<script src="swiper.js"></script>
```

---

## 📬 API

### 🔹 `POST /send-email`
**Опис:** Відправляє дані форми на email лікаря.

**Тіло запиту:**
```json
{
  "name": "Ім'я",
  "phone": "+380** *** ** **",
  "message": "Текст повідомлення"
}
```

**Приклад відповіді:**
```json
{
  "success": true,
  "message": "Лист успішно надіслано!"
}
```

---

## ✅ Готово!
Тепер у вас є **комерційний сайт для лікаря-психотерапевта** із записом на прийом та інтерактивним дизайном 🚀

