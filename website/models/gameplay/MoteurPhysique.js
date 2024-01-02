import {Color} from "../entities/Color.js";
export class MoteurPhysique {
    /**
     * donne si le joueur appuit sur avancer ou pas
     * @private
     */
    inputAcceleration;
    /**
     * Donne si le joueur appuit sur le frein ou pas
     * @private
     */
    inputFrein
    /**
     * inputDirection -1 = gauche ,0 = toutDroid, 1 = droite
     */
    inputDirection ;
    /**
     * Orientation du véhicule entre 0 et 360
     * 0 = pointe vers le haut
     * 90 = pointe vers la droite
     * 180 = pointe vers le bas
     * 270 = pointe vers la gauche
     * @private
     */
    orientationVehicule ;
    
    /**
     * La couleur de la route sous la roue avant gauche
     * @private
     */
    roueAvantGaucheTypeRoute ;
    
    /**
     * La couleur de la route sous la roue avant droite
     * @private
     */
    roueAvantDroiteTypeRoute ;
    
    
    /**
     * La couleur de la route sous la roue Arriere droite
     * @private
     */
    roueArriereDroiteTypeRoute ;
    
    roueArriereGaucheTypeRoute ;
    /**
     * La vitessse en pixel par seconde.
     * @private
     */
    vitesse ;
    /**
     * Le nombre de fois ou on va appeler la fonction next par seconde
     */
    tickRate ;
    
    centreVehicule;
    
    /**
     * Créer un objet MoteurPhysique qui s'initialise automatiquement
     * @param {Un objet de type Point qui représente la position du véhicule à l'initialisation du match} centreVehicule
     * @param {Le nombre de fois par seconde que l'on appele next()} tickRate
     * @param {l'orientationd du véhicule} orientationVehicule
     */
    constructor(centreVehicule,tickRate,orientationVehicule ){
        
        this.centreVehicule      = centreVehicule;
        this.tickRate            = tickRate;
        this.orientationVehicule = orientationVehicule;
        this.setup();
    }
    setup(){
        this.inputAcceleration = 0;
        this.inputFrein        = 0;
        this.inputDirection    = 0;
        this.vitesse           = 0;
        this.roueArriereDroiteTypeRoute = new Color("545454",33,33,33);
        this.roueArriereGaucheTypeRoute = new Color("545454",33,33,33);
        this.roueAvantDroiteTypeRoute   = new Color("545454",33,33,33);
        this.roueAvantGaucheTypeRoute   = new Color("545454",33,33,33);
    }
    
    /**
     * Update la positon du centre la voiture et sont orientation grace au inputs du joueur et grace à la couleur de la route en dessous de chaque route
     * @param {un number qui dit si le bouton d'accélération est enfoncé ou pas} inputAcceleration
     * @param {un number qui dit si le bouton de frein est enfoncé ou pas } inputFrein
     * @param {un number qui donne la direction vers laquelle le véhicule tourne} inputDirection
     * @param {la couleur de la route sous la roue Arrière gauche} roueArriereGaucheTypeRoute
     * @param {la couleur de la route sous la roue Arrière droite} roueArriereDroiteTypeRoute
     * @param {la couleur de la route sous la roue Avant droite} roueAvantDroiteTypeRoute
     * @param roueAvantGaucheTypeRoute
     */
    next(inputAcceleration ,inputFrein ,inputDirection ,
         roueArriereGaucheTypeRoute ,roueArriereDroiteTypeRoute ,
         roueAvantDroiteTypeRoute ,roueAvantGaucheTypeRoute ){
        this.roueArriereDroiteTypeRoute = roueArriereDroiteTypeRoute;
        this.roueArriereGaucheTypeRoute = roueArriereGaucheTypeRoute;
        this.roueAvantDroiteTypeRoute   = roueAvantDroiteTypeRoute;
        this.roueAvantGaucheTypeRoute   = roueAvantGaucheTypeRoute;
        this.inputAcceleration          = inputAcceleration;
        this.inputFrein                 = inputFrein;
        this.inputDirection             = inputDirection;
        
        this.vitesse = this.accelerationCalculTypeRoute() + this.vitesse;
        this.centreVehicule = this.forwardOnePoint(this.centreVehicule);
        this.rotate();
    }
    
