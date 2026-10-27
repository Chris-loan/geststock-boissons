# 🍺 GestStock - Application de Gestion de Stock pour Dépôt de Boissons

## 📋 Vue d'ensemble

**GestStock** est une application web complète de gestion de stock spécialement conçue pour les dépôts de boissons. Elle permet de gérer les produits, les mouvements de stock (entrées/sorties), de générer des rapports quotidiens en Excel, d'envoyer ces rapports par email au directeur, et de créer des tickets imprimables pour chaque mouvement.

---

## 🎯 Fonctionnalités principales

### 1. 📊 Tableau de bord
- Vue d'ensemble en temps réel du stock
- Indicateurs clés (KPI) :
  - Nombre total de produits
  - Stock total en unités
  - Valeur totale du stock en FCFA
  - Nombre d'alertes de stock bas
- Statistiques des entrées et sorties du jour
- Répartition du stock par catégorie
- Alertes de produits en stock bas
- Derniers mouvements de stock

### 2. 📦 Gestion des produits
- Liste complète des produits avec :
  - Nom, catégorie, unité de mesure
  - Prix unitaire en FCFA
  - Stock actuel et stock minimum
  - Fournisseur
  - Statut (OK / Alerte stock bas)
- Ajout, modification et suppression de produits
- Recherche par nom ou fournisseur
- Filtrage par catégorie
- Gestion des catégories : Sodas, Eaux, Bières, Vins, Jus de fruits, Énergisants

### 3. 🔄 Gestion des mouvements
- Enregistrement des entrées et sorties de stock
- Mise à jour automatique du stock
- Historique complet des mouvements
- Filtrage par type (Entrée/Sortie) et recherche
- Raisons prédéfinies :
  - Entrées : Réapprovisionnement, Retour client, Correction inventaire
  - Sorties : Vente, Perte/Casse, Transfert, Correction inventaire
- Notes et commentaires pour chaque mouvement

### 4. 🎫 Système de tickets imprimables
- Création de tickets pour chaque mouvement
- Impression automatique lors de la création
- Tickets formatés professionnellement avec :
  - En-tête avec nom de l'entreprise
  - Numéro de ticket unique
  - Date et type de mouvement
  - Détails du produit et quantité
  - Raison et notes
  - Zone de signature
- Impression individuelle ou en lot
- Filtrage par type et date
- Synchronisation automatique avec les mouvements

### 5. 📧 Rapports et envoi par email
- Génération de rapports Excel quotidiens avec 3 onglets :
  - **Résumé** : Indicateurs clés du jour
  - **État du Stock** : Liste complète des produits
  - **Mouvements du Jour** : Toutes les opérations
- Envoi automatique par email via EmailJS
- Configuration de l'email du directeur
- Planification des envois (quotidien, hebdomadaire, mensuel)
- Aperçu de l'email avant envoi
- Historique des envois

### 6. ⚙️ Paramètres
- Configuration de l'email du directeur
- Nom de l'entreprise
- Planification des envois automatiques
- Configuration EmailJS (Service ID, Template ID, Public Key)
- Gestion des alertes de stock
- Persistance des paramètres (localStorage)

---

## 🏗️ Architecture technique

### Technologies utilisées
- **React 18** : Framework JavaScript pour l'interface utilisateur
- **TypeScript** : Typage statique pour la robustesse du code
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS v3** : Framework CSS pour le design
- **Lucide React** : Icônes modernes
- **XLSX** : Génération de fichiers Excel
- **EmailJS** : Envoi d'emails depuis le frontend
- **date-fns** : Manipulation des dates

### Structure du projet
```
src/
├── App.tsx                      # Composant principal avec navigation
├── main.tsx                     # Point d'entrée React
├── index.css                    # Styles globaux et Tailwind
├── types.ts                     # Types TypeScript
├── data.ts                      # Données initiales (produits, mouvements)
└── components/
    ├── Dashboard.tsx            # Tableau de bord
    ├── ProductsPage.tsx         # Gestion des produits
    ├── MovementsPage.tsx        # Gestion des mouvements
    ├── TicketsPage.tsx          # Système de tickets
    ├── ReportsPage.tsx          # Rapports et emails
    └── SettingsPage.tsx         # Paramètres
```

### Gestion des données
- **État local** : React useState pour les données en mémoire
- **Persistance** : localStorage pour les paramètres
- **Données initiales** : 10 produits de démonstration avec 5 mouvements

---

