
console.log("hello world");

window.localStorage.setItem("isConnected", false);
window.localStorage.setItem("username", "");
window.localStorage.setItem("alreadyRegister", "");

document.location.href="/views/index.php";

const text = document.body.getElementById("text");
text.innerText = "Error 500 : Un problème est survenue lors du chargement de la page...";
