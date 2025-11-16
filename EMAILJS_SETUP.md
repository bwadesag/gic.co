# Configuration EmailJS pour le Formulaire de Contact

## Étapes pour Activer l'Envoi d'Emails

### 1. Créer un Compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Connectez-vous à votre tableau de bord

### 2. Configurer un Service Email
1. Dans le tableau de bord, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte email
5. **Copiez le Service ID** (ex: `service_abc123`)

### 3. Créer un Template d'Email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template :

```
Sujet: Nouveau message de {{from_name}} - {{subject}}

Contenu:
Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Ce message a été envoyé depuis le site web GIC COOP-CA & EMMAÜS
```

4. **Copiez le Template ID** (ex: `template_xyz789`)

### 4. Obtenir la Clé Publique
1. Allez dans "Account" > "General"
2. **Copiez votre Public Key** (ex: `user_abc123def456`)

### 5. Mettre à Jour le Code
Dans le fichier `script.js`, remplacez ces lignes (lignes 125-127) :

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Remplacez par votre Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // Remplacez par votre Template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Remplacez par votre Public Key
```

Par vos vrais identifiants :

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'user_abc123def456';
```

### 6. Configurer l'Email de Réception
Dans le fichier `script.js`, ligne 152, remplacez :
```javascript
to_email: 'gic.coop.ca@gmail.com' // Votre adresse email de réception
```

Par votre vraie adresse email où vous voulez recevoir les messages.

## Fonctionnalités Implémentées

✅ **Formulaire fonctionnel** avec validation
✅ **Indicateur de chargement** pendant l'envoi
✅ **Messages de confirmation** (succès/erreur)
✅ **Validation email** automatique
✅ **Interface utilisateur améliorée**

## Test du Formulaire

1. Ouvrez votre site web
2. Allez à la section Contact
3. Remplissez le formulaire
4. Cliquez sur "Envoyer le message"
5. Vérifiez que vous recevez l'email

## Limites du Plan Gratuit EmailJS

- 200 emails par mois
- 2 services email
- 2 templates
- Support par email

## Support

Si vous avez des problèmes :
1. Vérifiez la console du navigateur (F12) pour les erreurs
2. Assurez-vous que tous les IDs sont corrects
3. Vérifiez que votre service email est bien connecté