## 💰 Devise et contexte

- **Devise** : Franc CFA (FCFA)
- **Format des prix** : Nombres entiers (pas de centimes)
- **Formatage** : Séparateurs de milliers (ex: 8 500 FCFA)
- **Contexte** : Dépôt de boissons en Afrique de l'Ouest

---

## 🎨 Design et UX

### Interface utilisateur
- Design moderne et épuré
- Sidebar de navigation responsive
- Cards et tableaux pour l'affichage des données
- Modales pour les formulaires
- Notifications et alertes visuelles
- Animations fluides

### Responsive
- Adapté mobile, tablette et desktop
- Sidebar rétractable sur mobile
- Tableaux avec scroll horizontal
- Formulaires optimisés pour le tactile

### Accessibilité
- Contrastes respectés
- Labels sur tous les champs
- Messages d'erreur clairs
- Navigation au clavier possible

---

## 📊 Données de démonstration

### Produits (10 articles)
1. Coca-Cola 33cl - 8 500 FCFA
2. Pepsi 33cl - 7 500 FCFA
3. Eau minérale 1.5L - 3 000 FCFA
4. Eau de source 1.5L - 2 000 FCFA
5. Heineken 33cl - 15 000 FCFA
6. Flag Spéciale 33cl - 14 000 FCFA
7. Jus d'Orange 1L - 9 000 FCFA
8. Red Bull 25cl - 24 000 FCFA
9. Vin Rosé 75cl - 18 000 FCFA
10. Sprite 33cl - 8 000 FCFA

### Mouvements (5 opérations)
- Entrées : Réapprovisionnement
- Sorties : Ventes à restaurants et supermarchés

---

## 🚀 Installation et lancement

