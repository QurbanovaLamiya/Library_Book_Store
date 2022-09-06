$(document).ready(() => {
  $(".owl-carousel1").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 30,
    nav: true,
    navText: [
      "<img src='./assets/images/prev.svg'>",
      "<img src='./assets/images/next.svg'>",
    ],
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
  });

  $("#categoryAppend li a").click(function () {});

  function getBooksInfo() {
    myDatabase.ref("/books").on("value", function (snap) {
      let bookInfoArr = Object.entries(snap.val()).reverse();
      let bookInfoObjArr = bookInfoArr.map((item) => {
        return {
          id: item[0],
          ...item[1],
        };
      });

      console.log(bookInfoObjArr);
    });
  }
  getBooksInfo();

  // let sidebar2 = $(".navbar ");
  // $(".navbar-toggler").click(function () {
  //   $(".catalog-main").hide();
  //   $(".socialMediaSectio").hide();
  //   sidebar2.show();
  // });
});
