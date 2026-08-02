import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Arrow = ({ direction = 'right' }) => (
  <svg className={`icon icon-${direction}`} viewBox="0 0 32 32" aria-hidden="true">
    <path d={direction === 'down' ? 'M16 22 6 12l1.4-1.4L16 19.2l8.6-8.6L26 12Z' : 'm18 6-1.4 1.4 7.6 7.6H4v2h20.2l-7.6 7.6L18 26l10-10Z'} />
  </svg>
)

const Check = () => (
  <svg className="check" viewBox="0 0 32 32" aria-hidden="true"><path d="m13 24-8-8 1.4-1.4 6.6 6.6L25.6 8.6 27 10Z" /></svg>
)

const specialties = [
  'Médecine générale', 'Médecine d’urgence', 'Anesthésie-réanimation', 'Radiologie',
  'Psychiatrie', 'Pédiatrie', 'Gynécologie-obstétrique', 'Gériatrie',
  'Cardiologie', 'Gastro-entérologie', 'Oncologie', 'Médecine du travail',
  'Médecine coordonnatrice', 'Spécialités chirurgicales'
]

const steps = [
  {
    number: '01',
    title: 'Qualification du besoin',
    text: 'Spécialité, statut, rémunération, gardes, organisation du service, date de prise de poste et conditions d’installation.'
  },
  {
    number: '02',
    title: 'Recherche ciblée',
    text: 'Approche directe de médecins correspondant au poste, notamment au sein de notre réseau médical franco-tunisien.'
  },
  {
    number: '03',
    title: 'Présélection',
    text: 'Entretien préalable pour vérifier parcours, qualifications, droit d’exercice, motivations, disponibilité et projet familial.'
  },
  {
    number: '04',
    title: 'Mise en relation et suivi',
    text: 'Organisation des entretiens et accompagnement jusqu’à la prise de poste, avec appui possible pour la visite et l’installation.'
  }
]

