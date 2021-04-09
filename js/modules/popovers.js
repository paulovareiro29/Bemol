
let favoriteProducts = client.favoriteProducts
let cartProducts = client.cartProducts


//  HEADER popover template
function user() {
  let popover = {
    title: `<img src="../../images/icons/user.svg"/><span>A MINHA CONTA</span>`,
    content: "",
  };

  if (client.loggedIn) {
    popover.content = `
    <div class="navbar-popover--user-loggedin">
      <ul>
        <li><a href="#">Meu perfil</a></li>
        <li><a href="#">Locais de descarga</a></li>
        <li><a href="#">Orçamentos</a></li>
        <li><a href="#">Conta-corrente</a></li>
        <li><a href="#">Favoritos</a></li>
      </ul>
      <button type="button" class="button button--primary logout-button">TERMINAR SESSÃO</button>
    </div>
    `;
  } else {
    popover.content = `
      <div class="navbar-popover--user-signup">
        <p>Entrar na minha conta</p>
        <a href="/login"  class="button button--primary">INICIAR SESSÃO</a>

        <p>Registar-me</p>
        <a href="/register" class="button button--outline-secondary">CRIAR CONTA</a>
      </div>   
      `;
  }

  return popover;
}

function favorites() {
  let popover = {
    title: `<img src="../../images/icons/heart.svg"/><span>FAVORITOS</span>`,
    content: "",
  };

  if (favoriteProducts.length && client.loggedIn) {
    //  Product object to HTML
    let productsHTML = "";
    favoriteProducts.forEach((product, k) => {
      if (k >= 3) return;

      productsHTML += `
  <div class="navbar-popover--favorites__product">
    <div class="navbar-popover--favorites__product__image">
      <img src="${product.image}" />
    </div>
    
    <div class="navbar-popover--favorites__product__info">
      <p class="navbar-popover--favorites__product__info__brand">${product.type}</p>

      <a href="/product?ref=${product.ref}" class="navbar-popover--favorites__product__info__name">${product.name}</a>
      <span 
      class="navbar-popover--favorites__product__info__available 
      navbar-popover--favorites__product__info__available--${product.available}">
      </span> 
      <p class="navbar-popover--favorites__product__info__ref">Ref. ${product.ref}</p>
      <h6 class="navbar-popover--favorites__product__info__price">
      € 
${product.price}
      </h6>
    </div>
  </div>
  `;
    });

    popover.content = `
      <div class="navbar-popover--favorites">
        ${productsHTML}
        <a href="/favorites"  class="button button--primary">VER TODOS</a>
      </div>
  `;
  } else {
    if (!loggedIn) {
      popover.content = `
      <div class="navbar-popover--favorites navbar-popover--favorites-empty">
        <div class="navbar-popover--favorites-empty__wrapper">
          <img src="../../images/icons/heart-green--outline.svg" />
          <h1>Não tem favoritos.</h1>
          <p>Inicie sessão na sua conta Bemol para aceder aos artigos que tem no seu carrinho.</p>
        </div>
        <a href="/login" class="button button--primary">INICIAR SESSÃO</a>
      
        </div>
  `;
    } else {
      popover.content = `
      <div class="navbar-popover--favorites navbar-popover--favorites-empty">
        <div class="navbar-popover--favorites-empty__wrapper">
          <img src="../../images/icons/heart-green--outline.svg" />
          <h1>Não tem favoritos.</h1>
        </div>
        <a href="/shop" class="button button--primary">IR PARA A LOJA</a>
      
        </div>
  `;
    }
  }

  return popover;
}

