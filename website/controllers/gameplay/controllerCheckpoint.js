export class ControllerCheckpoint {
    circuit
    nbTour
    checkPointCircuit
    ligne_de_depard
    nbTourrestant
    /*ligne_d_arrive*/
    ligne_d_arrive
    fini

    constructor(circuit,nbTour) {
        // Constructor code goes here
        this.circuit = circuit;

        this.nbTour = nbTour;
        this.nbTourrestant = nbTour;

        this.nbCheckPointRestant = 1;
        this.nbCheckPoint = 0;

        this.fini = 0;
        this.checkPointCircuit = new Array();
        this.setCheckPointCircuit();
        this.ligne_de_depard = [0,0];
        this.setLigneDepart();
        this.ligne_d_arrive = [0,0];
        this.checkPointPassed = new Array();
    }

    
    setCheckPointCircuit(){
        
        for(let i = 0;i<this.circuit.getHauteur();i++){
            for(let j =0;j<this.circuit.getLargeur();j++){
                
                if(this.circuit.getTerrain()[i][j] >=13 && this.circuit.getTerrain()[i][j] <= 18 ){
                    this.checkPointCircuit.push([i,j]);
                    this.nbCheckPoint++;
                }
            }
        }
        this.nbCheckPointRestant = this.nbCheckPoint;
        
    }

    setLigneDepart(){
        
        for(let i =0;i<this.circuit.getHauteur();i++){
            for(let j = 0;j<this.circuit.getLargeur();j++){
                if(this.circuit.getTerrain()[i][j] === 12 || this.circuit.getTerrain()[i][j] === 7 ){
                    this.ligne_de_depard[0] = j;
                    this.ligne_de_depard[1] = i;
                }
            }
        }     
    }

    setLigneArrive(){
     
        for(let i =0;i<this.circuit.getHauteur();i++){
            for(let j = 0;j<this.circuit.getLargeur();j++){
                if(this.circuit.getTerrain()[i][j] === 12 || this.circuit.getTerrain()[i][j] === 7){
                    this.ligne_d_arrive[0] = j;
                    this.ligne_d_arrive[1] = i;
                }
            }
        }     
    }
    checkRoue(couleur,x,y){
        
        if(couleur[2] >= 100){
            if(couleur[0] >= 150 && couleur[1] >= 150 && this.nbCheckPointRestant === 0){
                this.nbTourrestant--;
                this.nbCheckPointRestant = this.nbCheckPoint; 
                if(this.nbTourrestant === 0){
                    this.fini = 1; 
                }   
            }else{
                let passed = 0;
                for(let i = 0; i < this.checkPointCircuit.length; i++){
                    if(Math.floor(y/160) === this.checkPointCircuit[i][0] && Math.floor(x/160) === this.checkPointCircuit[i][1]){
                        passed = 1;
                    }
                }
                for(let i = 0; i < this.checkPointPassed.length; i++){
                    if(Math.floor(y/160) === this.checkPointPassed[i][0] && Math.floor(x/160) === this.checkPointPassed[i][1]){
                        passed = 2;
                    }
                }
                if(passed === 1){
                    this.nbCheckPointRestant--;
                    this.checkPointPassed.push([Math.floor(y/160),Math.floor(x/160)]);
                }
            }

        }
    }
    getnbCheckPointRestant(){
        return this.nbCheckPointRestant;
    }
    getnbCheckPoint(){
        return this.nbCheckPoint;
    }
    getnbTour(){
        return this.nbTour;
    }
    getnbTourRestant(){ 
        return this.nbTourrestant;
    }
    getFini(){
        return this.fini;
    }
    

}
