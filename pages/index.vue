<template>
  <div class="landing">
    <section class="hero">
      <UContainer>
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="hero-pill">
              <span class="hero-dot" />
              New Version Available
            </span>
            <h1>
              Lorem ipsum dolor sit<br>amet consectetur.
            </h1>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <div class="hero-actions">
              <NuxtLink to="/register">
                <UiButton variant="primary">Start for free</UiButton>
              </NuxtLink>
              <NuxtLink to="/login">
                <UiButton variant="ghost">Watch a demo</UiButton>
              </NuxtLink>
            </div>
            <div class="hero-stats">
              <article v-for="stat in stats" :key="stat.label" class="stat-box">
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
              </article>
            </div>
          </div>

          <div class="hero-panel">
            <div class="panel-card revenue">
              <header>
                <span>Current Metric</span>
                <p>$1.2M</p>
              </header>
              <div class="sparkline">
                <span v-for="n in 14" :key="n" :style="{ height: `${30 + (n % 5) * 12}%` }" />
              </div>
              <footer>
                <p class="positive">+12.4% this period</p>
                <span>Data updated recently</span>
              </footer>
            </div>
            <div class="panel-card tasks">
              <h3>Important Items</h3>
              <ul>
                <li v-for="task in heroTasks" :key="task.label">
                  <div>
                    <p>{{ task.label }}</p>
                    <small>{{ task.meta }}</small>
                  </div>
                  <span>{{ task.value }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="logo-row">
          <span v-for="logo in logos" :key="logo">{{ logo }}</span>
        </div>
      </UContainer>
    </section>

    <section class="feature-stack">
      <UContainer>
        <header class="section-heading">
          <p>Our Features</p>
          <h2>Lorem ipsum dolor sit amet consectetur adipiscing elit.</h2>
        </header>
        <div class="feature-grid">
          <article v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon" :style="{ '--clr': feature.color }">
              <span class="icon-placeholder">{{ feature.icon }}</span>
            </div>
            <div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
            <div class="feature-meta">
              <span v-for="chip in feature.chips" :key="chip">{{ chip }}</span>
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="workflow">
      <UContainer>
        <header class="section-heading">
          <p>How It Works</p>
          <h2>Simple process in three easy steps.</h2>
        </header>

        <div class="workflow-grid">
          <article v-for="(stage, idx) in workflow" :key="stage.title" class="workflow-card">
            <span class="badge">0{{ idx + 1 }}</span>
            <div class="workflow-body">
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.description }}</p>
              <ul>
                <li v-for="item in stage.points" :key="item">{{ item }}</li>
              </ul>
            </div>
          </article>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '1.2k', label: 'Users' },
  { value: '95%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' }
]

const heroTasks = [
  { label: 'Feature Update', meta: 'New improvements available', value: 'View' },
  { label: 'User Activity', meta: 'Recent interactions tracked', value: 'Details' },
  { label: 'System Status', meta: 'All systems operational', value: 'Check' }
]

const logos = ['Company A', 'Company B', 'Company C', 'Company D', 'Company E']

const features = [
  {
    title: 'First Feature',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    chips: ['Tag 1', 'Tag 2'],
    color: '#000000',
    icon: '🌐'
  },
  {
    title: 'Second Feature',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    chips: ['Tag 3', 'Tag 4'],
    color: '#6366f1',
    icon: '✨'
  },
  {
    title: 'Third Feature',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
    chips: ['Tag 5', 'Tag 6'],
    color: '#10b981',
    icon: '⚡'
  },
  {
    title: 'Fourth Feature',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    chips: ['Tag 7', 'Tag 8'],
    color: '#f59e0b',
    icon: '🔒'
  }
]

const workflow = [
  {
    title: 'Step One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.',
    points: ['Point alpha', 'Point beta', 'Point gamma']
  },
  {
    title: 'Step Two',
    description: 'Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
    points: ['Point delta', 'Point epsilon', 'Point zeta']
  },
  {
    title: 'Step Three',
    description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    points: ['Point eta', 'Point theta', 'Point iota']
  }
]
</script>

<style scoped>
.landing {
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vw, 5.5rem);
}

.hero {
  padding: clamp(2.5rem, 6vw, 4rem) 0;
}

.hero-grid {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  align-items: center;
}

