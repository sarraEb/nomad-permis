# NOMAD Permis

Landing page et dashboard admin local pour NOMAD - Votre permis en province.

## Acces local

Placez le dossier dans `C:\wamp\www\NOMAD`, demarrez WAMP, puis ouvrez :

- Site public : `http://localhost/NOMAD/index.html`
- Admin : `http://localhost/NOMAD/admin.html`

Identifiants admin de demo :

- Utilisateur : `admin`
- Mot de passe : `nomad2026`

## Notes

- Les donnees du dashboard sont synchronisees avec MySQL sur WAMP quand la base est installee.
- Le navigateur garde aussi une copie locale en `localStorage` pour que l'interface reste utilisable si MySQL est indisponible.
- L'envoi email utilise `send-mail.php` et depend de la configuration mail du serveur.
- L'integration Google Places doit etre configuree depuis le dashboard admin.

## Installation MySQL avec WAMP

1. Demarrez WAMP.
2. Ouvrez `http://localhost/phpmyadmin`.
3. Importez le fichier `database/schema.sql`.
4. La base creee s'appelle `nomad_permis`.
5. La configuration se trouve dans `api/db.php`.

Configuration par defaut WAMP :

- host : `127.0.0.1`
- database : `nomad_permis`
- user : `root`
- password : vide