    /**
     * Fonction pour deplacer la voiture quand elle sort de la map
     * @param {*} centreVehicule
     * @param {*} orientationVehicule
     */
    resetCar(centreVehicule,orientationVehicule){
        this.centreVehicule      = centreVehicule;
        this.orientationVehicule = orientationVehicule;
        this.setup();
    }
    
    
    rotate(){
        if(this.vitesse !== 0){
            if(this.inputDirection === -1){
                if(this.orientationVehicule - (45/this.tickRate) <= 0){
                    this.orientationVehicule = (this.orientationVehicule - 45/this.tickRate) +360;
                }else {
                    this.orientationVehicule = (this.orientationVehicule - 45/this.tickRate);
                }
                
            }
            if(this.inputDirection === 1){
                if(this.orientationVehicule + 45/this.tickRate > 360){
                    this.orientationVehicule = (this.orientationVehicule + 45/this.tickRate)-360;
                }else {
                    this.orientationVehicule = (this.orientationVehicule + 45/this.tickRate);
                }
            }
        }
        
    }
    getCentreVehicule(){
        return this.centreVehicule;
    }
    getOrientationVehicule(){
        return this.orientationVehicule;
    }
    isNotRoute(typeRoute){
        if (typeRoute.r >= 34 || typeRoute.g >= 34 || typeRoute.b >= 34) {
            return 1;
        } else {
            return 0;
        }
    }
    
    forwardOnePoint(monPoint){
        if(this.orientationVehicule === 90){
            monPoint.setY(monPoint.getY() + this.vitesse);
        }
        
        if(this.orientationVehicule === 0){
            monPoint.setX(monPoint.getX() + this.vitesse);
        }
        
        if(this.orientationVehicule === 270 ){
            monPoint.setY(monPoint.getY() - this.vitesse);
        }
        
        if(this.orientationVehicule === 180){
            monPoint.setX(monPoint.getX() - this.vitesse);
        }
        
        if(this.orientationVehicule > 0 && this.orientationVehicule < 90 ){
            monPoint.setX(monPoint.getX() + Math.cos( this.orientationVehicule* Math.PI / 180)*this.vitesse);
            monPoint.setY(monPoint.getY() + Math.cos((90 - this.orientationVehicule) * Math.PI / 180)*this.vitesse);
        }
        
        if(this.orientationVehicule > 90 && this.orientationVehicule < 180){
            monPoint.setX(monPoint.getX() - Math.cos((180 - this.orientationVehicule ) * Math.PI / 180)*this.vitesse);
            monPoint.setY(monPoint.getY() + Math.cos((this.orientationVehicule - 90)  * Math.PI / 180)*this.vitesse);
        }
        
        if(this.orientationVehicule > 180 && this.orientationVehicule < 270){
            monPoint.setX(monPoint.getX() - Math.cos((this.orientationVehicule - 180) * Math.PI / 180)*this.vitesse);
            monPoint.setY(monPoint.getY() - Math.cos( (270 - this.orientationVehicule) * Math.PI / 180)*this.vitesse);
        }
        
        if(this.orientationVehicule > 270 && this.orientationVehicule < 360) {
            monPoint.setX(monPoint.getX() + Math.cos( (360 - this.orientationVehicule) * Math.PI / 180)*this.vitesse);
            monPoint.setY(monPoint.getY() -  Math.cos((this.orientationVehicule - 270) * Math.PI / 180)*this.vitesse);
        }
        return monPoint
    }
    accelerationCalculTypeRoute(){
        let a = this.fonctionAcceleration();
        if(this.isNotRoute(this.roueArriereDroiteTypeRoute) === 1){
            a = a * 5/6;
        }
        if(this.isNotRoute(this.roueArriereGaucheTypeRoute) === 1){
            a = a * 5/6;
        }
        if(this.isNotRoute(this.roueAvantDroiteTypeRoute)   === 1){
            a = a * 5/6;
        }
        if(this.isNotRoute(this.roueAvantGaucheTypeRoute)   === 1){
            a = a * 5/6;
        }
        return a;
    }
    
    fonctionAcceleration() {
        let incrementVitesse = 0;
        if(this.inputFrein === 1){
            if(this.inputAcceleration === 1){
                if(this.vitesse < 0.5){
                    incrementVitesse = 2/this.tickRate;
                }else if(this.vitesse<0.5 && this.vitesse >-0.5){
                    this.vitesse = 0;
                    ;
                } else {
                    incrementVitesse =-3/this.tickRate;
                }
            }else{
                if(this.vitesse < 0){
                    incrementVitesse = -2/this.tickRate;
                }else{
                    incrementVitesse=-5/this.tickRate;
                }
            }
        }else{
            if(this.inputAcceleration === 1){
                if(this.inputDirection === 0){
                    if(this.vitesse < 0){
                        incrementVitesse = 3/this.tickRate;
                    }else if(this.vitesse < 100){
                        incrementVitesse = 5/this.tickRate;
                    } 
                }else{
                    if(this.vitesse < 0){
                        incrementVitesse = 2/this.tickRate;
                    } else {
                        incrementVitesse = 3/this.tickRate;
                    }
                }
            }else{
                if(this.vitesse < -0.5){
                    incrementVitesse = 1/this.tickRate;
                }else if(this.vitesse >-0.5 && this.vitesse < 0.5){
                    this.vitesse = 0 ;
                } else {
                    incrementVitesse =-1/this.tickRate;
                }
            }
        }
        return incrementVitesse;
    }
}
