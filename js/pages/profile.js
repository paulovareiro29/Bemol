let url = new URLSearchParams(window.location.search);

updateOrcamentos();
updateContaCorrente();

updateFavorites();

$(".profile-menu__list__item").removeClass("profile-menu__list__item--active");
$(".profile-menu__list__item")
  .children()
  .filter(".profile-menu__list__item__content")
  .animate(
    {
      height: "hide",
    },
    0
  );

/** GET URL REF */
let option;
if ((option = url.get("option"))) {
  $(".profile-menu__list__item").removeClass(
    "profile-menu__list__item--active"
  );
  $(`#button-${option}`)
    .parents(".profile-menu__list__item")
    .addClass("profile-menu__list__item--active");

  $(`#button-${option}`)
    .parents(".profile-menu__list__item")
    .children()
    .filter(".profile-menu__list__item__content")
    .animate(
      {
        height: "show",
      },
      $(window).width() < 768 ? $(":root").css("--transition-time") : 0
    );

  setTimeout(() => {
    if ($(window).width() > 768) {
      let length = $(`#button-${option}`)
        .parents(".profile-menu__list__item")
        .children()
        .filter(".profile-menu__list__item__content")
        .outerHeight(true);

      console.log(length);

      $(".profile-menu").css({
        height: length > 494 ? length : 494,
      });
    }
  }, 100);
}

$(".profile-menu__list__item__button").click((e) => {
  //  Check if its the same that is active
  if (
    $(e.target)
      .parents(".profile-menu__list__item")
      .hasClass("profile-menu__list__item--active")
  ) {
    $(e.target)
      .parents(".profile-menu__list__item")
      .removeClass("profile-menu__list__item--active");
    $(e.target)
      .parents(".profile-menu__list__item")
      .children()
      .filter(".profile-menu__list__item__content")
      .animate(
        {
          height: "hide",
        },
        $(window).width() < 768 ? $(":root").css("--transition-time") : 0
      );

    return;
  }

  //  Remove active from all
  $(".profile-menu__list__item").removeClass(
    "profile-menu__list__item--active"
  );

  //  Hide all
  $(".profile-menu__list__item")
    .children()
    .filter(".profile-menu__list__item__content")
    .animate(
      {
        height: "hide",
      },
      0
    );

  //  Active the one that was clicked
  $(e.target)
    .parents(".profile-menu__list__item")
    .addClass("profile-menu__list__item--active");

  //  Show the one that is active
  $(e.target)
    .parents(".profile-menu__list__item")
    .children()
    .filter(".profile-menu__list__item__content")
    .animate(
      {
        height: "show",
      },
      $(window).width() < 768 ? $(":root").css("--transition-time") : 0
    );

  if ($(window).width() > 768) {
    let length = $(e.target)
      .parents(".profile-menu__list__item")
      .children()
      .filter(".profile-menu__list__item__content")
      .outerHeight(true);

    $(".profile-menu").css({
      height: length > 494 ? length : 494,
    });
  }
});

$(".profile__logout").click((e) => {
  //  LOGOUT

  //  REDIRECT
  window.location.href = "/";
});

//  ORCAMENTOS

function updateOrcamentos() {
  if (client.budgets.length) {
    client.budgets.forEach((budget) => {
      let budgetHTML = `
      <tr>
        <td class="budgets-id">${budget.id}</td>
        <td class="text-center budgets-date">${budget.date}</td>
        <td class="text-center budgets-status budgets-status--${
          budget.status
        }">${
        budget.status == "success"
          ? "Successo"
          : budget.status == "processing"
          ? "Em processamento"
          : ""
      }</td>
        <td class="text-right budgets-total">${budget.total}</td>
      </tr>
      
      `;

      $(".budgets-table__content").append(budgetHTML);
    });
  } else {
    $("#budgets.budgets").empty();
    $("#budgets.budgets").append(
      `
      <div class="budgets-empty">
        <img src="../../images/icons/close_green.svg" />
        <h4>Não tem encomendas.</h4>
      </div>
    `
    );
  }
}

function updateContaCorrente() {
  if (client.contascorrente.length) {
    client.contascorrente.forEach((conta) => {
      let budgetHTML = `
      <tr>
        <td class="contacorrente-date">${conta.date}</td>
        <td class="text-center contacorrente-expire-date"> ${conta.expiredate}</td>
        <td class="text-center contacorrente-document">${conta.document}</td>
        <td class="text-center contacorrente-ndoc">${conta.ndoc}</td>
        <td class="text-center contacorrente-price">${conta.price}</td>
        <td class="text-center contacorrente-pendent">${conta.pendent}</td>
        <td class="text-right text-danger">${conta.status}</td>
      </tr>
      
      `;

      $(".contacorrente-table__content").append(budgetHTML);
    });
  } else {
    $("#contacorrente.contacorrente").empty();
    $("#contacorrente.contacorrente").append(
      `
      <div class="contacorrente-empty">
        <img src="../../images/icons/close_green.svg" />
        <h4>Não tem histórico de conta-corrente.</h4>
      </div>
    `
    );
  }
}

function updateFavorites() {
  $(".favorites-grid").empty();

  if (client.favoriteProducts.length) {
    client.favoriteProducts.forEach((product) => {
      let productHTML = `
  <div class="col-6 col-md-4">
  <div class="favorite-item">
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
        <button class="button button--outline remove-item-btn">REMOVER</button>
        </div>
        </div>
        `;

      $(".favorites-grid").append(productHTML);
    });
  } else {
    $(".favorites-grid").append(`
      <div class="favorites-empty">
        <img src="../../images/icons/heart-green--outline.svg">
        <h4>Não tem favoritos.</h4>
      </div>
    `);
  }

  //  FAVORITOS
  $(".favorites .remove-item-btn").click((e) => {
    const ref = $(e.target)
      .parents(".favorite-item")
      .children()
      .filter(".product_item")
      .attr("data-product-id");

    $(e.target).parents(".col-6.col-md-4").remove();

    //  REMOVE FROM FAVORITES DB
    removeFromFavorites(ref);

    //  UPDATE
    updateFavorites();
  });

  setTimeout(() => {
    updateHeight();
  }, 100);
}

$(".favorites-empty-btn").click((e) => {
  client.favoriteProducts = [];

  updateFavorites();
});

function updateHeight() {
  if ($(window).width() > 768) {
    let length = $(".profile-menu__list__item--active")
      .children()
      .filter(".profile-menu__list__item__content")
      .outerHeight(true);

    $(".profile-menu").css({
      height: length > 494 ? length : 494,
    });
  }
}