.hero-copy h1 {
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin: 1rem 0;
  color: #f8fafc;
}

.hero-copy p {
  color: rgba(248, 250, 252, 0.72);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.6;
  max-width: 36rem;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.85rem;
  color: rgba(248, 250, 252, 0.85);
}

.hero-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.8);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1.5rem 0;
}

.hero-actions a {
  text-decoration: none;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.stat-box {
  padding: 1.1rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 15, 30, 0.55);
}

.stat-box strong {
  display: block;
  font-size: 1.7rem;
  color: #f8fafc;
}

.stat-box span {
  color: rgba(248, 250, 252, 0.6);
  font-size: 0.9rem;
}

.hero-panel {
  display: grid;
  gap: 1.25rem;
}

.panel-card {
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(7, 13, 26, 0.82);
  padding: 1.5rem;
  box-shadow: 0 30px 60px rgba(2, 6, 23, 0.55);
}

.panel-card.revenue header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: rgba(248, 250, 252, 0.6);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.panel-card.revenue header p {
  font-size: 2.2rem;
  color: #f8fafc;
  margin: 0;
}

.sparkline {
  display: flex;
  gap: 0.4rem;
  margin: 1.2rem 0;
  align-items: flex-end;
  height: 80px;
}

.sparkline span {
  flex: 1;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.9), rgba(34, 197, 94, 0.25));
}

.panel-card footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(248, 250, 252, 0.6);
  gap: 1rem;
  flex-wrap: wrap;
}

.panel-card footer p {
  margin: 0;
}

.positive {
  color: #22c55e !important;
  font-weight: 600;
}

.panel-card.tasks h3 {
  margin: 0 0 1rem;
  color: #f8fafc;
}

.panel-card.tasks ul {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.panel-card.tasks li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: rgba(248, 250, 252, 0.75);
  font-size: 0.95rem;
}

.panel-card.tasks li p {
  margin: 0 0 0.25rem;
}

.panel-card.tasks small {
  color: rgba(248, 250, 252, 0.55);
  font-size: 0.85rem;
}

.panel-card.tasks span {
  color: #22d3ee;
  white-space: nowrap;
  font-size: 0.85rem;
}

.logo-row {
  margin-top: clamp(2rem, 5vw, 3rem);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: center;
  color: rgba(248, 250, 252, 0.45);
  font-weight: 600;
  letter-spacing: 0.08em;
  font-size: 0.95rem;
}

.feature-stack {
  padding: clamp(2.5rem, 6vw, 4rem) 0;
}

.section-heading {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3rem;
}

.section-heading p {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: #22d3ee;
  font-size: 0.82rem;
  margin: 0 0 1rem;
}

.section-heading h2 {
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  color: #f8fafc;
  line-height: 1.2;
  margin: 0;
}

.feature-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}

.feature-card {
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(5, 11, 21, 0.85);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--clr), transparent 45%);
  border: 1px solid color-mix(in srgb, var(--clr), white 35%);
  font-size: 1.3rem;
}

.feature-card h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.25rem;
}

.feature-card p {
  margin: 0;
  color: rgba(248, 250, 252, 0.65);
  line-height: 1.5;
}

.feature-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-meta span {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.25rem 0.85rem;
  font-size: 0.82rem;
  color: rgba(248, 250, 252, 0.7);
}

.workflow {
  padding-bottom: clamp(3rem, 6vw, 4.5rem);
}

.workflow-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}

.workflow-card {
  padding: 1.4rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(7, 12, 24, 0.85);
  display: flex;
  gap: 1rem;
}

.workflow-card .badge {
  align-self: flex-start;
  border-radius: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.7rem;
  font-size: 0.85rem;
  color: rgba(248, 250, 252, 0.7);
  flex-shrink: 0;
}

.workflow-body h3 {
  margin: 0 0 0.5rem;
  color: #f8fafc;
}

.workflow-body p {
  margin: 0 0 0.75rem;
  color: rgba(248, 250, 252, 0.65);
  line-height: 1.5;
}

.workflow-body ul {
  list-style: disc;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  color: rgba(248, 250, 252, 0.6);
}

@media (max-width: 768px) {
  .hero-panel {
    order: -1;
  }

  .workflow-card {
    flex-direction: column;
  }
}
</style>
