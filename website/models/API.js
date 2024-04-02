// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class API {
   
   static server = 'https://melvyn.super-sympa.fr';
   
   static getURL() {
      
      return API.server+'/';
   }
   
   static getURLTryToConnect() {
      
      return API.server+'/connection/tryToConnect';
   }
   
   static getURLWantToRegistrate() {
      
      return API.server+'/connection/wantToRegistrate';
   }
   
   static getURLgetCircuitTileById() {
      
      return API.server+'/gameplay/getCircuitTileById';
   }
   
   static getURLgetOwnKartByPlayerId() {
      
      return API.server+'/gameplay/getOwnKartByPlayerId';
   }

   static getURLupdateBestTimeOfCircuitByPlayerId() {
      return API.server+'/gameplay/updateBestTimeOfCircuitByPlayerId';
   }

   static getURLgetCircuitInformation() {

      return API.server+'/gameplay/getCircuitInformation';
   }

   static getURLaddVroumCoinToPlayerId() {

      return API.server+'/gameplay/addVroumCoinToPlayerId';
   }
   
   static getURLBestScoreAndNote() {
         
      return API.server+'/gameplay/getBestScoreAndNote';
   }

   static getURLgetKartsAndCoinsByPlayerId() {
      
      return API.server+'/personalize/getKartsAndCoinsByPlayerId';
   }
   
   static getURLpostKartsAndCoinsInformationOfPlayerId() {
      
      return API.server+'/personalize/postKartsAndCoinsInformationOfPlayerId';
   }
   
   static getURLupdatePPIdOfPlayerId() {
      
      return API.server+'/personalize/updatePPIdOfPlayerId';
   }
   
   static getURLupdatePlayerUsername() {
      
      return API.server+'/personalize/updatePlayerUsername';
   }
   
   static getURLupdatePasswordOfPlayerId() {
      
      return API.server+'/personalize/updatePasswordOfPlayerId';
   }

   static getURLpostCircuitsNumber() {

      return API.server+'/hubs/getCircuitsNumber';
   }

   static getURLpostCircuits() {

      return 'http://'+API.server+'/hubs/getCircuits';
   }
   
   static getURLpostCircuitOfPlayerId() {

      return 'http://'+API.server+'/creation/postCircuitOfPlayerId';
   }
   
   static getURLmodifyCircuitOfPlayerId() {
      
      return 'http://'+API.server+'/creation/modifyCircuitOfPlayerId';
   }

   static getURLDeleteCircuit() {

      return 'http://'+API.server+'/hubs/deleteCircuit';
   }

   static getURLDeleteAccount() {

      return API.server+'/connection/tryToDeleteAccount';
   }
}

