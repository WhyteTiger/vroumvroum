<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="../../assets/logo.png">
        <link rel="stylesheet" href="styles/generalStyle.css">
        <link rel="stylesheet" href="styles/formStyle.css">
        <script type="module" src="../controllers/controllerRegistration.js"></script>
        <title>VroumVroum - Inscription</title>
    </head>

    <body>
    <?php require_once('templates/header.php'); ?>
    <main id="mainForm">

        <section id="toutForm">
            <h1>Inscription au site</h1>

            <form action="" method="post">
                <div class="field">
                    <label for="nickname">Pseudo souhaité</label>
                    <input type="text" name="nickname" id="nickname" required>
                </div>

                <div class="field">
                    <label for="pwd">Mot de passe</label>
                    <input type="password" name="pwd" id="pwd" required>
                </div>

                <div class="field">
                    <label for="pwd">Confirmation mot de passe</label>
                    <input type="password" name="pwd" id="confpwd" required>
                </div>

                <button type="submit" id="validFormRegistration">Se connecter</button>
            </form>

            <h2>Vous avez déjà un compte ? <a href="connection.php">Se connecter</a></h2>
        </section>
    </main>
    </body>
</html>
