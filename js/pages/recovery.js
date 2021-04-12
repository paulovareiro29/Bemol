$(".section--recovery-form__form").submit((e) => {
  e.preventDefault();

  //  SEND EMAIL

  $(".section--recovery-form").remove();

  $("main").append(`
  <section class="section section--recovery-successful">
        <div class="section--recovery-successful__container wic-container">
            <img src="images/icons/checkmark-green.svg" alt="">
            <h4>Pedido de recuperação palavra-passe submetido.</h4>
            <p>Confirme o seu e-mail e siga os passos.</p>

            <a href="index.html" class="button button--primary">VOLTAR AO INICIO</a>
        </div>

    </section>
`);
});
