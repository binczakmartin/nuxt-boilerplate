<template>
  <DigitalHive />
  <div class="landing-page">
    <LandingHero
      :eyebrow="heroEyebrow"
      :title="heroTitle"
      :subtitle="heroSubtitle"
      :cta="primaryCta"
      note="Sans carte bancaire • Onboarding guidé en 30 minutes"
      :highlights="heroHighlights"
      :stats="heroStats"
      :streams="heroStreams"
      :spotlight="heroSpotlight"
    />

    <LandingProofBar
      :logos="proofLogos"
      :metrics="proofMetrics"
      :rating="proofRating"
    />

    <LandingFeatures
      eyebrow="Fonctionnalités clés"
      title="Tout ce qu’il faut pour piloter vos relances sans friction"
      description="Une plateforme qui orchestre les relances, alerte vos équipes et garde votre CRM parfaitement à jour."
      :features="features"
    />

    <LandingBenefits
      eyebrow="Proposition de valeur"
      title="Pourquoi choisir MyApp pour vos relances B2B ?"
      description="Chaque bloc est pensé pour réduire la friction : tout est prêt, connecté à votre CRM et optimisé pour que vos équipes passent moins de temps à relancer et plus à signer."
      :benefits="benefits"
    />

    <LandingHowItWorks
      eyebrow="Comment ça marche"
      title="3 étapes pour lancer vos relances sans tableur"
      description="Pas de bricolage : on connecte vos outils, on active un playbook validé et vous suivez les résultats en direct."
      :steps="steps"
    />

    <LandingSocialProof
      eyebrow="Preuve sociale"
      title="Ils ont supprimé la friction dans leurs relances"
      description="Des équipes sales, success et growth qui ont besoin de visibilité et d'actions guidées chaque jour."
      :testimonials="testimonials"
    />

    <LandingPricing
      eyebrow="Offre"
      title="Un seul objectif : lancer vos playbooks rapidement"
      description="Choisissez le plan qui vous correspond. Même CTA partout pour garder l'objectif clair."
      :plans="plans"
    />

    <LandingFAQ
      eyebrow="Objections fréquentes"
      title="On répond avant que vous ne posiez la question"
      description="Tarifs, délai de mise en route, sécurité : voici les réponses rapides pour décider sereinement."
      note="Un CSM vous accompagne sur les 30 premiers jours pour garantir un déploiement sans friction."
      :faqs="faqs"
    />

    <LandingFinalCTA
      eyebrow="On se lance ?"
      title="Essayez MyApp et gagnez vos prochaines signatures dès cette semaine."
      description="Connectez votre CRM, choisissez un playbook, la plateforme s’occupe des relances et des rappels."
      :points="finalPoints"
      :cta="primaryCta"
      note="Sans carte bancaire • Annulation en 1 clic"
    />

    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import DigitalHive from '~/components/landing/backgrounds/DigitalHive.vue'
import LandingBenefits from '~/components/landing/LandingBenefits.vue'
import LandingFAQ from '~/components/landing/LandingFAQ.vue'
import LandingFinalCTA from '~/components/landing/LandingFinalCTA.vue'
import LandingFooter from '~/components/landing/LandingFooter.vue'
import LandingHero from '~/components/landing/LandingHero.vue'
import LandingHowItWorks from '~/components/landing/LandingHowItWorks.vue'
import LandingPricing from '~/components/landing/LandingPricing.vue'
import LandingFeatures from '~/components/landing/LandingFeatures.vue'
import LandingProofBar from '~/components/landing/LandingProofBar.vue'
import LandingSocialProof from '~/components/landing/LandingSocialProof.vue'

const primaryCta = { label: 'Essayer gratuitement', to: '/register' }
const heroEyebrow = 'Nouveau : playbooks prêts en 10 minutes'
const heroTitle = 'Obtenez des relances qui convertissent<br>sans tableur ni copier-coller.'
const heroSubtitle = 'MyApp orchestre vos suivis B2B : connectez votre CRM, activez un playbook validé et laissez la plateforme personnaliser chaque relance au bon moment.'

const heroHighlights = [
  { title: 'Playbooks prêts', detail: 'Séquences validées pour chaque scénario B2B.', icon: '🚀' },
  { title: 'Sync CRM', detail: 'Pas de double saisie, scoring et tâches auto.', icon: '🔄' },
  { title: 'Signaux chauds', detail: 'Alertes Slack quand un deal chauffe ou décroche.', icon: '⚡' }
]

