<template>
  <section class="final-cta" id="cta-final">
    <UContainer>
      <div class="cta-card">
        <div class="cta-copy">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h2>{{ title }}</h2>
          <p class="lead">{{ description }}</p>
          <ul>
            <li v-for="point in points" :key="point">
              <span>•</span>
              {{ point }}
            </li>
          </ul>
          <div class="cta-actions">
            <NuxtLink :to="cta.to" class="cta-link">
              <UiButton variant="primary">{{ cta.label }}</UiButton>
            </NuxtLink>
            <p class="cta-note">{{ note }}</p>
          </div>
        </div>
        <div class="cta-panel">
          <div class="panel-head">
            <p>Vous entrez, on s'occupe du reste</p>
            <span class="pulse" />
          </div>
          <div class="panel-body">
            <div class="panel-row">
              <span>Check</span>
              <p>Playbooks prêts à l'emploi</p>
            </div>
            <div class="panel-row">
              <span>Sync</span>
              <p>CRM connecté, score temps réel</p>
            </div>
            <div class="panel-row">
              <span>Ship</span>
              <p>Relances envoyées cette semaine</p>
              <strong>484</strong>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  points: string[]
  cta: {
    label: string
    to: string
  }
  note: string
}>()
</script>

<style scoped>
.final-cta {
  padding: clamp(2.5rem, 6vw, 4.5rem) 0 clamp(2rem, 5vw, 3.5rem);
}

.cta-card {
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  padding: clamp(1.5rem, 4vw, 2rem);
  background: radial-gradient(circle at 24% 20%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 40%), linear-gradient(150deg, color-mix(in srgb, var(--surface) 96%, transparent), color-mix(in srgb, var(--accent) 10%, transparent));
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.12);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  align-items: center;
}

.cta-copy h2 {
  margin: 0.3rem 0 0.4rem;
  font-family: 'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif;
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--text-helper);
  font-weight: 700;
  font-size: 0.82rem;
}

.lead {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0;
  display: grid;
  gap: 0.35rem;
  color: var(--text-primary);
  font-weight: 600;
}

li span {
  color: var(--accent-strong);
  margin-right: 0.35rem;
}

.cta-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.cta-link {
  text-decoration: none;
}

.cta-note {
  margin: 0;
  color: var(--text-secondary);
}

.cta-panel {
  border-radius: 1.25rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  box-shadow: var(--shadow-strong);
  padding: 1.1rem;
  display: grid;
  gap: 0.75rem;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-weight: 700;
}

.pulse {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--state-success);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--state-success) 40%, transparent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--state-success) 40%, transparent);
  }
  70% {
    box-shadow: 0 0 0 10px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

.panel-body {
  display: grid;
  gap: 0.65rem;
}

.panel-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid var(--border);
}

.panel-row span {
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  font-weight: 800;
  color: var(--text-primary);
}

.panel-row p {
  margin: 0;
  color: var(--text-primary);
}

.panel-row strong {
  color: var(--text-primary);
}
</style>
