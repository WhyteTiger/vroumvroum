console.log("Welcome to VroumVroum !");

window.localStorage.setItem("isConnected",     "false");
window.localStorage.setItem("rightPassword",   "false");
window.localStorage.setItem("username", 		  "anonymous");
window.localStorage.setItem("playerId", 		  1);
window.localStorage.setItem("alreadyRegister", "");
window.localStorage.setItem("circuitId",       "1");
window.localStorage.setItem("matrix",          "");

window.localStorage.setItem("personal", "false");

document.location.href="./website/views/home.html";

const text = document.body.getElementById("text");
text.innerText = "Error 500 : Un problème est survenue lors du chargement de la page...";
