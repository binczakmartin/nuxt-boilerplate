<template>
  <section class="social" id="temoignages">
    <UContainer>
      <div class="section-heading">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <p class="lead">{{ description }}</p>
      </div>

      <div class="testimonials">
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="testimonial"
        >
          <div class="quote">“{{ testimonial.quote }}”</div>
          <div class="result">{{ testimonial.result }}</div>

          <div class="meta">
            <div class="avatar">{{ initials(testimonial.name) }}</div>
            <div>
              <p class="name">{{ testimonial.name }}</p>
              <p class="role">{{ testimonial.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type Testimonial = {
  quote: string
  result: string
  name: string
  role: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  testimonials: Testimonial[]
}>()

const initials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<style scoped>
.social {
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

.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.testimonial {
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  padding: 1.1rem 1.2rem;
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 12%, transparent), color-mix(in srgb, var(--surface) 92%, transparent));
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);
  display: grid;
  gap: 0.7rem;
}

.quote {
  font-size: 1.05rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.result {
  padding: 0.6rem 0.7rem;
  background: color-mix(in srgb, var(--state-success) 14%, transparent);
  border-radius: 0.9rem;
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-weight: 700;
  width: fit-content;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: var(--accent-contrast);
  font-weight: 800;
}

.name {
  margin: 0;
  color: var(--text-primary);
  font-weight: 700;
}

.role {
  margin: 0.05rem 0 0;
  color: var(--text-secondary);
}
</style>
