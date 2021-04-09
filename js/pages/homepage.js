for (let i = 0; i < shopProducts.length; i++) {
    let product = shopProducts[i]

  let productHTML = `
  <div class="highlight_item col-6">
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

  $(".section--highlights__desktop").append(productHTML);

  if(i < 4){
    $(".section--highlights__mobile__content").append(productHTML);
  }
  
}
