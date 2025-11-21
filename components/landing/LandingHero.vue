<template>
  <section class="hero" id="hero">
    <UContainer>
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="hero-pill">
            <span class="dot" />
            {{ eyebrow }}
          </div>
          <h1 v-html="title" />
          <p class="hero-subtitle">
            {{ subtitle }}
          </p>
          <div class="hero-actions">
            <NuxtLink :to="cta.to" class="cta-link">
              <UiButton variant="primary">{{ cta.label }}</UiButton>
            </NuxtLink>
            <p class="cta-note">{{ note }}</p>
          </div>

          <div class="hero-highlights">
            <article v-for="item in highlights" :key="item.title" class="highlight">
              <span class="highlight-icon">{{ item.icon }}</span>
              <div>
                <p class="highlight-title">{{ item.title }}</p>
                <p class="highlight-detail">{{ item.detail }}</p>
              </div>
            </article>
          </div>

          <div class="hero-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat">
              <span class="stat-label">{{ stat.label }}</span>
              <strong class="stat-value">{{ stat.value }}</strong>
              <p class="stat-hint">{{ stat.hint }}</p>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <header class="visual-header">
            <div>
              <p>Playbook en cours</p>
              <strong>Relance deals ouverts</strong>
            </div>
            <span class="status-badge">Live</span>
          </header>

          <div class="visual-stream">
            <div v-for="stream in streams" :key="stream.title" class="stream-row">
              <div class="stream-meta">
                <span class="stream-dot" />
                <div>
                  <p class="stream-title">{{ stream.title }}</p>
                  <small>{{ stream.time }}</small>
                </div>
              </div>
              <span class="stream-status">{{ stream.status }}</span>
            </div>
          </div>

          <div class="visual-footer">
            <div class="visual-kpi">
              <p>{{ spotlight.metric }}</p>
              <strong>{{ spotlight.value }}</strong>
              <span class="trend">{{ spotlight.delta }}</span>
            </div>
            <div class="visual-card">
              <p>Priorités du jour</p>
              <ul>
                <li v-for="item in highlights" :key="item.title">
                  <span>{{ item.title }}</span>
                  <small>{{ item.detail }}</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
type HeroStat = {
  label: string
  value: string
  hint: string
}

type HeroHighlight = {
  title: string
  detail: string
  icon: string
}

type Stream = {
  title: string
  status: string
  time: string
}

type Spotlight = {
  metric: string
  value: string
  delta: string
}

defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  cta: { label: string; to: string }
  note: string
  highlights: HeroHighlight[]
  stats: HeroStat[]
  streams: Stream[]
  spotlight: Spotlight
}>()
</script>

<style scoped>
.hero {
  padding-top: 1.5rem;
  position: relative;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(2rem, 3vw, 3rem);
  align-items: center;
  position: relative;
}

.hero-copy h1 {
  font-family: 'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif;
  font-size: clamp(2.25rem, 4vw, 3.8rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin: 0.75rem 0 0.5rem;
  color: var(--text-primary);
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.02rem;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  color: var(--text-secondary);
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.12);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: radial-gradient(circle, var(--accent), var(--accent-strong));
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 70%, transparent);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.cta-link {
  text-decoration: none;
}

.cta-note {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.hero-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
  margin: 0 0 1.25rem;
}

.highlight {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  box-shadow: var(--shadow-soft);
}

.highlight-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border: 1px solid var(--border);
  font-size: 1.05rem;
}

.highlight-title {
  margin: 0;
  color: var(--text-primary);
  font-weight: 700;
}

.highlight-detail {
  margin: 0.15rem 0 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.9rem;
}

.stat {
  border: 1px solid var(--border);
  border-radius: 1.15rem;
  padding: 1.1rem 1.25rem;
  background: linear-gradient(145deg, color-mix(in srgb, var(--surface) 95%, transparent), color-mix(in srgb, var(--accent) 6%, transparent));
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}

.stat-label {
  display: block;
  color: var(--text-helper);
  font-size: 0.9rem;
  letter-spacing: 0.01em;
}

.stat-value {
  font-size: 1.6rem;
  color: var(--text-primary);
  margin: 0.35rem 0 0.2rem;
  display: block;
}

.stat-hint {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.4;
}

.hero-visual {
  border-radius: 1.6rem;
  border: 1px solid var(--border);
  background: radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 35%), linear-gradient(145deg, color-mix(in srgb, var(--surface) 96%, transparent), color-mix(in srgb, var(--accent) 8%, transparent));
  padding: 1.4rem;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(6px);
}

.visual-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
}

.visual-header strong {
  display: block;
  color: var(--text-primary);
  margin-top: 0.2rem;
  letter-spacing: -0.02em;
}

.status-badge {
  padding: 0.35rem 0.8rem;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  color: var(--text-primary);
  border-radius: 999px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
}

.visual-stream {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stream-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  padding: 0.65rem 0.85rem;
  border-radius: 0.95rem;
}

.stream-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.stream-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 50%, transparent);
}

.stream-title {
  margin: 0;
  color: var(--text-primary);
  font-weight: 700;
}

.stream-row small {
  color: var(--text-secondary);
}

.stream-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--state-success) 15%, transparent);
  color: var(--text-primary);
  font-weight: 600;
}

.visual-footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.visual-kpi {
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 0.95rem 1.05rem;
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 12%, transparent), color-mix(in srgb, var(--surface) 94%, transparent));
  color: var(--text-secondary);
}

.visual-kpi strong {
  display: block;
  font-size: 1.9rem;
  color: var(--text-primary);
  margin: 0.35rem 0 0.25rem;
}

.trend {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  background: color-mix(in srgb, var(--state-success) 18%, transparent);
  color: var(--text-primary);
  font-weight: 700;
}

.visual-card {
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 0.95rem 1.05rem;
  background: color-mix(in srgb, var(--surface) 96%, transparent);
}

.visual-card p {
  margin: 0 0 0.65rem;
  color: var(--text-primary);
  font-weight: 700;
}

.visual-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.65rem;
}

.visual-card li {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.55rem;
  border-radius: 0.85rem;
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

.visual-card span {
  color: var(--text-primary);
  font-weight: 600;
}

.visual-card small {
  color: var(--text-secondary);
}

@media (max-width: 960px) {
  .hero {
    padding-top: 2rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    order: -1;
  }
}
</style>
