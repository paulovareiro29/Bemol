let product = undefined;

let url = new URLSearchParams(window.location.search);

/** LOAD CAROUSEL */
for (let i = 0; i < shopProducts.length; i++) {
  let p = shopProducts[i];

  let productHTML = `
  <div class="highlight_item col-6">
    <div class="product_item" data-product-id="${p.ref}">
        <div class="product_item__wrapper">
            <img class="product_item__image" src="${p.image}" alt="">
            <button class="button product_item__wrapper__add-cart">
                ADICIONAR
            </button>
            <button
                class="product_item__wrapper__circle product_item__wrapper__circle--wishlist">
                <img src="${
                  p.favorite
                    ? "images/icons/heart_green.svg"
                    : "images/icons/products/wishlist.svg"
                }" alt="">
            </button>
            <div class="product_item__wrapper__circle product_item__wrapper__circle--discount">
                <span>${p.discount}%</span>
            </div>
            ${
              p.recyclable
                ? `
                <div class="product_item__wrapper__circle product_item__wrapper__circle--trash">
                    <img src="images/icons/products/yellow-trash.svg" alt="">
                </div>
                `
                : ``
            }
            
            <div class="product_item__wrapper__circle product_item__wrapper__circle--availability product_item__wrapper__circle--availability-${
              p.available
            }"></div>
        </div>
        <div class="product_item__info">
            <h5 class="product_item__info__type">${p.type}</h5>
            <h3 class="product_item__info__name">${p.name}</h3>
            <h2 class="product_item__info__price">${p.price}</h2>
        </div>
    </div>
    </div>
    `;

  $(".section--highlights__carousel").append(productHTML);

  if (i < 4) {
    $(".section--highlights__mobile__content").append(productHTML);
  }

  /** GET URL REF */
  if (p.ref == url.get("ref")) {
    product = p;
  }
}

$(".section--product__container").html(
  `
    <div class="single-product">
    <div class="single-product__image">
        <img src="${product.image}" alt="">
    </div>
    <div class="single-product__info">
        <div class="single-product__info__header">
            <div>
                <span class="single-product__info__header__brand">${
                  product.type
                }</span>
                <h4 class="single-product__info__header__name">${product.name}
                </h4>
            </div>
            <div class="single-product__info__header__price">
                <span class="single-product__info__header__price__old">39,00</span>
                <span class="single-product__info__header__price__new">${
                  product.price
                }</span>
            </div>
        </div>
        <div class="single-product__info__body">
            <div class="single-product__info__body__description">
                <p>${product.description}</p>
            </div>

            <div class="single-product__info__body__extra">
            ${
              product.recyclable
                ? `
            <div class="single-product__info__body__extra__recyclable">
                    <img src="images/icons/products/yellow-trash.svg" alt="">
                </div>
            `
                : ""
            }
                

                <div class="single-product__info__body__extra__ref">
                    <span>Ref. <strong>${product.ref}</strong></span>
                </div>

                <span
                    class="single-product__info__body__extra__available single-product__info__body__extra__available--${
                      product.available
                    }">
                    <span>${
                      product.available == "available"
                        ? "Disponível"
                        : product.available == "unavailable"
                        ? "Indisponível"
                        : product.available == "partial"
                        ? "Quase esgotado"
                        : ""
                    }</span>
                </span>
            </div>
        </div>

        <div class="single-product__info__footer">
            <div class="single-product__info__footer__options">
                <div class="single-product__info__footer__options__quantity">
                    <span>Seleccione a quantidade:</span>
                    <div class="single-product__info__footer__options__quantity__counter">
                        <button type="button"
                            class="single-product__info__footer__options__quantity__counter__fullminus"><img
                                src="../../images/icons/cart/box-minus.svg" /></button>
                        <button type="button"
                            class="single-product__info__footer__options__quantity__counter__decrement"><img
                                src="../../images/icons/cart/cart-minus.svg" /></button>
                        <span class="single-product__info__footer__quantity__counter__counter"></span>
                        <button type="button"
                            class="single-product__info__footer__options__quantity__counter__increment"><img
                                src="../../images/icons/cart/cart-plus.svg" /></button>
                        <button type="button"
                            class="single-product__info__footer__options__quantity__counter__fullplus"><img
                                src="../../images/icons/cart/box-plus.svg" /></button>
                    </div>
                </div>

                <div class="single-product__info__footer__options__size">
                    <span>Seleccione o tamanho:</span>
                    <select class="single-product__info__footer__options__size__select form-control">
                        <option selected="selected" value="75ml">75ml</option>
                        <option value="100ml">100ml</option>
                        <option value="150ml">150ml</option>
                        <option value="300ml">300ml</option>
                        <option value="500ml">500ml</option>
                        <option value="1000ml">1000ml</option>
                    </select>
                </div>
            </div>


            <div class="single-product__info__footer__buttons">
                <button type="button"
                    class="button button--primary single-product__info__footer__buttons__add-to-cart">ADICIONAR
                    <img src="images/icons/list-xs-outline-white.svg"></button>

                <button type="button"
                    class="button button--outline-primary single-product__info__footer__buttons__add-to-favorites">FAVORITOS
                    <img src="images/icons/heart-xs-outline.svg"></button>
            </div>

        </div>
    </div>
</div>
    `
);