### Prérequis
- Node.js v18+ (v20 recommandé)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build
```

### Accès
- **Développement** : http://localhost:3000
- **Production** : Servir le dossier `dist/`

---

## 📧 Configuration EmailJS

Pour activer l'envoi d'emails :

1. Créer un compte sur [emailjs.com](https://www.emailjs.com/)
2. Ajouter un service email (Gmail, Outlook, etc.)
3. Créer un template avec les variables :
   - `to_email`
   - `subject`
   - `message`
4. Récupérer les identifiants :
   - Service ID
   - Template ID
   - Public Key
5. Configurer dans **Paramètres** → **Configuration EmailJS**

**Plan gratuit** : 200 emails/mois

---

## 🖨️ Impression des tickets

### Impression individuelle
1. Aller dans **Tickets**
2. Cliquer sur **Imprimer** sous un ticket
3. Le ticket s'imprime automatiquement

### Impression en lot
1. Aller dans **Tickets**
2. Filtrer les tickets souhaités
3. Cliquer sur **Imprimer tout**
4. Tous les tickets filtrés s'impriment

### Format des tickets
- Bordure pointillée
- En-tête avec nom de l'entreprise
- Informations complètes du mouvement
- Zone de signature
- Format optimisé pour impression A4

---

## 📈 Fonctionnalités clés

### Automatisation
- ✅ Mise à jour automatique du stock
- ✅ Création automatique des mouvements
- ✅ Impression automatique des tickets
- ✅ Génération automatique des rapports Excel
- ✅ Envoi automatique des emails (si configuré)

### Traçabilité
- ✅ Historique complet des mouvements
- ✅ Numéros de tickets uniques
- ✅ Dates et heures précises
- ✅ Raisons et notes pour chaque opération
- ✅ Audit trail complet

### Alertes
- ✅ Alertes de stock bas
- ✅ Indicateurs visuels (couleurs)
- ✅ Notifications dans le dashboard
- ✅ Seuils configurables par produit

---

## 🔒 Sécurité et confidentialité

- Données stockées localement (navigateur)
- Pas de serveur backend requis
- Clés EmailJS stockées en localStorage
- Pas de transmission de données sensibles
- HTTPS requis pour EmailJS

---

## 🎯 Cas d'usage

### Pour le gestionnaire de stock
- Enregistrer rapidement les entrées/sorties
- Créer des tickets imprimables pour chaque mouvement
- Suivre le stock en temps réel
- Recevoir des alertes de stock bas

### Pour le directeur
- Recevoir des rapports quotidiens par email
- Consulter l'état du stock à distance
- Analyser les mouvements de stock
- Prendre des décisions basées sur les données

### Pour l'administrateur
- Configurer les paramètres de l'application
- Gérer les produits et catégories
- Configurer l'envoi d'emails
- Maintenir le système

---

## 🔄 Workflow typique

### Réception de marchandises
1. Aller dans **Tickets** → **Nouveau Ticket**
2. Sélectionner le type **Entrée**
3. Choisir le produit et la quantité
4. Indiquer la raison (Réapprovisionnement)
5. Cliquer sur **Créer & Imprimer**
6. ✅ Stock mis à jour automatiquement
7. ✅ Ticket imprimé pour archivage
8. ✅ Mouvement enregistré dans l'historique

### Expédition de marchandises
1. Aller dans **Tickets** → **Nouveau Ticket**
2. Sélectionner le type **Sortie**
3. Choisir le produit et la quantité
4. Indiquer la raison (Vente)
5. Ajouter une note (nom du client)
6. Cliquer sur **Créer & Imprimer**
7. ✅ Stock diminué automatiquement
8. ✅ Ticket imprimé pour le client
9. ✅ Mouvement enregistré

### Envoi du rapport quotidien
1. Aller dans **Rapports & Email**
2. Vérifier le résumé du jour
3. Cliquer sur **Envoyer par Email**
4. ✅ Rapport Excel généré
5. ✅ Email envoyé au directeur
6. ✅ Fichier Excel téléchargé localement

---

## 📊 Métriques et rapports

### Indicateurs suivis
- Nombre total de produits
- Valeur totale du stock (FCFA)
- Nombre de mouvements par jour
- Taux de rotation des stocks
- Produits en alerte
- Répartition par catégorie

### Rapports générés
- Rapport quotidien (Excel)
- État du stock complet
- Historique des mouvements
- Alertes de stock bas
- Statistiques par catégorie

---

## 🎨 Personnalisation

### Éléments modifiables
- Nom de l'entreprise
- Catégories de produits
- Seuils d'alerte
- Format des tickets
- Template d'email
- Fréquence des rapports

### Extensions possibles
- Ajout de codes-barres
- Intégration caisse enregistreuse
- Multi-utilisateurs
- Synchronisation cloud
- Application mobile
- API REST

---

## 📝 Notes techniques

### Performance
- Build optimisé avec Vite
- Code splitting automatique
- Assets minifiés en production
- Chargement rapide (< 2s)

### Compatibilité
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Pas de dépendances backend
- Fonctionne hors ligne (sauf EmailJS)

### Maintenance
- Code TypeScript typé
- Composants React modulaires
- CSS Tailwind maintenable
- Documentation complète

---

## 🐛 Dépannage

### Problèmes courants

**L'email ne s'envoie pas**
- Vérifier la configuration EmailJS dans Paramètres
- Vérifier le quota EmailJS (200 emails/mois)
- Vérifier la connexion internet

**Les tickets ne s'impriment pas**
- Vérifier que le navigateur autorise les popups
- Vérifier l'imprimante par défaut
- Essayer un autre navigateur

**Le stock ne se met pas à jour**
- Rafraîchir la page
- Vérifier la console pour les erreurs
- Les données sont en mémoire (perdues au refresh)

---

## 📞 Support et documentation

- **Guide EmailJS** : Voir `GUIDE_EMAIL.md`
- **Documentation EmailJS** : https://www.emailjs.com/docs/
- **Documentation React** : https://react.dev/
- **Documentation Tailwind** : https://tailwindcss.com/docs

---

## 🎓 Apprentissage

Ce projet démontre :
- Gestion d'état avec React Hooks
- TypeScript pour la robustesse
- Design responsive avec Tailwind CSS
- Génération de fichiers Excel
- Intégration de services tiers (EmailJS)
- Impression côté client
- Gestion de formulaires complexes
- Architecture modulaire

---

## 📄 Licence

Projet développé pour usage interne.

---

## 👨‍💻 Développement

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2025  
**Statut** : Production ready ✅

---

## 🎉 Résumé

**GestStock** est une application complète et professionnelle de gestion de stock pour dépôts de boissons, offrant :

✅ Gestion complète des produits et du stock  
✅ Système de tickets imprimables automatisé  
✅ Rapports Excel quotidiens  
✅ Envoi d'emails au directeur  
✅ Interface moderne et responsive  
✅ Données en Franc CFA  
✅ Configuration flexible  
✅ Prêt pour la production  

**Objectif atteint** : Application fonctionnelle, complète et prête à l'emploi pour un dépôt de boissons. 🍺📊
