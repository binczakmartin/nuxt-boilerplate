<template>
  <footer class="footer">
    <UContainer>
      <div class="footer-grid">
        <div class="brand">
          <div class="logo">✦</div>
          <div>
            <p class="name">MyApp</p>
            <p class="tagline">La plateforme de relance qui enlève la friction aux équipes B2B.</p>
          </div>
          <div class="chips">
            <span>RGPD-ready</span>
            <span>Support en français</span>
          </div>
        </div>

        <div class="links">
          <p>Produit</p>
          <a href="#benefits">Bénéfices</a>
          <a href="#how-it-works">Comment ça marche</a>
          <a href="#pricing">Tarifs</a>
          <a href="#faq">FAQ</a>
        </div>

        <div class="links">
          <p>Ressources</p>
          <a href="#temoignages">Témoignages</a>
          <a href="#preuve">Preuves</a>
          <a href="#">Guides</a>
          <a href="#">Webinars</a>
        </div>

        <div class="links">
          <p>Contact</p>
          <a href="mailto:hello@myapp.com">hello@myapp.com</a>
          <a href="tel:+33102030405">+33 1 02 03 04 05</a>
          <a href="#">LinkedIn</a>
          <a href="#">Slack communauté</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} MyApp. Tous droits réservés.</p>
        <div class="bottom-links">
          <a href="#">Sécurité</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">CGU</a>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<style scoped>
.footer {
  padding: clamp(2rem, 5vw, 3.5rem) 0;
  border-top: 1px solid var(--border);
  background-color: var(--glass);
  box-shadow: var(--nav-shadow);
  backdrop-filter: blur(16px);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.brand {
  display: grid;
  gap: 0.6rem;
}

.logo {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  color: var(--accent-contrast);
  box-shadow: 0 10px 30px color-mix(in srgb, var(--accent) 30%, transparent);
}

.name {
  margin: 0;
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.tagline {
  margin: 0;
  color: var(--text-secondary);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chips span {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.links {
  display: grid;
  gap: 0.35rem;
}

.links p {
  margin: 0;
  font-weight: 700;
  color: var(--text-primary);
}

.links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.links a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  margin-top: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  color: var(--text-secondary);
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}

.bottom-links {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.bottom-links a {
  color: var(--text-secondary);
  text-decoration: none;
}

.bottom-links a:hover {
  color: var(--text-primary);
}
</style>
