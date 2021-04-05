//  HEADER popover template

function user() {
  let loggedIn = false;
  let popover = {
    title: `<img src="../../images/icons/user.svg"/><span>A MINHA CONTA</span>`,
    content: "",
  };

  if (loggedIn) {
  }else{
      popover.content = `
      <div class="navbar-popover__user-signup">
        <p>Entrar na minha conta</p>
        <button type="button" class="button button--primary">INICIAR SESSÃO</button>

        <p>Registar-me</p>
        <button type="button" class="button button--outline-secondary">CRIAR CONTA</button>
      <div>   
      `
  }

  return popover;
}

$("#navbar_user_popover").on("show.bs.popover", function () {
  updatePopover("navbar_user_popover", user());
});

function updatePopover(id, data) {
  $(`#${id}`)
    .attr("data-original-title", data.title)
    .attr("data-content", data.content);
}
