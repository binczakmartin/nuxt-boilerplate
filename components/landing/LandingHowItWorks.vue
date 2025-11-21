<template>
  <section class="how" id="how-it-works">
    <UContainer>
      <div class="section-heading">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <p class="lead">{{ description }}</p>
      </div>

      <div class="steps">
        <article v-for="(step, index) in steps" :key="step.title" class="step-card">
          <div class="step-number">0{{ index + 1 }}</div>
          <div class="step-body">
            <p class="step-tag">{{ step.tag }}</p>
            <h3>{{ step.title }}</h3>
            <p class="step-text">{{ step.text }}</p>
            <ul>
              <li v-for="point in step.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Step = {
  tag: string
  title: string
  text: string
  points: string[]
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  steps: Step[]
}>()
</script>

<style scoped>
.how {
  padding: clamp(2.5rem, 6vw, 4rem) 0;
}

.section-heading {
  text-align: center;
  max-width: 780px;
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

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.step-card {
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  background: linear-gradient(135deg, color-mix(in srgb, var(--surface) 94%, transparent), color-mix(in srgb, var(--accent) 10%, transparent));
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  font-weight: 800;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.step-body h3 {
  margin: 0.1rem 0 0.25rem;
  color: var(--text-primary);
}

.step-text {
  margin: 0 0 0.5rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.step-tag {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-helper);
  font-size: 0.8rem;
  font-weight: 700;
}

ul {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text-secondary);
  display: grid;
  gap: 0.35rem;
}
</style>
