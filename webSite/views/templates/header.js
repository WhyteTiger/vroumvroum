// ajout balises script et link en en-tête
const head = document.querySelector('head');
var script = document.createElement('script');
var link = document.createElement('link');

script.setAttribute('type', 'module');
script.setAttribute('src', '../controllers/redirection/controllerHeader.js');
script.setAttribute('defer', true);
head.appendChild(script);

link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', 'styles/headerStyle.css');
head.appendChild(link);

// ajout header
const main = document.querySelector('main');
var header = document.createElement('header');

document.body.insertBefore(header, main);