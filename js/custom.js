//  HEADER Toggle Menu
$(".header__navbar__menu").animate(
  {
    height: "hide",
  },
  0
);

$(".header__navbar__trigger").click((e) => {
  $(".header__navbar__menu").animate(
    {
      height: "toggle",
    },
    $("window").css("--transition-time")
  );

  $(".wic-overlay").toggleClass("wic-overlay--active");
});

//  HEADER Dropdowns
$(".header__navbar__menu__dropdown__toggle").next().animate(
  {
    height: "hide",
  },
  0
);

let dropDowns = $(".header__navbar__menu__dropdown__toggle").click((e) => {
  let transitionTime = $(":root").css("--transition-time");

  let menuItems = $(".header__navbar__menu__dropdown__toggle");
  $.each(menuItems, (key, elem) => {
    if (elem != e.target) {
      $(elem).parent().removeClass("header__navbar__menu__dropdown--active");
      $(elem)
        .next()
        .animate(
          {
            height: "hide",
          },
          $(window).width() < 768 ? transitionTime : 0
        );
    }
  });

  $(e.target).parent().toggleClass("header__navbar__menu__dropdown--active");
  $(e.target)
    .next()
    .animate(
      {
        height: "toggle",
        display: "flex",
      },
      $(window).width() < 768 ? transitionTime : 0
    );
});







//  Products





