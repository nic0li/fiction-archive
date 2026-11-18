function campoVazio(campo) {
  return campo.value.trim() === "";
}

function campoNaoPreenchido(campo) {
  return errorList.innerHTML += "<li>Campo <b>" + campo + "</b> não preenchido</li>";
}

const formUser = document.querySelector(".formEditUser");

const username = document.getElementById("username");
const email = document.getElementById("email");
const name = document.getElementById("name");
const avatar = document.getElementById("avatar");
const description = document.getElementById("description");

const errorList = document.querySelector(".errorList");

formUser.addEventListener("submit", function (event) {

  errorList.innerHTML = "";

  if (campoVazio(username)) {
    campoNaoPreenchido("username");
  };

  if (campoVazio(email)) {
    campoNaoPreenchido("email");
  };

  if (errorList.querySelectorAll("li").length > 0) {
    event.preventDefault();
    errorList.hidden = "";
  };

});
