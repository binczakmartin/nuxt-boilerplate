<template>
  <section class="benefits" id="benefits">
    <UContainer>
      <div class="section-heading">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <p class="lead">{{ description }}</p>
      </div>

      <div class="benefit-grid">
        <article v-for="benefit in benefits" :key="benefit.title" class="benefit-card">
          <div class="benefit-icon">{{ benefit.icon }}</div>
          <h3>{{ benefit.title }}</h3>
          <p class="benefit-text">{{ benefit.description }}</p>
          <div class="benefit-proof">{{ benefit.proof }}</div>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Benefit = {
  title: string
  description: string
  proof: string
  icon: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  benefits: Benefit[]
}>()
</script>

<style scoped>
.benefits {
  background-color: var(--bg-page);
  padding: clamp(2.5rem, 6vw, 4.5rem) 0 clamp(2rem, 5vw, 3.5rem);
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

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.benefit-card {
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  padding: 1.25rem;
  background: linear-gradient(180deg, color-mix(in srgb, var(--surface) 96%, transparent), color-mix(in srgb, var(--accent) 12%, transparent));
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 0.6rem;
}

.benefit-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  display: grid;
  place-items: center;
  font-size: 1.3rem;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}

.benefit-card h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2rem;
}

.benefit-text {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.55;
}

.benefit-proof {
  margin-top: auto;
  padding: 0.6rem 0.8rem;
  border-radius: 0.9rem;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-weight: 600;
}
</style>
