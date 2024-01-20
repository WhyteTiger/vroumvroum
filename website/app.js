console.log("Welcome to VroumVroum !");

localStorage.setItem("isConnected",     "false");
localStorage.setItem("rightPassword",   "false");
localStorage.setItem("username", 		 "anonymous");
localStorage.setItem("playerId", 		 "0");
localStorage.setItem("alreadyRegister", "");

localStorage.setItem("circuitId",       "1");
localStorage.setItem("matrix",          "");

localStorage.setItem('save', "false");

localStorage.setItem("personal",        "false");
localStorage.setItem("isChecked",       "false");

localStorage.setItem('test',            "false");
localStorage.setItem("barChargement",   "0");

document.location.href="./website/views/home.html";

const text = document.body.getElementById("text");
text.innerText = "Error 500 : Un problème est survenue lors du chargement de la page...";





/*
Pour faire afficher une matrice de 8x12 joliment

console.log("=====================================================================================");
let MATRICEPrint = "[\n";
for (let i = 0; i < 8; i++) {
	MATRICEPrint += "  [";
	for (let j = 0; j < 12; j++) {
		MATRICEPrint += MATRICE[i][j];
		if (j < 11) {
			MATRICEPrint += ", ";
		}
	}
	MATRICEPrint += "]\n";
}
MATRICEPrint += "\n]\n";
console.log("MATRICEPrint : \n"+ MATRICEPrint);
console.log("=====================================================================================");
 */
