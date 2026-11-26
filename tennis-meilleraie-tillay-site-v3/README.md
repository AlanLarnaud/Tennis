# Tennis Meilleraie Tillay — site mobile

Site statique en français, responsive et installable comme une PWA. L’assistant intégré effectue une recherche locale dans les informations du site : il fonctionne sans compte, sans clé API et sans serveur.

## Contenu
- Présentation du club
- Informations pratiques et contact
- Tarifs publiés pour les licences 2026/2027
- Liens d’inscription HelloAsso
- Rubriques équipes, calendrier des matchs, galerie photos et actualités (contenus à compléter)
- Assistant de recherche local
- Mode PWA avec cache hors-ligne après le premier chargement sur un hébergement HTTPS

## Tester sur ordinateur
Ouvrir un terminal dans ce dossier puis lancer :

```bash
python -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`.

## Ouvrir sur téléphone
Le plus simple est de publier le contenu du dépôt sur **GitHub Pages** :
1. Créez un dépôt GitHub et envoyez-y tous les fichiers de ce dossier.
2. Dans le dépôt : **Settings → Pages**.
3. Choisissez **Deploy from a branch**, branche `main`, dossier `/root`, puis **Save**.
4. Ouvrez l’adresse GitHub Pages fournie sur votre téléphone.
5. Sur Android : menu du navigateur → « Installer l’application » ou « Ajouter à l’écran d’accueil ». Sur iPhone : bouton Partager → « Sur l’écran d’accueil ».

Pour le mode hors-ligne, ouvrez d’abord le site une fois avec une connexion internet. Le service worker met en cache les fichiers du site. Les liens externes (HelloAsso, e-mail, cartes) nécessitent toujours une connexion.

> Important : un site ouvert directement avec `file://` depuis le gestionnaire de fichiers du téléphone ne peut pas activer le mode PWA hors-ligne. Utilisez GitHub Pages ou un serveur local.

## Modifier les informations
- `index.html` : textes, sections, tarifs et liens affichés.
- `app.js` : réponses et mots-clés de l’assistant (`clubKnowledge`).
- `index.html` : sections équipes, calendrier, galerie et actualités ; remplacer les blocs « à compléter » par les informations officielles.
- `styles.css` : couleurs et mise en page.

## À vérifier avec le club avant publication
- Adresse exacte des terrains et accès.
- Horaires, créneaux d’entraînement et coordonnées à jour.
- Tarifs et conditions 2026/2027, notamment tickets de tombola et réductions.
- Photos, logo officiel, équipes, calendrier et actualités.

## À propos de l’agent IA
Cette version propose un assistant de recherche local par mots-clés et correspondance de questions. Elle ne prétend pas être une IA générative. Pour un véritable agent conversationnel IA, il faudra ajouter un petit backend sécurisé qui appelle un fournisseur de modèle : ne mettez jamais une clé API secrète dans `app.js` ou dans le dépôt Git public.

## Données à fournir pour finaliser les nouvelles rubriques
- Équipes : noms, catégories, divisions, capitaines et compositions publiables.
- Calendrier : dates, adversaires, domicile/extérieur, lieux et scores validés.
- Galerie : photos originales du club et autorisations de publication, notamment pour les mineurs.
- Actualités : textes, dates de publication et éventuels liens ou visuels.
