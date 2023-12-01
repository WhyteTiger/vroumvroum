<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="../assets/logo.png">
        <link rel="stylesheet" href="../styles/generalStyle.css">
        <link rel="stylesheet" href="../styles/circuitStyle.css">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
        <title>VroumVroum - Connexion</title>
    </head>

    <body>

    <?php require_once('templates/header.php'); ?>

    <main>
        <section id="mainCircuit">

            <canvas></canvas>

            <section id="circuitInfos">
                <h2>Nom de la carte</h2>

                <div id="mark">
                    <p>Note : </p>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>

                <p>Créateur : </p>

                <div id="leaderboard">
                    <div id="leaderboardTitle">Leaderboard</div>
                    <div>
                        <p>Créateur : </p><p>Créateur : </p><p>Créateur : </p><p>Créateur : </p><p>Créateur : </p><p>Créateur : </p><p>Créateur : </p>
                    </div>
                </div>
            </section>
        </section>

        <section id="items">

            <section id="choosers">
                <button></button>
                <button></button>
                <button></button>

                <div id="pathChooser" class="chooser">
                    <div>test</div>
                </div>

                <div id="startEndChooser" class="chooser">
                    <div>test</div>
                </div>

                <div id="checkpointChooser" class="chooser">
                    <div>test</div>
                </div>
            </section>

        </section>





    </main>


    </body>
</html>