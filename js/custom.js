let client = {
  id: 117,
  name: "Alexandre Vieira",
  loggedIn: true,
  cartProducts: [],
  favoriteProducts: []
}
let shopProducts = [];

/** TESTING PURPOSES */
images = ["../../images/product.png"];
available = ["unavailable", "available", "partial"];

trueOrFalse = [true, false];

function random(array) {
  let random = (Math.random() * (array.length - 1)).toFixed(0);
  return array[random];
}

//  SHOP ITEMS
for (let i = 0; i < 12; i++) {
  let product = {
    image: random(images),
    ref: 123450 + i,
    type: "Embal",
    name: "Forma de alumínio <br> 80 x 50",
    price: "35,00",
    available: random(available),
    recyclable: random(trueOrFalse),
    discount: (Math.random() * 100).toFixed(0),
    favorite: random(trueOrFalse),
    description: `Indicada para praticamente todo o tipo de materiais, a cola universal líquida da UHU®
    garante uma adesão eficaz.
    Capaz de colar em quase todas as superfícies, a cola universal da UHU® é ideal para
    projectos de trabalhos manuais escolares ou para pequenas reparações em casa.`
  }


  shopProducts.push(product);
}

//  CART/FAVORITES ITEMS
for (let i = 0; i < 5; i++) {

  shopProducts[i].favorite = true;

  client.cartProducts.push({
    product: shopProducts[i],
    quantity: (Math.random() * 20 + 1).toFixed(0)
  })

  client.favoriteProducts.push(shopProducts[i])

}
//  END TEST


import("./modules/popovers.js");


//  HEADER MOBILE SEARCH BUTTON
$(".header__main__buttons__button--search").click((e) => {
  //  OPEN MENU
  $(".header__navbar__menu").animate(
    {
      height: "show",
    },
    $("window").css("--transition-time")
  );
  $(".wic-overlay").addClass("wic-overlay--active");

  //  FOCUS ON INPUT
  $(".header__navbar__menu__search input").focus();
});

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

//  POPOVER TEMPLATE
$(".navbar-popover-trigger").popover({
  trigger: "click",
  placement: "bottom",
  offset: "0 , 37",
  html: true,
  sanitize: false,
  title: "BLANK",
  content: "BLANK",
  template: `
        <div class="popover navbar-popover" role="tooltip">
          <div class="popover-header navbar-popover__title"></div>
          <div class="popover-body navbar-popover__body"></div>
        </div>`,
});

//  FOOTER
$(".footer__content__links .widget .widget-title").click((e) => {
  if ($(window).width() < 768) {
    $(e.target).next().animate({
      height: "toggle",
    });
  }
});

$(window).bind("breakpoint-change", (breakpoint) => {
  if ($(window).width() < 768) {
    $(".footer__content__links .widget .widget-list").animate(
      {
        height: "hide",
      },
      0
    );
  } else {
    $(".footer__content__links .widget .widget-list").animate(
      {
        height: "show",
      },
      0
    );
  }
});

//  WIC
//    DIVISION
$(".wic-division__close").click((e) => {
  $(e.target).parents(".wic-division").remove();
});
