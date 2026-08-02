# Corse Médical — Recrutement médical en Corse

Landing page française pour une offre de recrutement de médecins au succès, inspirée des principes du Carbon Design System.

## Développement

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
```

## Variables Vercel

- `TELEGRAM_BOT_TOKEN` : jeton du bot recevant les demandes
- `LEAD_TELEGRAM_CHAT_ID` : identifiant Telegram du destinataire

Le formulaire `/api/contact` valide les champs, utilise un honeypot anti-spam et transmet les demandes via Telegram sans exposer le jeton côté client.
