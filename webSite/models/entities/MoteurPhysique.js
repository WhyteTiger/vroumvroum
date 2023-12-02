import {Color} from "./Color";
import {Point} from "./Point";
class MoteurPhysique {
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

        this.tickRate = tickRate;
        this.centreVehicule = centreVehicule
        this.setup()
        this.orientationVehicule = orientationVehicule
    }
    setup(){
        this.inputAcceleration = false;
        this.inputFrein = false;
        this.inputDirection = 0;
        this.vitesse = 0;
        this.roueArriereDroiteTypeRoute = new Color("545454",33,33,33);
        this.roueArriereGaucheTypeRoute = new Color("545454",33,33,33);
        this.roueAvantDroiteTypeRoute   = new Color("545454",33,33,33);
        this.roueAvantGaucheTypeRoute   = new Color("545454",33,33,33);
    }

    /**
     * Update la positon du centre la voiture et sont orientation grace au inputs du joueur et grace à la couleur de la route en dessous de chaque route
     * @param {un booléen qui dit si le bouton d'accélération est enfoncé ou pas} inputAcceleration
     * @param {un booléen qui dit si le bouton de frein est enfoncé ou pas } inputFrein
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
        this.roueAvantDroiteTypeRoute = roueAvantDroiteTypeRoute;
        this.roueAvantGaucheTypeRoute = roueAvantGaucheTypeRoute;
        this.inputAcceleration = inputAcceleration
        this.inputFrein = inputFrein
        this.inputDirection = inputDirection

        this.vitesse = this.accelerationCalculTypeRoute + this.vitesse;
        this.forwardOnePoint(this.centreVehicule)
        this.rotate()
    }

    /**
     * Fonction pour deplacer la voiture quand elle sort de la map
     * @param {*} centreVehicule
     * @param {*} orientationVehicule
     */
    resetCar(centreVehicule,orientationVehicule){
        this.centreVehicule = centreVehicule;
        this.orientationVehicule = orientationVehicule
        this.setup()
    }


    rotate(){
        if(this.inputDirection == -1){
            this.orientationVehicule = (this.orientationVehicule - 45/this.tickRate)%360
        }
        if(this.inputDirection == 1){
            this.orientationVehicule = (this.orientationVehicule + 45/this.tickRate)%360
        }

    }
    getCentreVehicule(){
        return this.centreVehicule
    }
    getOrientationVehicule(){
        return this.orientationVehicule
    }
    isNotRoute(typeRoute){
        return typeRoute.r >= 34 || typeRoute.g >= 34 || typeRoute.b >= 34
    }

    forwardOnePoint(monPoint ){
        if(this.orientationVehicule == 0){
            monPoint.setY = monPoint.getY - this.vitesse;
        }
        if(this.orientationVehicule == 90){
            monPoint.setX = monPoint.getX + this.vitesse;
        }
        if(this.orientationVehicule == 180 ){
            monPoint.setY = monPoint.getY - this.vitesse;
        }
        if(this.orientationVehicule == 270){
            monPoint.setX = monPoint.getX - this.vitesse;
        }
        if(this.orientationVehicule > 0 && this.orientationVehicule < 90 ){
            monPoint.setX = monPoint.getX + Math.cos((90 - this.orientationVehicule) * Math.PI / 180)
            monPoint.setY = monPoint.getY + Math.cos(this.orientationVehicule * Math.PI / 180)
        }
        if(this.orientationVehicule > 90 && this.orientationVehicule < 180){
            monPoint.setX = monPoint.getX + Math.cos((this.orientationVehicule-90) * Math.PI / 180)
            monPoint.setY = monPoint.getY - Math.cos((180-this.orientationVehicule) * Math.PI / 180)
        }
        if(this.orientationVehicule > 90 && this.orientationVehicule < 180){
            monPoint.setX = monPoint.getX - Math.cos((270-this.orientationVehicule) * Math.PI / 180)
            monPoint.setY = monPoint.getY - Math.cos((this.orientationVehicule-180) * Math.PI / 180)
        }
        if(this.orientationVehicule > 90 && this.orientationVehicule < 180){
            monPoint.setX = monPoint.getX - Math.cos((this.orientationVehicule-270) * Math.PI / 180)
            monPoint.setY = monPoint.getY + Math.cos((360-this.orientationVehicule) * Math.PI / 180)
        }
    }
    accelerationCalculTypeRoute(){
        var a = this.fonctionAcceleration()
        if(this.isNotRoute(this.roueArriereDroiteTypeRoute)){
            a = a * 5/6
        }
        if(this.isNotRoute(this.roueArriereGaucheTypeRoute)){
            a = a * 5/6
        }
        if(this.isNotRoute(this.roueAvantDroiteTypeRoute)){
            a = a * 5/6
        }
        if(this.isNotRoute(this.roueAvantGaucheTypeRoute)){
            a = a * 5/6
        }
        return a
    }
    fonctionAcceleration() {
        var incrementVitesse;
        if(this.inputFrein == true){
            if(this.inputAcceleration == true){
                if(this.vitesse < 0){
                    incrementVitesse = 2/this.tickRate
                }if(this.vitesse==0){
                    incrementVitesse = 0/this.tickRate
                } else {
                    incrementVitesse =-3/this.tickRate
                }
            }else{
                if(this.vitesse < 0){
                    incrementVitesse = -2/this.tickRate
                }else{
                    incrementVitesse=-5/this.tickRate
                }
            }
        }else{
            if(this.inputAcceleration == true){
                if(this.inputDirection == 0){
                    if(this.vitesse < 0){
                        incrementVitesse = 3/this.tickRate
                    }else {
                        incrementVitesse = 5/this.tickRate
                    }
                }else{
                    if(this.vitesse < 0){
                        incrementVitesse = 2/this.tickRate
                    } else {
                        incrementVitesse = 3/this.tickRate
                    }
                }
            }else{
                if(this.vitesse < 0){
                    incrementVitesse = 1/this.tickRate
                }if(this.vitesse==0){
                    incrementVitesse = 0/this.tickRate
                } else {
                    incrementVitesse =-1/this.tickRate
                }
            }
        }
        return incrementVitesse
    }

}