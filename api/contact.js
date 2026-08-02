const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const { name, establishment, email, phone, specialty, details, website } = req.body || {}
  if (website) return res.status(200).json({ ok: true })

  if (![name, establishment, email, specialty, details].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Veuillez saisir une adresse e-mail valide.' })
  }
  if ([name, establishment, phone, specialty].some((value) => String(value || '').length > 200) || details.length > 3000) {
    return res.status(400).json({ error: 'Un ou plusieurs champs sont trop longs.' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.LEAD_TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return res.status(503).json({ error: 'Le service de contact est momentanément indisponible.' })
  }

  const text = [
    '<b>🏥 Nouvelle demande — Corse Médical</b>',
    '',
    `<b>Contact :</b> ${escapeHtml(name.trim())}`,
    `<b>Établissement :</b> ${escapeHtml(establishment.trim())}`,
    `<b>E-mail :</b> ${escapeHtml(email.trim())}`,
    `<b>Téléphone :</b> ${escapeHtml((phone || 'Non renseigné').trim())}`,
    `<b>Spécialité :</b> ${escapeHtml(specialty.trim())}`,
    '',
    '<b>Poste et conditions :</b>',
    escapeHtml(details.trim())
  ].join('\n')

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true })
    })
    if (!response.ok) throw new Error(`Telegram returned ${response.status}`)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Lead delivery failed:', error.message)
    return res.status(502).json({ error: 'La demande n’a pas pu être transmise. Veuillez réessayer.' })
  }
}
