# 📧 Configuration de l'envoi d'emails - GestStock

## 🎯 Pourquoi EmailJS ?

EmailJS est un service gratuit qui permet d'envoyer des emails directement depuis une application frontend (React, JavaScript) sans avoir besoin d'un serveur backend.

**Plan gratuit** : 200 emails/mois

---

## 📋 Étapes de configuration

### 1️⃣ Créer un compte EmailJS

1. Allez sur **[https://www.emailjs.com/](https://www.emailjs.com/)**
2. Cliquez sur **"Sign Up Free"**
3. Créez votre compte (email + mot de passe)

### 2️⃣ Ajouter un Service Email

1. Dans le dashboard, cliquez sur **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur d'email :
   - **Gmail** (recommandé)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Autre...
4. Connectez votre compte email
5. Une fois connecté, notez le **Service ID** (ex: `service_abc123`)

### 3️⃣ Créer un Template Email

1. Dans le dashboard, cliquez sur **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template :

**Subject :**
```
{{subject}}
```

**Content (HTML) :**
```html
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color: #2563eb;">Rapport de Stock Quotidien</h2>
  
  <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <pre style="white-space: pre-wrap; font-family: monospace;">{{message}}</pre>
  </div>
  
  <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
    Cet email a été envoyé automatiquement par le système GestStock.
  </p>
</body>
</html>
```

**To Email :**
```
{{to_email}}
```

4. Cliquez sur **"Save"**
5. Notez le **Template ID** (ex: `template_xyz789`)

### 4️⃣ Récupérer votre Public Key

1. Dans le dashboard, cliquez sur **"Account"**
2. Dans la section **"API Keys"**, copiez la **Public Key**
3. Elle ressemble à : `AbCdEfGhIjKlMnOpQrStU`

### 5️⃣ Configurer dans GestStock

1. Lancez l'application : `npm run dev`
2. Dans le menu, cliquez sur **"Paramètres"** (icône ⚙️)
3. Dans la section **"Configuration EmailJS"**, remplissez :
   - **Service ID** : `service_abc123` (celui que vous avez noté)
   - **Template ID** : `template_xyz789` (celui que vous avez noté)
   - **Public Key** : `AbCdEfGhIjKlMnOpQrStU` (celui que vous avez copié)
4. Cliquez sur **"Enregistrer"**

✅ **C'est configuré !** Vous pouvez maintenant envoyer des rapports par email.

---

## 🧪 Tester l'envoi

1. Allez dans la page **"Rapports & Email"**
2. Cliquez sur **"Envoyer par Email"**
3. Vous devriez voir un message de succès ✅
4. Vérifiez votre boîte de réception (et les spams !)

---

## ❌ Dépannage

### Erreur : "Configuration EmailJS incomplète"

**Solution** : Vérifiez que vous avez bien rempli les 3 champs dans les Paramètres :
- Service ID
- Template ID
- Public Key

### Erreur : "Service Unavailable"

**Solution** : 
- Vérifiez que votre Service Email est bien connecté dans EmailJS
- Vérifiez que votre compte email source est actif

### Erreur : "Template not found"

**Solution** : 
- Vérifiez le Template ID (copiez-le directement depuis EmailJS)
- Vérifiez que le template est bien sauvegardé

### L'email n'arrive pas

**Solutions** :
1. Vérifiez le dossier **Spam/Indésirables**
2. Vérifiez l'adresse email du directeur dans les Paramètres
3. Vérifiez les logs dans la console du navigateur (F12 > Console)
4. Vérifiez votre quota EmailJS (200 emails/mois en gratuit)

---

## 🔒 Sécurité

- Vos clés EmailJS sont stockées localement dans votre navigateur (localStorage)
- Elles ne sont pas envoyées à un serveur tiers
- EmailJS utilise HTTPS pour tous les envois
- Vous pouvez régénérer vos clés à tout moment depuis votre compte EmailJS

---

## 💡 Conseils

- **Testez d'abord** avec votre propre email avant de configurer celui du directeur
- **Surveillez votre quota** : EmailJS gratuit = 200 emails/mois
- **Gardez vos clés secrètes** : ne les partagez pas publiquement
- **Utilisez un email professionnel** pour le service (pas un email personnel)

---

## 📞 Support

- Documentation EmailJS : [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Support EmailJS : [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**Besoin d'aide ?** Vérifiez que vous avez bien suivi toutes les étapes ci-dessus dans l'ordre.
