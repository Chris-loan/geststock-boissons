# 🚀 Guide de déploiement sur GitHub

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ Un compte GitHub (gratuit) : [github.com](https://github.com)
- ✅ Git installé sur votre ordinateur
- ✅ Votre projet GestStock prêt

### Vérifier Git
```bash
git --version
```

Si Git n'est pas installé, téléchargez-le ici : [git-scm.com](https://git-scm.com/downloads)

---

## 🎯 Étapes complètes

### 1️⃣ Créer un dépôt sur GitHub

1. Connectez-vous à [github.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez le formulaire :
   - **Repository name** : `geststock-boissons` (ou le nom de votre choix)
   - **Description** : `Application de gestion de stock pour dépôt de boissons`
   - **Public** ou **Private** (selon votre préférence)
   - ❌ **NE cochez PAS** "Add a README file" (on l'a déjà)
   - ❌ **NE cochez PAS** "Add .gitignore"
   - ❌ **NE cochez PAS** "Choose a license"
4. Cliquez sur **"Create repository"**

### 2️⃣ Initialiser Git localement

Ouvrez votre terminal dans le dossier du projet :

```bash
# Naviguer vers le projet
cd C:\Users\Loan\Downloads\workspace

# Initialiser Git
git init
```

### 3️⃣ Ajouter tous les fichiers

```bash
# Ajouter tous les fichiers
git add .

# Vérifier ce qui va être commité
git status
```

### 4️⃣ Créer le premier commit

```bash
# Créer le commit initial
git commit -m "Initial commit: Application GestStock complète"
```

### 5️⃣ Connecter au dépôt GitHub

```bash
# Ajouter le dépôt distant (REMPLACEZ VOTRE_NOM_UTILISATEUR)
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/geststock-boissons.git

# Vérifier la connexion
git remote -v
```

### 6️⃣ Pousser vers GitHub

```bash
# Renommer la branche en main (si nécessaire)
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

---

## 🔐 Authentification GitHub

### Si c'est la première fois

GitHub demande maintenant un **Personal Access Token** au lieu du mot de passe.

#### Créer un token :

1. Allez sur [github.com/settings/tokens](https://github.com/settings/tokens)
2. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**
3. Remplissez :
   - **Note** : `GestStock Project`
   - **Expiration** : 90 jours (ou No expiration)
   - **Scopes** : Cochez `repo` (accès complet aux dépôts)
4. Cliquez sur **"Generate token"**
5. **COPIEZ LE TOKEN** (vous ne le verrez plus après !)

#### Utiliser le token :

Quand Git demande votre mot de passe, collez le token à la place.

---

## 📝 Commandes Git utiles

### Ajouter des modifications

```bash
# Après avoir modifié des fichiers
git add .
git commit -m "Description des modifications"
git push
```

### Voir l'historique

```bash
# Voir les commits
git log

# Voir les changements
git diff
```

### Créer des branches

```bash
# Créer une nouvelle branche
git checkout -b nouvelle-fonctionnalite

# Revenir à main
git checkout main

# Fusionner une branche
git merge nouvelle-fonctionnalite
```

### Annuler des changements

```bash
# Annuler les modifications non commitées
git checkout .

# Annuler le dernier commit (garder les changements)
git reset --soft HEAD~1

# Annuler le dernier commit (perdre les changements)
git reset --hard HEAD~1
```

---

## 🎨 Bonnes pratiques de commit

### Messages de commit clairs

```bash
# Bon
git commit -m "Ajout système de tickets imprimables"
git commit -m "Correction bug calcul stock"
git commit -m "Mise à jour documentation README"

# Mauvais
git commit -m "fix"
git commit -m "update"
git commit -m "wip"
```

### Convention de messages

- **feat** : Nouvelle fonctionnalité
- **fix** : Correction de bug
- **docs** : Documentation
- **style** : Formatage, CSS
- **refactor** : Refactorisation
- **test** : Tests
- **chore** : Maintenance

Exemples :
```bash
git commit -m "feat: ajout impression automatique des tickets"
git commit -m "fix: correction calcul valeur stock en FCFA"
git commit -m "docs: mise à jour guide installation"
```

---

## 🔄 Synchronisation avec GitHub

### Récupérer les dernières modifications

```bash
# Récupérer et fusionner
git pull

# Ou en deux étapes
git fetch
git merge origin/main
```

### Pousser vos modifications

```bash
git add .
git commit -m "Description"
git push
```

---

## 📊 Structure du dépôt GitHub

Après le push, votre dépôt contiendra :

```
geststock-boissons/
├── .gitignore              ✅
├── README.md               ✅
├── GUIDE_EMAIL.md          ✅
├── package.json            ✅
├── vite.config.js          ✅
├── tailwind.config.js      ✅
├── postcss.config.js       ✅
├── tsconfig.json           ✅
├── index.html              ✅
├── src/                    ✅
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types.ts
│   ├── data.ts
│   └── components/
│       ├── Dashboard.tsx
│       ├── ProductsPage.tsx
│       ├── MovementsPage.tsx
│       ├── TicketsPage.tsx
│       ├── ReportsPage.tsx
│       └── SettingsPage.tsx
├── node_modules/           ❌ (ignoré)
└── dist/                   ❌ (ignoré)
```

---

## 🐛 Résolution de problèmes

### Erreur : "fatal: remote origin already exists"

```bash
# Supprimer l'ancien remote
git remote remove origin

# Ajouter le nouveau
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/geststock-boissons.git
```

### Erreur : "failed to push some refs"

```bash
# Forcer le push (attention !)
git push -u origin main --force
```

### Erreur : "Authentication failed"

1. Vérifiez votre token GitHub
2. Utilisez le token comme mot de passe
3. Ou configurez le credential manager :
```bash
git config --global credential.helper store
```

### Erreur : "Your branch is ahead of"

```bash
# Pousser les commits en retard
git push
```

---

## 🌐 Déploiement (Bonus)

### Option 1 : Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Cliquez sur **"New Project"**
4. Sélectionnez `geststock-boissons`
5. Cliquez sur **"Deploy"**
6. ✅ Votre site est en ligne !

### Option 2 : Netlify

1. Allez sur [netlify.com](https://netlify.com)
2. Connectez GitHub
3. Glissez-déposez le dossier `dist/`
4. ✅ Déploiement automatique

### Option 3 : GitHub Pages

1. Installez gh-pages :
```bash
npm install -D gh-pages
```

2. Ajoutez dans `package.json` :
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. Déployez :
```bash
npm run build
npm run deploy
```

4. Votre site sera sur : `https://VOTRE_NOM_UTILISATEUR.github.io/geststock-boissons/`

---

## 📞 Support GitHub

- Documentation Git : [git-scm.com/doc](https://git-scm.com/doc)
- Documentation GitHub : [docs.github.com](https://docs.github.com)
- Support GitHub : [support.github.com](https://support.github.com)

---

## ✅ Checklist avant push

- [ ] Compte GitHub créé
- [ ] Dépôt créé sur GitHub
- [ ] Git installé localement
- [ ] Fichier .gitignore présent
- [ ] README.md complet
- [ ] Tous les fichiers commités
- [ ] Remote configuré
- [ ] Token GitHub créé (si première fois)
- [ ] Push réussi

---

## 🎉 Félicitations !

Votre projet GestStock est maintenant sur GitHub ! 🚀

Partagez-le avec le monde :
```
https://github.com/VOTRE_NOM_UTILISATEUR/geststock-boissons
```

---

**Prochaine étape** : Déployez votre application en ligne avec Vercel ou Netlify pour la rendre accessible à tous ! 🌍
