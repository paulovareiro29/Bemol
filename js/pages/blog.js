//SIDEBAR
$(".blog-filter__menu__content").animate(
    {
      height: "hide",
    },
    0
  );
  
  $(".blog-filter__submenu__content").animate(
    {
      height: "hide",
    },
    0
  );
  
  $(".blog-filter__menu__title").click((e) => {
    $(e.target)
      .parents(".blog-filter__menu")
      .find(".blog-filter__menu__content")
      .animate(
        {
          height: "toggle",
        },
        $(":root").css("--transition-time")
      );
  });
  
  $(".blog-filter__submenu__title").click((e) => {
    $(e.target)
      .parents(".blog-filter__submenu")
      .find(".blog-filter__submenu__content")
      .animate(
        {
          height: "toggle",
        },
        $(":root").css("--transition-time")
      );
  });