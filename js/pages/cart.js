let totalPrice = 0;

updateCart();

function deleteCartItem(e) {
  let parent = $(e.target).parents(".cart-item");
  let product = getProductByRef(parent.attr("data-item-id"));

  client.cartProducts.splice(client.cartProducts.indexOf(product), 1);

  updateCart();
}

$(".cart__reset__btn").click((e) => {
  client.cartProducts = [];
  updateCart();
});

$(".cart__checkout_btn").click((e) => {
  e.preventDefault();
  //  Submeter pedido de orçamento



  if(client.cartProducts.length){
    //  Observaçoes
    let observaçoes = $("#comments").val()


    $(".section--cart").addClass("section--cart--success")
    $(".section--cart__empty").remove();
    $(".section--cart__title").remove();
    $(".section--cart__body").remove();
    $(".section--cart__footer").remove();
  }
 
});

function getProductByRef(ref) {
  for (let i = 0; i < client.cartProducts.length; i++) {
    if (client.cartProducts[i].ref == ref) return client.cartProducts[i];
  }
}

function updateCart() {
  $(".section--cart__table__products").empty();
  totalPrice = 0;

  if (client.cartProducts.length) {
    $(".section--cart").removeClass("section--cart--empty");
    client.cartProducts.forEach((product) => {
      totalPrice += product.product.price * product.quantity;

      let productHTML = `
              <tr class="cart-item" data-item-id="${product.product.ref}">
                      <td class="cart-item__remove">
                          <button class="button cart-delete-item" type="button">
                              <img src="images/icons/close_red.svg" alt="">
                          </button>
                      </td>
                      <td class="cart-item__product">
                          <div class="cart-item__product__wrapper">
                              <div class="cart-item__product__image">
                                  <img src="${product.product.image}" alt="">
                              </div>
                              <div class="cart-item__product__info">
                                  <span class="cart-item__product__info__brand">${
                                    product.product.type
                                  }</span>
                                  <h6 class="cart-item__product__info__name">${
                                    product.product.name
                                  }</h6>
                                  <span class="cart-item__product__info__ref">Ref. <strong>${
                                    product.product.ref
                                  }</strong></span>
                                  <span
                                      class="cart-item__product__info__available cart-item__product__info__available--${
                                        product.product.available
                                      }"></span>
                              </div>
                          </div>
                      </td>
                      <td class="cart-item__price">${product.product.price.toFixed(
                        2
                      )}</td>
                      <td class="cart-item__quantity">
                          <div class="cart-item__quantity__counter">
                              <button type="button" class="cart-item__quantity__counter__fullminus"><img
                                  src="../../images/icons/cart/box-minus.svg" /></button>
                              <button type="button" class="cart-item__quantity__counter__decrement"><img
                                  src="../../images/icons/cart/cart-minus.svg" /></button>
                              <span class="cart-item__quantity__counter__counter">${
                                product.quantity
                              }</span>
                              <button type="button" class="cart-item__quantity__counter__increment"><img
                                  src="../../images/icons/cart/cart-plus.svg" /></button>
                              <button type="button" class="cart-item__quantity__counter__fullplus"><img
                                  src="../../images/icons/cart/box-plus.svg" /></button>
                          </div>
                      </td>
                  <td class="cart-item__total">${(
                    product.product.price * product.quantity
                  ).toFixed(2)}</td>
              </tr>
              `;

      $(".section--cart__table__products").append(productHTML);
    });

    $(".cart-delete-item").click(deleteCartItem);
  } else {
    $(".section--cart").addClass("section--cart--empty");
  }

  $(".section--cart__footer__checkout__total").html(totalPrice);
  $(".section--cart__footer__checkout__discount").html(totalPrice * 0.1);
  $(".section--cart__footer__checkout__liquid_total").html(
    totalPrice - totalPrice * 0.1
  );
}
