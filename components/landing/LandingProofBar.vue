<template>
  <section class="proof" id="preuve">
    <UContainer>
      <div class="proof-card">
        <div class="logo-block">
          <p class="eyebrow">Ils nous font confiance</p>
          <div class="logo-row">
            <span v-for="logo in logos" :key="logo" class="logo-pill">{{ logo }}</span>
          </div>
        </div>

        <div class="metrics">
          <div v-for="metric in metrics" :key="metric.label" class="metric">
            <strong>{{ metric.value }}</strong>
            <p>{{ metric.label }}</p>
            <small>{{ metric.detail }}</small>
          </div>
          <div class="metric rating">
            <div class="stars">
              <span v-for="star in 5" :key="star">★</span>
            </div>
            <p>{{ rating.score }} / 5</p>
            <small>{{ rating.detail }}</small>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Metric = {
  value: string
  label: string
  detail: string
}

type Rating = {
  score: string
  detail: string
}

defineProps<{
  logos: string[]
  metrics: Metric[]
  rating: Rating
}>()
</script>

<style scoped>
.proof {
  padding: clamp(1.5rem, 4vw, 3rem) 0;
}

.proof-card {
  border: 1px solid var(--border);
  border-radius: 1.4rem;
  padding: clamp(1rem, 3vw, 1.6rem);
  background: linear-gradient(110deg, color-mix(in srgb, var(--accent) 8%, transparent), color-mix(in srgb, var(--surface) 95%, transparent));
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 1.4rem;
}

.logo-block {
  display: grid;
  gap: 0.75rem;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: var(--text-helper);
  font-size: 0.78rem;
}

.logo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.logo-pill {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px dashed var(--border);
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--surface) 85%, transparent);
  font-weight: 600;
  letter-spacing: 0.01em;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.9rem;
}

.metric {
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  padding: 0.85rem 1rem;
  box-shadow: var(--shadow-soft);
}

.metric strong {
  display: block;
  color: var(--text-primary);
  font-size: 1.35rem;
}

.metric p {
  margin: 0.15rem 0 0.15rem;
  color: var(--text-primary);
  font-weight: 700;
}

.metric small {
  color: var(--text-secondary);
}

.rating {
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--surface) 90%, transparent));
}

.stars {
  color: #f59e0b;
  letter-spacing: 0.15em;
  font-size: 1.05rem;
}
</style>