const faqs = [
  ['Quand les honoraires sont-ils facturés ?', 'Uniquement lorsque le médecin recruté prend effectivement ses fonctions dans votre établissement. Aucun acompte, abonnement ou frais de lancement n’est demandé.'],
  ['Quels médecins sont présentés ?', 'Des médecins déjà inscrits à l’Ordre en France ou disposant d’une autorisation valide leur permettant d’y exercer. Chaque situation administrative est vérifiée avant présentation.'],
  ['Que couvre la garantie de trois mois ?', 'Si le médecin quitte son poste pendant les trois premiers mois, nous relançons gratuitement une recherche pour le même poste. Il s’agit d’une nouvelle mission, et non d’un remboursement.'],
  ['Pouvez-vous aider à l’installation en Corse ?', 'Oui. Selon le besoin, nous pouvons faciliter une première visite, une période d’immersion, la recherche d’un logement, l’installation familiale et les échanges administratifs avant la prise de poste.'],
  ['Combien de temps un candidat présenté est-il protégé ?', 'Un médecin introduit auprès de l’établissement est considéré comme présenté pendant 12 mois. Les honoraires restent dus en cas de recrutement direct ou indirect pendant cette période.']
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [formState, setFormState] = useState({ status: 'idle', message: '' })

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  async function submitLead(event) {
    event.preventDefault()
    setFormState({ status: 'loading', message: '' })
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Une erreur est survenue.')
      form.reset()
      setFormState({ status: 'success', message: 'Votre demande a bien été transmise. Nous revenons vers vous rapidement.' })
    } catch (error) {
      setFormState({ status: 'error', message: error.message || 'Impossible d’envoyer la demande.' })
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('accueil')} aria-label="Retour à l’accueil">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
          <span className="brand-name">CORSE MÉDICAL</span>
        </button>
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navigation principale">
          <button onClick={() => scrollTo('approche')}>Notre approche</button>
          <button onClick={() => scrollTo('specialites')}>Spécialités</button>
          <button onClick={() => scrollTo('tarification')}>Tarification</button>
          <button onClick={() => scrollTo('faq')}>FAQ</button>
        </nav>
        <button className="header-cta" onClick={() => scrollTo('contact')}>Démarrer une recherche <Arrow /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
          <span /><span /><span />
        </button>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-content">
            <p className="eyebrow">RECRUTEMENT MÉDICAL · CORSE</p>
            <h1>Recruter un médecin.<br /><span>Réussir son installation.</span></h1>
            <p className="hero-lead">Nous accompagnons les établissements de santé corses dans le recrutement de médecins durablement intéressés par une installation sur l’île.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('contact')}>Nous confier un poste <Arrow /></button>
              <button className="button button-tertiary" onClick={() => scrollTo('approche')}>Voir les 4 étapes <Arrow direction="down" /></button>
            </div>
          </div>
          <div className="hero-visual" aria-label="Indicateurs clés de l’offre">
            <div className="island-grid" aria-hidden="true">
              <svg className="corsica" viewBox="0 0 230 420">
                <path d="M125 7c18 26 11 45 31 63 14 13 33 16 39 35 7 22-13 43-4 62 7 15 29 18 30 37 2 24-28 38-31 61-3 21 19 37 10 58-10 23-43 25-56 47-10 17-4 41-20 54-18 14-43-5-49-24-8-22 4-43-8-62-10-25-41-35-44-62-3-26 27-42 34-66 6-22-7-43-2-65 6-28 38-39 45-65 5-19-5-52 25-73Z" />
              </svg>
              <span className="map-label label-bastia">Bastia</span>
              <span className="map-label label-ajaccio">Ajaccio</span>
            </div>
            <div className="hero-metric metric-main"><strong>0 €</strong><span>avant la prise de poste</span></div>
            <div className="hero-metric metric-small"><strong>3 mois</strong><span>de garantie de remplacement</span></div>
          </div>
        </section>

        <section className="proof-band" aria-label="Les engagements clés">
          <article><span className="proof-number">15 000 € HT</span><span>par médecin recruté</span></article>
          <article><span className="proof-number">100 % au succès</span><span>aucun recrutement, aucun honoraire</span></article>
          <article><span className="proof-number">Droit d’exercice vérifié</span><span>avant toute présentation</span></article>
          <article><span className="proof-number">1 interlocuteur</span><span>jusqu’à la prise de poste</span></article>
        </section>

        <section className="split-section intro-section" id="approche">
          <div className="section-heading">
            <p className="eyebrow">NOTRE PROMESSE</p>
            <h2>Une recherche active, sans risque financier initial.</h2>
          </div>
          <div className="section-copy">
            <p>Nous ne nous contentons pas de publier une annonce. Nous identifions et approchons directement les médecins dont le projet professionnel et familial peut réellement s’inscrire en Corse.</p>
            <p>Notre réseau est particulièrement développé auprès de médecins tunisiens francophones, déjà autorisés à exercer en France et ouverts à une nouvelle opportunité sur l’île.</p>
            <div className="inline-note"><Check /><span>Seuls les candidats ayant confirmé leur intérêt, leur disponibilité et leur compatibilité avec le poste sont transmis.</span></div>
          </div>
        </section>

        <section className="process-section">
          <div className="section-intro">
            <p className="eyebrow">UN PROCESSUS EXIGEANT</p>
            <h2>Du besoin à la prise de poste</h2>
            <p>Quatre étapes claires, un suivi continu et des critères vérifiés avant chaque mise en relation.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="specialties-section" id="specialites">
          <div className="section-intro specialties-intro">
            <p className="eyebrow">PROFILS CONCERNÉS</p>
            <h2>Toutes les spécialités médicales</h2>
            <p>Nous adaptons la recherche à la réalité de votre établissement, du besoin urgent au recrutement de long terme.</p>
          </div>
          <div className="specialties-grid">
            {specialties.map((specialty, index) => (
              <div className="specialty-tile" key={specialty}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{specialty}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="support-section">
          <div className="support-visual">
            <div className="support-title"><span>ACCOMPAGNEMENT</span><strong>Une installation préparée, pas seulement un recrutement.</strong></div>
            <div className="support-lines" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="support-list">
            {['Première visite en Corse', 'Période de remplacement ou d’immersion', 'Recherche d’un logement', 'Préparation de l’installation familiale', 'Échanges administratifs avant la prise de poste'].map((item) => (
              <div key={item}><Check /><span>{item}</span></div>
            ))}
          </div>
        </section>

        <section className="pricing-section" id="tarification">
          <div className="pricing-copy">
            <p className="eyebrow">TARIFICATION TRANSPARENTE</p>
            <h2>Vous payez quand le médecin prend ses fonctions.</h2>
            <p>Aucun acompte, aucun abonnement, aucun frais de lancement et aucun paiement pour les candidats simplement présentés.</p>
            <div className="guarantee-box">
              <span className="tag">GARANTIE</span>
              <h3>Remplacement pendant 3 mois</h3>
              <p>Si le médecin quitte son poste au cours des trois premiers mois, une nouvelle recherche est relancée gratuitement pour le même poste.</p>
            </div>
          </div>
          <div className="price-card">
            <span className="price-label">HONORAIRES AU SUCCÈS</span>
            <div className="price"><strong>15 000 €</strong><span>HT</span></div>
            <p>par médecin recruté et effectivement installé</p>
            <ul>
              <li><Check />Qualification complète du besoin</li>
              <li><Check />Approche directe et présélection</li>
              <li><Check />Vérification du droit d’exercice</li>
              <li><Check />Organisation des entretiens</li>
              <li><Check />Suivi jusqu’à la prise de poste</li>
              <li><Check />Garantie de remplacement de 3 mois</li>
            </ul>
            <button className="button button-primary button-full" onClick={() => scrollTo('contact')}>Lancer une recherche <Arrow /></button>
            <span className="no-risk">Aucun recrutement : aucun honoraire.</span>
          </div>
        </section>

        <section className="commitments-section">
          <div className="section-intro">
            <p className="eyebrow">POUR RÉUSSIR LA MISSION</p>
            <h2>Ce que nous attendons de l’établissement</h2>
          </div>
          <div className="commitment-list">
            {[
              ['01', 'Une fiche de poste complète'],
              ['02', 'Une rémunération clairement définie'],
              ['03', 'Le planning et les modalités de garde'],
              ['04', 'Un interlocuteur disponible'],
              ['05', 'Un retour rapide après chaque candidature'],
              ['06', 'Si possible, une aide au logement ou à l’installation']
            ].map(([n, text]) => <div key={n}><span>{n}</span><strong>{text}</strong></div>)}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-heading">
            <p className="eyebrow">QUESTIONS FRÉQUENTES</p>
            <h2>Les réponses essentielles</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{question}</span><span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer"><p>{answer}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-light">DÉMARRER UNE RECHERCHE</p>
            <h2>Parlons du poste à pourvoir.</h2>
            <p>Indiquez-nous la spécialité recherchée, la localisation, les conditions du poste et la date de prise de fonctions souhaitée. Nous revenons vers vous avec une première analyse de faisabilité, sans frais initiaux.</p>
            <div className="contact-promise"><strong>Un médecin recruté et installé : 15 000 € HT.</strong><span>Aucun recrutement : aucun honoraire.</span></div>
          </div>
          <form className="lead-form" onSubmit={submitLead}>
            <input type="text" name="website" className="honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div className="form-row">
              <label><span>Nom et prénom *</span><input name="name" required autoComplete="name" /></label>
              <label><span>Établissement *</span><input name="establishment" required autoComplete="organization" /></label>
            </div>
            <div className="form-row">
              <label><span>E-mail professionnel *</span><input name="email" type="email" required autoComplete="email" /></label>
              <label><span>Téléphone</span><input name="phone" type="tel" autoComplete="tel" /></label>
            </div>
            <label><span>Spécialité recherchée *</span><input name="specialty" required /></label>
            <label><span>Localisation et conditions du poste *</span><textarea name="details" rows="5" required placeholder="Ville, type de contrat, rémunération, gardes, date souhaitée…" /></label>
            <label className="consent"><input type="checkbox" required /><span>J’accepte d’être recontacté au sujet de cette demande.</span></label>
            <button className="button button-white" type="submit" disabled={formState.status === 'loading'}>
              {formState.status === 'loading' ? 'Envoi en cours…' : 'Transmettre la demande'} <Arrow />
            </button>
            {formState.message && <p className={`form-message ${formState.status}`} role="status">{formState.message}</p>}
            <p className="privacy-note">Vos informations sont utilisées uniquement pour traiter votre demande de recrutement.</p>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
          <span>CORSE MÉDICAL</span>
        </div>
        <p>Recrutement médical spécialisé en Corse, facturé uniquement au succès.</p>
        <div className="footer-links"><button onClick={() => scrollTo('approche')}>Notre approche</button><button onClick={() => scrollTo('tarification')}>Tarification</button><button onClick={() => scrollTo('contact')}>Contact</button></div>
        <div className="footer-legal"><span>© {new Date().getFullYear()} Corse Médical</span><span>Protection des candidatures : 12 mois</span></div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
