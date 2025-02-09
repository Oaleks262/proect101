document.addEventListener("DOMContentLoaded", function () {
    const mobileBtn = document.querySelector(".mobileBtn");
    const mobileMenu = document.querySelector(".mobileMenu");
    const closeBtn = document.querySelector(".mobileMenu__close");

    // Відкриття меню
    mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    // Закриття меню при натисканні на кнопку закриття
    closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

    // Закриття меню при кліку поза ним
    document.addEventListener("click", (event) => {
        if (!mobileMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
            mobileMenu.classList.remove("active");
        }
    });

    // Закриття меню при кліку на посилання
    document.querySelectorAll(".mobileMenu__link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });
});
