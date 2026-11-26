TENNIS MEILLERAIE TILLAY — SITE MULTIPAGES + ADMINISTRATION

CONTENU
- Accueil, Le club, Équipes, Galerie, Actualités, Inscriptions, Contact
- Espace d'administration dans /admin/
- Couleurs inspirées du logo officiel HelloAsso (jaune et gris)
- Logo officiel chargé depuis le CDN HelloAsso
- Contenu modifiable dans data.json

INSTALLATION SUR LE DEPOT EXISTANT
1. Décompresser le ZIP.
2. Dans GitHub > AlanLarnaud/Tennis, remplacer les anciens fichiers par le contenu de ce dossier.
3. Garder la structure et les dossiers : index.html, styles.css, app.js, data.json, assets/, admin/.
4. Commit sur main. GitHub Pages publiera automatiquement le site.
5. Ouvrir https://alanlarnaud.github.io/Tennis/ puis l'espace admin https://alanlarnaud.github.io/Tennis/admin/.

UTILISER L'ESPACE ADMIN
1. Créer un jeton GitHub fine-grained : GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens.
2. Resource owner : AlanLarnaud.
3. Repository access : Only select repositories > Tennis.
4. Repository permissions : Contents = Read and write. Aucun autre droit n'est nécessaire.
5. Générer le jeton, le copier et le coller dans l'espace admin.
6. Publier actualités, photos, matchs ou modifier les informations. Les modifications sont commitées dans GitHub et publiées automatiquement.

SECURITE
- L'espace admin n'est pas un système de comptes : toute personne ayant un jeton autorisé peut publier.
- Le jeton est conservé uniquement en mémoire dans l'onglet ouvert, jamais enregistré dans le site ni dans localStorage.
- Ne jamais envoyer le jeton à quelqu'un ni le coller dans un fichier public. Fermer l'onglet après utilisation.
- Si le jeton est exposé, le révoquer immédiatement dans GitHub.

A VERIFIER AVANT PUBLICATION
- Le logo est chargé depuis le CDN HelloAsso (URL publique). Si HelloAsso change son URL, remplacer la constante LOGO dans app.js et dans admin/index.html.
- Vérifier l'adresse e-mail, les informations pratiques et les équipes.
- Les équipes préremplies sont celles mentionnées lors de la préparation ; vérifier divisions et engagement auprès de Ten'Up.
- Le calendrier est volontairement vide tant que les dates/adversaires ne sont pas vérifiés.
- Vérifier les droits d'utilisation des photos, particulièrement les photos de mineurs.

Le site est statique : aucun serveur payant ni base de données externe n'est nécessaire.

MISE A JOUR — CALENDRIER ET RESULTATS
- Les 17 rencontres à venir de la phase préliminaire 2026/2027 sont préchargées dans data.json (du 6 décembre 2026 au 14 février 2027).
- Dans l'administration, la section « Saisir les résultats des rencontres programmées » permet de saisir le score directement à côté de chaque rencontre, puis de l'enregistrer individuellement.
- Le résultat saisi apparaît dans la colonne « Résultat » de la page Équipes. Une rencontre n'est pas recréée : seul son champ result est mis à jour.
- Les rencontres préchargées sont issues du calendrier public Lokaa qui indique reprendre les dates et horaires de la fédération. Vérifier toute modification de dernière minute sur Ten'Up.
