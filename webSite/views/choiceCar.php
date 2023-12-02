<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="../../assets/logo.png">
    <link rel="stylesheet" href="styles/generalStyle.css">
    <link rel="stylesheet" href="styles/styleCanvas.css">
    <title>Vroumvroum - choix voiture</title>
</head>
<body>
    <?php require_once('templates/header.php'); ?>
    <main>
        <div>
            <canvas id="canvasChoix">Votre navigateur ne supporte pas HTML5, veuillez le mettre à jour pour jouer.</canvas>
            <section id="buttonsContainer"></section>
        </div>
        <script type="text/javascript" src="../models/classes/Tileset.js"></script>
        <script type="text/javascript" src="../models/getXMLHttpRequest.js"></script>
        <script type="text/javascript" src="../models/classes/Map.js"></script>
        <script src="../models/voiture.js"></script>
    </main>
</body>
</html>