function cart() {
  //  Testing

  let popover = {
    title: `<img src="../../images/icons/list.svg"/><span>ORÇAMENTOS</span>`,
    content: "",
  };

  if (cartProducts.length && client.loggedIn) {
    //  Product object to HTML
    let productsHTML = "";
    cartProducts.forEach((product, k) => {
      if (k >= 2) return;

      productsHTML += `
  <div class="navbar-popover--cart__product" data-cart-item="${product.product.ref}">
    <div class="navbar-popover--cart__product__image">
      <img src="${product.product.image}" />
    </div>
    
    <div class="navbar-popover--cart__product__info">
      <p class="navbar-popover--cart__product__info__brand">${product.product.type}</p>

      <a href="/product?ref=${product.product.ref}" class="navbar-popover--cart__product__info__name">${product.product.name}</a>
      <span 
      class="navbar-popover--cart__product__info__available 
      navbar-popover--cart__product__info__available--${product.product.available}">
      </span> 

      <p class="navbar-popover--cart__product__info__ref">Ref. ${product.product.ref}</p>
      <h6 class="navbar-popover--cart__product__info__price">€ ${product.product.price}</h6>

      <div class="navbar-popover--cart__product__info__counter">
        <button type="button" class="navbar-popover--cart__product__info__counter__fullminus"><img src="../../images/icons/cart/box-minus.svg"/></button>
        <button type="button" class="navbar-popover--cart__product__info__counter__decrement"><img src="../../images/icons/cart/cart-minus.svg"/></button>
        <span class="navbar-popover--cart__product__info__counter__counter">${product.quantity}</span>
        <button type="button" class="navbar-popover--cart__product__info__counter__increment" ><img src="../../images/icons/cart/cart-plus.svg"/></button>
        <button type="button" class="navbar-popover--cart__product__info__counter__fullplus"><img src="../../images/icons/cart/box-plus.svg"/></button>
      </div>
    </div>

    
  </div>
  `;
    });

    popover.content = `
      <div class="navbar-popover--cart">
        ${productsHTML}
        <a href="cart" class="button button--primary">VER CARRINHO</a>
        <button type="button" class="button button--outline-primary clear-cart-button">LIMPAR CARRINHO</button>
      </div>
  `;
  } else {
    if (!client.loggedIn) {
      popover.content = `
      <div class="navbar-popover--cart navbar-popover--cart-empty">
        <div class="navbar-popover--cart-empty__wrapper">
          <img src="../../images/icons/list-green--outline.svg" />
          <h1>O seu carrinho está vazio.</h1>
          <p>Inicie sessão na sua conta Bemol<br>
          para aceder aos seus artigos<br>
          favoritos.</p>
        </div>
        <a href="/login"  class="button button--primary">INICIAR SESSÃO</a>
      
        </div>
  `;
    } else {
      popover.content = `
      <div class="navbar-popover--cart navbar-popover--cart-empty">
        <div class="navbar-popover--cart-empty__wrapper">
          <img src="../../images/icons/list-green--outline.svg" />
          <h1>O seu carrinho está vazio.</h1>
        </div>
        <a href="/shop"  class="button button--primary">IR PARA A LOJA</a>
      
        </div>
  `;
    }
  }

  return popover;
}

$("#navbar_user_popover").on("show.bs.popover", function () {
  updatePopover("navbar_user_popover", user());
});

$("#navbar_user_popover").on("shown.bs.popover", function () {
  //  LOGOUT BUTTON
  $(".logout-button").click((e) => {
    loggedIn = false;
    $(".navbar-popover").popover("hide");
  });
});

$("#navbar_favorites_popover").on("show.bs.popover", function () {
  updatePopover("navbar_favorites_popover", favorites());
});

$("#navbar_cart_popover").on("show.bs.popover", function () {
  updatePopover("navbar_cart_popover", cart());
});

//  On popover shown, attach clicker events to products
$("#navbar_cart_popover").on("shown.bs.popover", function () {
  //  SHOPING CART PRODUCT BUTTONS
  $(".navbar-popover--cart__product__info__counter__decrement").click((e) => {
    let item = $(e.target)
      .parents(".navbar-popover--cart__product")
      .attr("data-cart-item");

    let itemByRef = getItemByRef(item);
    itemByRef.quantity = parseInt(itemByRef.quantity) - 1;
    updateCounter(item);
  });

  $(".navbar-popover--cart__product__info__counter__increment").click((e) => {
    let item = $(e.target)
      .parents(".navbar-popover--cart__product")
      .attr("data-cart-item");

    let itemByRef = getItemByRef(item);
    itemByRef.quantity = parseInt(itemByRef.quantity) + 1;
    updateCounter(item);
  });

  function updateCounter(ref) {
    let item = getItemByRef(ref);

    if (item.quantity < 0) {
      let index = null;
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartProducts[i].product.ref == ref) {
          index = i;
          break;
        }
      }

      cartProducts.splice(index, 1);
      $(
        `.navbar-popover--cart__product[data-cart-item=${item.product.ref}]`
      ).remove();
      $("#navbar_cart_popover").popover("show");
    }

    $(`.navbar-popover--cart__product[data-cart-item=${item.product.ref}]`)
      .find(".navbar-popover--cart__product__info__counter__counter")
      .text(`${item.quantity}`);
  }

  function getItemByRef(ref) {
    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].product.ref == ref) return cartProducts[i];
    }
  }

  //  BUTTONS
  $(".clear-cart-button").click((e) => {
    cartProducts = [];
    $("#navbar_cart_popover").popover("show");
  });
});

function updatePopover(id, data) {
  $(`#${id}`)
    .attr("data-original-title", data.title)
    .attr("data-content", data.content);
}
