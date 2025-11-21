<template>
  <section class="faq" id="faq">
    <UContainer>
      <div class="faq-grid">
        <div class="section-heading">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h2>{{ title }}</h2>
          <p class="lead">{{ description }}</p>
          <div class="note">{{ note }}</div>
        </div>

        <div class="faq-list">
          <details v-for="(faq, index) in faqs" :key="faq.question" :open="index === 0">
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type FAQ = {
  question: string
  answer: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  note: string
  faqs: FAQ[]
}>()
</script>

<style scoped>
.faq {
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
}

.faq-grid {
  display: grid;
  gap: 1.4rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: start;
}

.section-heading {
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
  font-size: clamp(1.9rem, 3vw, 2.4rem);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.lead {
  color: var(--text-secondary);
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
}

.note {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--accent) 9%, transparent);
  color: var(--text-primary);
  border: 1px solid var(--border);
  font-weight: 600;
}

.faq-list {
  display: grid;
  gap: 0.75rem;
}

details {
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  background: color-mix(in srgb, var(--surface) 96%, transparent);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

summary {
  cursor: pointer;
  font-weight: 700;
  color: var(--text-primary);
  outline: none;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

details[open] summary {
  margin-bottom: 0.5rem;
}

details p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.55;
}
</style>
