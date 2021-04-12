//SIDEBAR
$(".shop-filter__menu__content").animate(
  {
    height: "hide",
  },
  0
);

$(".shop-filter__submenu__content").animate(
  {
    height: "hide",
  },
  0
);

$(".shop-filter__menu__title").click((e) => {
  $(e.target)
    .parents(".shop-filter__menu")
    .find(".shop-filter__menu__content")
    .animate(
      {
        height: "toggle",
      },
      $(":root").css("--transition-time")
    );
});

$(".shop-filter__submenu__title").click((e) => {
  $(e.target)
    .parents(".shop-filter__submenu")
    .find(".shop-filter__submenu__content")
    .animate(
      {
        height: "toggle",
      },
      $(":root").css("--transition-time")
    );
});

shopProducts.forEach((product) => {
  let productHTML = `
    <div class="grid-item">
    <div class="product_item" data-product-id="${product.ref}">
        <div class="product_item__wrapper">
            <img class="product_item__image" src="${product.image}" alt="">
            <button class="button product_item__wrapper__add-cart">
                ADICIONAR
            </button>
            <button
                class="product_item__wrapper__circle product_item__wrapper__circle--wishlist">
                <img src="${
                  product.favorite
                    ? "images/icons/heart_green.svg"
                    : "images/icons/products/wishlist.svg"
                }" alt="">
            </button>
            <div class="product_item__wrapper__circle product_item__wrapper__circle--discount">
                <span>${product.discount}%</span>
            </div>
            ${
              product.recyclable
                ? `
                <div class="product_item__wrapper__circle product_item__wrapper__circle--trash">
                    <img src="images/icons/products/yellow-trash.svg" alt="">
                </div>
                `
                : ``
            }
            
            <div class="product_item__wrapper__circle product_item__wrapper__circle--availability product_item__wrapper__circle--availability-${
              product.available
            }"></div>
        </div>
        <div class="product_item__info">
            <h5 class="product_item__info__type">${product.type}</h5>
            <h3 class="product_item__info__name">${product.name}</h3>
            <h2 class="product_item__info__price">${product.price}</h2>
        </div>
    </div>
    </div>
    `;

  $(".section--content__shop__grid").append(productHTML);
});
$("#product-modal").modal({
  show: false,
  keyboard: true,
});

$(".product_item__wrapper__add-cart").click((e) => {
  if ($(window).width() < 768) {
    window.location.href =
      "/product?ref=" +
      $(e.target).parents(".product_item").first().attr("data-product-id");
  } else {
    const product = getProductByRef(
      $(e.target).parents(".product_item").first().attr("data-product-id")
    );

    $(".product-modal__dialog").html(
      `
    <div class="product-modal__dialog__content modal-content">
                    <div class="product-modal__dialog__content__image">
                        <img src="${product.image}" alt="">
                    </div>
                    <div class="product-modal__dialog__content__info">

                        <div class="product-modal__dialog__content__info__header">
                            <div>
                                <span class="product-modal__dialog__content__info__header__brand">${
                                  product.type
                                }</span>
                                <h4 class="product-modal__dialog__content__info__header__name"><a href="/product.html?ref=${product.ref}">${
                                  product.name
                                }</a>
                                </h4>
                            </div>
                            <div class="product-modal__dialog__content__info__header__price">
                                <span class="product-modal__dialog__content__info__header__price__old">39,00</span>
                                <span class="product-modal__dialog__content__info__header__price__new">${
                                  product.price
                                }</span>
                            </div>
                        </div>

                        <div class="product-modal__dialog__content__info__body">
                            ${
                              product.recyclable
                                ? `
                            <div class="product-modal__dialog__content__info__body__recyclable"><img
                            src="images/icons/products/yellow-trash.svg" alt=""></div>
                            `
                                : ``
                            }
                            <div class="product-modal__dialog__content__info__body__ref">
                                <span>Ref. <strong>${
                                  product.ref
                                }</strong></span>
                            </div>
                            <span
                                class="product-modal__dialog__content__info__body__available product-modal__dialog__content__info__body__available--${
                                  product.available
                                }">
                                <span>${
                                  product.available == "unavailable"
                                    ? "Indísponivel"
                                    : product.available == "available"
                                    ? "Disponível"
                                    : product.available == "partial"
                                    ? "Quase Esgotado"
                                    : ""
                                }</span>
                            </span>
                        </div>

                        <div class="product-modal__dialog__content__info__footer">
                            <div class="product-modal__dialog__content__info__footer__quantity">
                                <span>Seleccione a quantidade:</span>
                                <div class="product-modal__dialog__content__info__footer__quantity__counter">
                                    <button type="button"
                                        class="product-modal__dialog__content__info__footer__quantity__counter__fullminus"><img
                                            src="../../images/icons/cart/box-minus.svg" /></button>
                                    <button type="button"
                                        class="product-modal__dialog__content__info__footer__quantity__counter__decrement"><img
                                            src="../../images/icons/cart/cart-minus.svg" /></button>
                                    <span
                                        class="product-modal__dialog__content__info__footer__quantity__counter__counter"></span>
                                    <button type="button"
                                        class="product-modal__dialog__content__info__footer__quantity__counter__increment"><img
                                            src="../../images/icons/cart/cart-plus.svg" /></button>
                                    <button type="button"
                                        class="product-modal__dialog__content__info__footer__quantity__counter__fullplus"><img
                                            src="../../images/icons/cart/box-plus.svg" /></button>
                                </div>
                            </div>

                            <button type="button"
                                class="button button--primary product-modal__dialog__content__info__footer__add-to-cart">ADICIONAR
                                <img src="images/icons/list-xs-outline-white.svg"></button>
                        </div>
                    </div>
                </div>
    `
    );
    $("#product-modal").modal("toggle");
  }
});

function getProductByRef(ref) {
  for (let i = 0; i < shopProducts.length; i++) {
    if (shopProducts[i].ref == ref) return shopProducts[i];
  }
}
