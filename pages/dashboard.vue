<template>
  <div class="dashboard-shell">
    <UContainer>
      <section class="overview">
        <div class="overview-copy">
          <p class="eyebrow">Command center</p>
          <h1>Welcome back 👋</h1>
          <p>Here’s your live product + revenue pulse. Everything is responsive, so the cockpit keeps pace across devices.</p>
          <ul>
            <li v-for="point in highlights" :key="point">{{ point }}</li>
          </ul>
          <div class="chip-grid">
            <div v-for="chip in chips" :key="chip.label" class="chip">
              <p>{{ chip.label }}</p>
              <strong>{{ chip.value }}</strong>
            </div>
          </div>
          <div class="welcome-actions">
            <NuxtLink to="/dashboard/settings" class="ghost">View settings</NuxtLink>
            <NuxtLink to="/dashboard/analytics/reports" class="solid">View reports</NuxtLink>
          </div>
        </div>
        <div class="overview-panels">
          <div class="trend-card">
            <header>
              <div>
                <p>ARR trend</p>
                <strong>$2.4M</strong>
              </div>
              <span class="positive">+18.4%</span>
            </header>
            <div class="trend-graph">
              <span v-for="(point, idx) in trendPoints" :key="idx" :style="{ height: `${point}%` }" />
            </div>
            <footer>
              <p>Forecast locked • Next review Friday</p>
            </footer>
          </div>
          <div class="priority-card">
            <header>
              <h3>Priority queue</h3>
              <UButton size="xs" variant="soft">View all</UButton>
            </header>
            <ul>
              <li v-for="task in priorityTasks" :key="task.title">
                <div>
                  <p>{{ task.title }}</p>
                  <small>{{ task.detail }}</small>
                </div>
                <span>{{ task.action }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="stat-grid">
        <article v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-card__icon" :style="{ '--clr': stat.color }">
            <UIcon :name="stat.icon" class="h-5 w-5" />
          </div>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-value">{{ stat.value }}</p>
          <p class="stat-change" :class="{ positive: stat.change?.startsWith('+') }">{{ stat.change }}</p>
        </article>
      </section>

      <section class="insights-grid">
        <UCard class="panel panel--playbooks">
          <template #header>
            <div class="panel-heading">
              <div>
                <p class="eyebrow">Automation health</p>
                <h3>Active playbooks</h3>
              </div>
              <UButton size="xs" variant="soft">Share</UButton>
            </div>
          </template>
          <div class="playbook-list">
            <article v-for="book in playbooks" :key="book.name">
              <div>
                <h4>{{ book.name }}</h4>
                <p>{{ book.description }}</p>
              </div>
              <span :class="{ online: book.status === 'Running' }">{{ book.status }}</span>
            </article>
          </div>
        </UCard>

        <UCard class="panel panel--activity">
          <template #header>
            <div class="panel-heading">
              <div>
                <p class="eyebrow">Activity</p>
                <h3>Recent timeline</h3>
              </div>
            </div>
          </template>
          <div class="activity-list">
            <article v-for="activity in activities" :key="activity.title">
              <div class="activity-icon" :class="activity.intent" />
              <div>
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.copy }}</p>
              </div>
              <time>{{ activity.time }}</time>
            </article>
          </div>
        </UCard>

        <UCard class="panel panel--integrations">
          <template #header>
            <div class="panel-heading">
              <div>
                <p class="eyebrow">Integrations</p>
                <h3>Live data sources</h3>
              </div>
            </div>
          </template>
          <div class="integration-grid">
            <article v-for="integration in integrations" :key="integration.name">
              <div class="dot" :style="{ background: integration.color }" />
              <div>
                <p>{{ integration.name }}</p>
                <small>{{ integration.status }}</small>
              </div>
              <span>{{ integration.sync }}</span>
            </article>
          </div>
        </UCard>
      </section>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const { user } = useAuth()

const highlights = ['Usage anomalies flagged automatically', 'AI updates pipeline notes in Slack', 'Experiments tracked across devices']

const chips = [
  { label: 'ARR', value: '$2.4M' },
  { label: 'NRR', value: '129%' },
  { label: 'Experiments', value: '8 live' }
]

const stats = [
  { label: 'Pipeline influenced', value: '$480k', change: '+12.4%', icon: 'i-heroicons-chart-bar', color: '#22c55e' },
  { label: 'Risk accounts', value: '32', change: '-5 this week', icon: 'i-heroicons-exclamation-triangle', color: '#f97316' },
  { label: 'Journeys live', value: '14', change: '+3 launched', icon: 'i-heroicons-bolt', color: '#38bdf8' },
  { label: 'Signals processed', value: '1.3M', change: 'Realtime', icon: 'i-heroicons-sparkles', color: '#a855f7' }
]

const trendPoints = [45, 62, 58, 70, 64, 76, 82, 75, 88, 80, 92, 86]

