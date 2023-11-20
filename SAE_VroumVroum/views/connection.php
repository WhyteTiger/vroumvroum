<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="../assets/logo.png">
        <link rel="stylesheet" href="../styles/generalStyle.css">
        <link rel="stylesheet" href="../styles/formStyle.css">
        <title>VroumVroum - Page de connexion</title>
    </head>

    <body>

    <?php require_once('templates/header.php'); ?>

    <main>

        <section id="toutForm">
            <h1>Connexion au site</h1>

            <form action="" method="post">
                <div class="field">
                    <label for="username">Nom d'utilisateur ou adresse mail</label>
                    <input type="text" name="username" id="username" required>
                </div>

                <div class="field">
                    <label for="pwd">Mot de passe</label>
                    <input type="password" name="pwd" id="pwd" required>
                </div>

                <button type="submit" id="validFormInscription">Se connecter</button>
            </form>
        </section>




    </main>

    <?php require_once('templates/footer.php'); ?>

    </body>
</html>