const heroStats = [
  { label: 'Temps gagné', value: '-12 h/sem', hint: 'Relances automatisées + rappels Slack' },
  { label: 'Réponses en plus', value: '+34%', hint: 'Objets optimisés + personnalisation CRM' },
  { label: 'Mise en route', value: '24 h', hint: 'Onboarding guidé, sans carte bancaire' }
]

const heroStreams = [
  { title: 'Lisa • Inbound PME', status: 'Prêt à envoyer', time: 'Séquence 4 · Jour 3' },
  { title: 'Dylan • Relance devis', status: 'En attente de validation', time: 'Séquence 2 · Jour 1' },
  { title: 'Allan • POC en cours', status: 'Envoyé + rappel prévu', time: 'Séquence 5 · Jour 6' }
]

const heroSpotlight = {
  metric: 'Taux de réponse moyen',
  value: '38%',
  delta: '+6 pts vs dernier mois'
}

const proofLogos = ['Solstice', 'Northwind', 'Helios', 'AtlasPay', 'Nira', 'Krescendo']
const proofMetrics = [
  { value: '+2 400', label: 'équipes B2B', detail: 'Sales, success et growth' },
  { value: '34%', label: 'de temps gagné', detail: 'en moyenne après 30 jours' }
]
const proofRating = { score: '4.8', detail: 'Score moyen G2 et Capterra' }

const features = [
  {
    title: 'Orchestration multi-canal',
    description: 'Emails, tâches LinkedIn et rappels téléphoniques déclenchés au bon moment selon le pipeline.',
    icon: 'i-heroicons-sparkles',
    tag: 'Playbooks',
    points: ['Templates validés par des équipes B2B', 'Timing optimisé sur chaque étape']
  },
  {
    title: 'Sync CRM en temps réel',
    description: 'Mises à jour et logs automatiques : plus de copie/coller ni d’oublis dans HubSpot, Pipedrive ou Salesforce.',
    icon: 'i-heroicons-arrow-path-rounded-square',
    tag: 'Ops',
    points: ['Création de tâches et champs custom', 'Suppression auto des contacts hors opt-in']
  },
  {
    title: 'Alertes sur les signaux chauds',
    description: 'Slack et email préviennent l’équipe quand un prospect ouvre, clique ou répond.',
    icon: 'i-heroicons-bell-alert',
    points: ['Scores de priorité mis à jour en continu', 'Notifications ciblées par équipe']
  },
  {
    title: 'IA de personnalisation prête à l’emploi',
    description: 'Résumé des fiches CRM, suggestions d’angles et rédaction contextualisée en un clic.',
    icon: 'i-heroicons-cpu-chip',
    tag: 'Assistant IA',
    points: ['Ton ajustable par persona', 'Contrôles humains avant envoi']
  },
  {
    title: 'Vue équipe et market fit',
    description: 'Dashboards prêts : suivi par segment, par séquence et par AE.',
    icon: 'i-heroicons-chart-bar-square',
    points: ['KPIs temps réel', 'Comparaison des playbooks actifs']
  },
  {
    title: 'Sécurité & conformité natives',
    description: 'Hébergement UE, permissions granulaires et audit trail complet pour chaque action.',
    icon: 'i-heroicons-shield-check',
    tag: 'Confiance',
    points: ['Gestion fine des rôles', 'Exports sécurisés sur demande']
  }
]

const benefits = [
  {
    title: 'Réduisez le temps de relance de 60%',
    description: 'Playbooks prêts pour chaque moment du cycle : devis, POC, renouvellement, relances inbound.',
    proof: '10 minutes pour lancer une séquence complète.',
    icon: '⏱️'
  },
  {
    title: 'Personnalisation sans tableur',
    description: 'L’IA résume la fiche CRM, détecte les signaux clés et génère les messages contextualisés.',
    proof: '+34% de réponses sur les campagnes personnalisées.',
    icon: '🧠'
  },
  {
    title: 'Priorités claires pour les SDR',
    description: 'Scoring en temps réel, tasks auto et alertes Slack pour concentrer l’équipe là où ça chauffe.',
    proof: 'Vos 10 deals les plus chauds chaque matin.',
    icon: '🎯'
  },
  {
    title: 'Ops et conformité sereines',
    description: 'Sync bidirectionnelle avec votre CRM, gestion des opt-in, suppression automatique sur demande.',
    proof: 'Aucune double saisie ni contact hors opt-in.',
    icon: '🛡️'
  }
]

