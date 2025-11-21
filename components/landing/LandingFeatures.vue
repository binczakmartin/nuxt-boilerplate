<template>
  <section class="features" id="features">
    <UContainer>
      <div class="features__header">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <p class="lead">{{ description }}</p>
      </div>

      <div class="features__grid">
        <article v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-card__top">
            <div class="feature-card__icon">
              <UIcon v-if="feature.icon" :name="feature.icon" class="icon" />
              <span v-else>{{ feature.emoji }}</span>
            </div>
            <span v-if="feature.tag" class="feature-card__tag">{{ feature.tag }}</span>
          </div>

          <h3>{{ feature.title }}</h3>
          <p class="feature-card__text">{{ feature.description }}</p>

          <ul v-if="feature.points?.length" class="feature-card__points">
            <li v-for="point in feature.points" :key="point">
              <span class="check">✓</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Feature = {
  title: string
  description: string
  icon?: string
  emoji?: string
  tag?: string
  points?: string[]
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  features: Feature[]
}>()
</script>

<style scoped>
.features {
  background: var(--bg-page);
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
}

.features__header {
  text-align: center;
  max-width: 780px;
  margin: 0 auto clamp(2rem, 4vw, 3rem);
  display: grid;
  gap: 0.65rem;
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

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.feature-card {
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  padding: 1.2rem 1.1rem 1.35rem;
  background: linear-gradient(175deg, color-mix(in srgb, var(--surface) 94%, transparent), color-mix(in srgb, var(--accent) 10%, transparent));
  box-shadow: var(--shadow-soft);
  display: grid;
  gap: 0.7rem;
  height: 100%;
}

.feature-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.feature-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  color: var(--text-primary);
  font-size: 1.3rem;
}

.icon {
  width: 22px;
  height: 22px;
}

.feature-card__tag {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 26%, transparent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.85rem;
}

.feature-card h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.15rem;
  letter-spacing: -0.01em;
}

.feature-card__text {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.55;
}

.feature-card__points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;
}

.feature-card__points li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
  color: var(--text-secondary);
}

.check {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  color: var(--text-primary);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.85rem;
}

@media (max-width: 640px) {
  .feature-card {
    padding: 1.1rem 1rem 1.25rem;
  }
}
</style>