const priorityTasks = [
  { title: 'Enterprise renewal', detail: 'Acme Inc. up for renewal in 6 days', action: 'Open room' },
  { title: 'Usage spike', detail: 'Orbit analytics ↑ 42% week over week', action: 'Alert reps' },
  { title: 'Dormant segment', detail: '12 workspaces inactive for 30 days', action: 'Review copy' }
]

const playbooks = [
  { name: 'Expansion radar', description: 'Flags customers with >20% usage spike', status: 'Running' },
  { name: 'Renewal autopilot', description: 'Orchestrates 90-day success plan', status: 'Running' },
  { name: 'Dormant win-back', description: 'AI writes outreach for inactive teams', status: 'Paused' }
]

const activities = [
  { title: 'Workspace created', copy: 'Your account was successfully provisioned', time: '2m ago', intent: 'success' },
  { title: 'Segment synced', copy: 'Product metrics from Snowflake refreshed', time: '18m ago', intent: 'info' },
  { title: 'Playbook shipped', copy: 'Expansion radar pushed to Salesforce', time: '1h ago', intent: 'primary' }
]

const integrations = [
  { name: 'Stripe', status: 'Billing + invoices', sync: '2m ago', color: '#22d3ee' },
  { name: 'Snowflake', status: 'Product warehouse', sync: '5m ago', color: '#38bdf8' },
  { name: 'HubSpot', status: 'CRM & deals', sync: '12m ago', color: '#f97316' }
]
</script>

<style scoped>
.dashboard-shell {
  min-height: 100vh;
  padding: 0 0 clamp(2.5rem, 6vw, 5rem);
}

.overview {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 2rem;
  padding: clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-strong);
}

.overview-copy h1 {
  font-size: clamp(2rem, 3vw, 2.9rem);
  color: var(--text-primary);
  margin: 0.5rem 0 1rem;
}

.overview-copy p {
  color: var(--text-secondary);
}

.overview-copy ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.overview-copy li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-secondary);
}

.overview-copy li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--state-success) 100%);
  box-shadow: 0 0 10px color-mix(in srgb, var(--state-success) 50%, transparent);
}

.welcome-actions {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.ghost,
.solid {
  border-radius: 999px;
  padding: 0.7rem 1.4rem;
  text-decoration: none;
  font-weight: 500;
}

.ghost {
  border: 1px solid var(--border);
  color: var(--text-secondary);
  background: transparent;
}

.ghost:hover {
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-primary);
}

.solid {
  background: linear-gradient(135deg, var(--accent) 0%, var(--state-success) 100%);
  color: var(--accent-contrast);
  box-shadow: var(--shadow-soft);
}

.chip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.chip {
  border-radius: 1.25rem;
  border: 1px solid var(--border);
  padding: 1rem;
  background: var(--surface-muted);
}

.chip strong {
  display: block;
  margin-top: 0.35rem;
  font-size: 1.35rem;
  color: var(--text-primary);
}

.eyebrow {
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--accent-strong);
  font-size: 0.78rem;
}

.overview-panels {
  display: grid;
  gap: 1rem;
}

.trend-card,
.priority-card {
  border-radius: 1.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
}

.trend-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
}

.trend-card header strong {
  font-size: 2.1rem;
  color: var(--text-primary);
}

.trend-graph {
  display: flex;
  gap: 0.35rem;
  align-items: flex-end;
  margin: 1.1rem 0;
}

.trend-graph span {
  flex: 1;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent) 70%, transparent),
    color-mix(in srgb, var(--state-success) 40%, transparent)
  );
}

.trend-card footer {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.priority-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.priority-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.priority-card li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-secondary);
}

.priority-card small {
  color: var(--text-helper);
}

.priority-card span {
  color: var(--accent-strong);
  font-weight: 500;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
}

.stat-card__icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--clr), transparent 40%);
  display: grid;
  place-items: center;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.8rem;
  color: var(--text-primary);
}

.stat-label,
.stat-change {
  color: var(--text-secondary);
}

.stat-change.positive {
  color: var(--state-success);
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.panel {
  border-radius: 1.75rem;
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
}

.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-secondary);
}

.playbook-list article,
.activity-list article,
.integration-grid article {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}

.playbook-list article:last-child,
.activity-list article:last-child,
.integration-grid article:last-child {
  border-bottom: none;
}

.playbook-list h4,
.activity-list h4 {
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.playbook-list p,
.activity-list p,
.integration-grid small {
  color: var(--text-secondary);
}

.playbook-list span {
  color: var(--text-secondary);
}

.playbook-list span.online {
  color: var(--state-success);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
}

.activity-icon.success {
  background: color-mix(in srgb, var(--state-success) 25%, transparent);
}

.activity-icon.info {
  background: color-mix(in srgb, var(--state-info) 25%, transparent);
}

.activity-icon.primary {
  background: color-mix(in srgb, var(--accent) 25%, transparent);
}

time {
  color: var(--text-helper);
}

.integration-grid article .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .playbook-list article,
  .activity-list article,
  .integration-grid article {
    grid-template-columns: 1fr;
  }

  .overview {
    border-radius: 1.25rem;
  }
}
</style>
