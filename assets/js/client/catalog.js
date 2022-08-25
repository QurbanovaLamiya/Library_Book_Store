$(document).ready(() => {
    $(".owl-carousel1").owlCarousel({
      autoplay: true,
      autoplayTimeout: 3000,
      loop: true,
      margin: 30,
      nav: true,
      navText: ["<img src='./assets/images/prev.svg'>", "<img src='./assets/images/next.svg'>"],
      responsive: {
        0: {
          items: 1,
        },
        577: {
          items: 2,
        },
        1100: {
          items: 4,
        },
        1200: {
          items: 5,
        },
      },
    }) 
  })

