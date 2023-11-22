export function isAlreadyRegister(pseudo) {
   
   var result;
   
   const url = 'http://localhost:8080/connection/isAlreadyRegister';
   
   let data = {
      pseudo: pseudo
   }
   
   const request = new Request(url, {
      method: 'POST',
      body: data,
   });
   
   fetch(request)
      .then(function(response) {
         console.log(response);
         result = response;
      })
   
   return result
}
/*
let resultat = foo();
console.log("res : " + resultat);

 */
