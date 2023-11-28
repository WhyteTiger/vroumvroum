export class API {
   
   static server = 'localhost:8080';
   
   static urlTryToConnect() {
      
      return 'http://'+API.server+'/connection/tryToConnect';
   }
   
}

