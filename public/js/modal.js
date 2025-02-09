document.addEventListener("DOMContentLoaded", function () {
    const modalButtons = document.querySelectorAll(".button"); // Всі кнопки відкриття
    const modals = document.querySelectorAll(".modal"); // Всі модальні вікна

    modalButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const modalClass = button.classList[0].replace("button-", "modal__"); // Отримуємо відповідний клас модалки
            const modal = document.querySelector(`.${modalClass}`);
            if (modal) {
                modal.classList.add("modal--active");
            }
        });
    });

    modals.forEach((modal) => {
        const closeButton = modal.querySelector(".modal__img"); // Хрестик закриття

        closeButton.addEventListener("click", () => {
            modal.classList.remove("modal--active");
        });

        // Закриття при кліку поза модальним вікном
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("modal--active");
            }
        });
    });
});
