document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Зміни 50 на висоту твого хедера
                behavior: 'smooth'
            });
        }
    });
});
