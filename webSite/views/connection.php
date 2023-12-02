<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="../../assets/logo.png">
        <link rel="stylesheet" href="styles/generalStyle.css">
        <link rel="stylesheet" href="styles/formStyle.css">
        <script type="module" src="../controllers/account/controllerConnection.js" defer></script>
        <title>VroumVroum - Connexion</title>
    </head>

    <body>

    <?php require_once('templates/header.php'); ?>

    <main id="mainForm">

        <section id="toutForm">
            <h1>Connexion au site</h1>

            <form id="form" method="post">
                <div class="field">
                    <label for="username">Nom d'utilisateur ou adresse mail</label>
                    <input type="text" name="username" id="username" required>
                </div>

                <div class="field">
                    <label for="pwd">Mot de passe</label>
                    <input type="password" name="pwd" id="pwd" required>
                </div>

                <button type="submit" id="validFormConnection">Se connecter</button>
            </form>

            <h2>Vous n'avez pas de compte ? <a href="registration.php">Créer un compte</a></h2>
        </section>

    </main>

    </body>
</html>
