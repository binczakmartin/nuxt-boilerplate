<template>
  <section class="pricing" id="pricing">
    <UContainer>
      <div class="section-heading">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <p class="lead">{{ description }}</p>
      </div>

      <div class="pricing-grid">
        <article v-for="plan in plans" :key="plan.name" class="plan" :class="{ popular: plan.popular }">
          <div class="plan-header">
            <div>
              <p class="plan-name">{{ plan.name }}</p>
              <p class="plan-desc">{{ plan.description }}</p>
            </div>
            <span v-if="plan.popular" class="badge">Best</span>
          </div>

          <div class="plan-price">
            <span class="amount">{{ plan.price }}</span>
            <span class="period">{{ plan.period }}</span>
          </div>

          <ul class="plan-features">
            <li v-for="feature in plan.features" :key="feature">
              <span class="check">✓</span>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <NuxtLink :to="plan.cta.to" class="cta-link">
            <UiButton :variant="plan.popular ? 'primary' : 'solid'" block>
              {{ plan.cta.label }}
            </UiButton>
          </NuxtLink>
          <p class="plan-note">{{ plan.note }}</p>
        </article>
      </div>

      <div class="guarantees">
        <div class="guarantee">
          <span>↺</span>
          Satisfait ou remboursé pendant 30 jours
        </div>
        <div class="guarantee">
          <span>✦</span>
          Annulation ou changement de plan en 1 clic
        </div>
        <div class="guarantee">
          <span>☏</span>
          Accompagnement onboarding inclus
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Plan = {
  name: string
  description: string
  price: string
  period: string
  features: string[]
  note: string
  popular?: boolean
  cta: {
    label: string
    to: string
  }
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  plans: Plan[]
}>()
</script>

<style scoped>
.pricing {
  background-color: var(--bg-page);
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
}

.section-heading {
  text-align: center;
  max-width: 760px;
  margin: 0 auto clamp(2rem, 4vw, 3rem);
  display: grid;
  gap: 0.6rem;
}

.eyebrow {
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-helper);
  font-weight: 700;
  margin: 0;
  font-size: 0.8rem;
}

h2 {
  margin: 0;
  font-family: 'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif;
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.lead {
  color: var(--text-secondary);
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.6;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.plan {
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 1.1rem 1.2rem;
  background: linear-gradient(150deg, color-mix(in srgb, var(--surface) 95%, transparent), color-mix(in srgb, var(--accent) 8%, transparent));
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.1);
  display: grid;
  gap: 0.8rem;
}

.plan.popular {
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  box-shadow: 0 28px 70px color-mix(in srgb, var(--accent) 20%, transparent);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.plan-name {
  margin: 0;
  color: var(--text-primary);
  font-weight: 800;
  letter-spacing: -0.01em;
}

.plan-desc {
  margin: 0.1rem 0 0;
  color: var(--text-secondary);
}

.badge {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--text-primary);
  font-weight: 700;
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
}

.plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.amount {
  font-size: 2rem;
  color: var(--text-primary);
  font-weight: 800;
}

.period {
  color: var(--text-secondary);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.45rem;
}

.plan-features li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
  color: var(--text-secondary);
}

.check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--state-success) 14%, transparent);
  color: var(--text-primary);
  font-weight: 800;
}

.cta-link {
  text-decoration: none;
}

.plan-note {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.guarantees {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.guarantee {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-weight: 700;
}

.guarantee span {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid var(--border);
}
</style>
