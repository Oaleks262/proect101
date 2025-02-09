const swiper = new Swiper('.swiper-container', {


    loop: true,
    slidesPerView: 1,
    spaceBetween: 16,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 480px
      768: {
        slidesPerView: 1,

      },
      // when window width is >= 640px
      1280: {
        slidesPerView: 1,

      }
    },

    pagination: {
      el: '.pagination',
    },
  

    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
  

  });