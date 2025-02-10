document.addEventListener("DOMContentLoaded", function () {
    const modalButtons = document.querySelectorAll(".button"); // Всі кнопки відкриття
    const modals = document.querySelectorAll(".modal"); // Всі модальні вікна

    modalButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            // Якщо це посилання з href, не блокуємо його
            if (button.tagName === "A" && button.getAttribute("href") !== "#") {
                return;
            }

            e.preventDefault(); // Блокуємо тільки для кнопок або посилань з href="#"
            const modalClass = button.classList[0].replace("button-", "modal__");
            const modal = document.querySelector(`.${modalClass}`);
            if (modal) {
                modal.classList.add("modal--active");
            }
        });
    });

    modals.forEach((modal) => {
        const closeButton = modal.querySelector(".modal__img"); // Хрестик закриття

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                modal.classList.remove("modal--active");
            });
        }

        // Закриття при кліку поза модальним вікном
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("modal--active");
            }
        });
    });
});
