export class API {
   
   static server = 'localhost:8080';
   
   static getURLTryToConnect() {
      
      return 'http://'+API.server+'/connection/tryToConnect';
   }
   
   static getURLWhantToRegistrate() {
      
      return 'http://'+API.server+'/connection/whantToRegistrate';
   }
   
   static getURLgetCircuitTileById() {
      
      return 'http://'+API.server+'/gameplay/getCircuitTileById';
   }
   
   static getURLgetOwnKartByPlayerId() {
      
      return 'http://'+API.server+'/gameplay/getOwnKartByPlayerId';
   }
   
   static getURLgetKartsByPlayerId() {
      
      return 'http://'+API.server+'/personalize/getKartsByPlayerId';
   }
   
}