const steps = [
  {
    tag: 'Étape 1',
    title: 'Connectez vos outils',
    text: 'HubSpot, Pipedrive, Salesforce ou votre CRM maison via API.',
    points: ['Import des contacts et deals en 1 clic', 'Nettoyage automatique des doublons', 'Scoring activé dès la synchro']
  },
  {
    tag: 'Étape 2',
    title: 'Choisissez un playbook validé',
    text: 'Séquences emails, LinkedIn et tâches manuelles prêtes pour chaque cas.',
    points: ['Templates validés par des équipes B2B', 'Personnalisation générée à partir du CRM', 'Timing optimisé selon votre cycle']
  },
  {
    tag: 'Étape 3',
    title: 'Suivez les résultats en direct',
    text: 'La plateforme relance, notifie et met à jour votre CRM pour vous.',
    points: ['Alertes sur les signaux chauds', 'Dashboard par équipe et par marché', 'Recommandations d’étapes suivantes']
  }
]

const testimonials = [
  {
    quote: 'On a doublé nos prises de RDV en 6 semaines sans recruter.',
    result: '+52% de réponses sur les séquences multi-canal',
    name: 'Claire Dumont',
    role: 'Head of Sales, Alto'
  },
  {
    quote: 'Les SDR savent quoi faire chaque matin, les relances sont déjà prêtes.',
    result: '-11 h par semaine de tâches répétitives',
    name: 'Yanis Karim',
    role: 'CEO, Neostack'
  },
  {
    quote: 'On a enfin une vue fiable des relances en cours et de leur impact.',
    result: '+18% de conversion MQL > SQL en 2 mois',
    name: 'Leila Haddad',
    role: 'RevOps, NovaTech'
  }
]

const faqs = [
  {
    question: 'Combien de temps pour démarrer ?',
    answer: 'En moins de 30 minutes : connexion CRM, import des modèles si besoin et activation d’un playbook.'
  },
  {
    question: 'Quelles intégrations sont disponibles ?',
    answer: 'HubSpot, Pipedrive, Salesforce, Google Sheets, Zapier et webhooks pour vos outils internes.'
  },
  {
    question: 'Puis-je garder mes modèles existants ?',
    answer: 'Oui, import Markdown ou CSV. On vous aide à les convertir en playbooks avec personnalisation automatique.'
  },
  {
    question: 'Et la conformité / RGPD ?',
    answer: 'Données hébergées dans l’UE, logs complets, suppression automatique sur demande et gestion fine des opt-in.'
  },
  {
    question: 'Y a-t-il un engagement ?',
    answer: 'Non. Essai gratuit, puis abonnement mensuel. Annulation en un clic depuis l’espace client.'
  },
  {
    question: 'Comment êtes-vous différent d’un simple outil d’e-mailing ?',
    answer: 'Nous pilotons la relance multi-canal, synchronisée au CRM et avec scoring temps réel. L’outil d’e-mailing est juste un des canaux.'
  }
]

const plans = [
  {
    name: 'Starter',
    description: 'Pour lancer vos premiers playbooks avec une petite équipe.',
    price: '39€',
    period: '/utilisateur/mois',
    features: [
      'Séquences illimitées email + LinkedIn',
      'Connecteurs HubSpot & Pipedrive',
      'Scoring deals chauds + alertes',
      'Support email et base de connaissances'
    ],
    note: 'Idéal pour 1 à 3 personnes.',
    cta: primaryCta
  },
  {
    name: 'Growth',
    description: 'Pour les équipes qui relancent à grande échelle.',
    price: '89€',
    period: '/utilisateur/mois',
    features: [
      'Playbooks multi-équipes + rôles',
      'Salesforce & webhooks personnalisés',
      'Insights en temps réel + alertes Slack',
      'CSM dédié et atelier onboarding'
    ],
    note: 'Support prioritaire inclus.',
    popular: true,
    cta: primaryCta
  }
]

const finalPoints = [
  'Playbooks prêts pour relancer dès aujourd’hui',
  'Personnalisation automatique sans tableur',
  'Support humain en français'
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

.landing-page {
  position: relative;
  display: flex;
  flex-direction: column;
  /* gap: clamp(1.5rem, 3vw, 2.5rem); */
  /* padding-bottom: 2rem; */
}

:global(.app-content) {
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100%;
}
</style>
