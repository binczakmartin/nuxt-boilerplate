<template>
  <div class="gradient-orbs-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="orbs-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// --- MOCK USE_THEME ---
const useTheme = () => {
  const isDark = ref(false)
  const updateTheme = () => {
    isDark.value = document.documentElement.classList.contains('dark')
  }
  onMounted(() => {
    updateTheme()
    const obs = new MutationObserver(updateTheme)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  })
  return { isDark }
}
const { isDark } = useTheme()
// ---------------------

const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- TYPES & CONFIG ---
type Orb = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  targetRadius: number
}

// Config simple
const config = {
  orbCount: 6,         // Peu d'orbes pour garder c'est aéré
  baseSpeed: 0.5,      // Vitesse de flottement
  mouseFactor: 0.02,   // Force d'attraction de la souris
  friction: 0.98,      // Inertie du mouvement
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

let orbs: Orb[] = []
const mouse = { x: -1000, y: -1000 }
let hasMouse = false

// --- COULEURS ---
const getThemePalette = (dark: boolean) => {
  if (dark) {
    // Dark: Couleurs profondes et saturées qui ressortiront bien sur le fond sombre
    return [
      'rgba(99, 102, 241, 0.4)',  // Indigo
      'rgba(168, 85, 247, 0.4)',  // Purple
      'rgba(236, 72, 153, 0.4)',  // Pink
      'rgba(14, 165, 233, 0.4)',  // Sky
      'rgba(16, 185, 129, 0.4)',  // Emerald
    ]
  } else {
    // Light: Couleurs pastel douces
    return [
      'rgba(199, 210, 254, 0.6)', // Soft Indigo
      'rgba(233, 213, 255, 0.6)', // Soft Purple
      'rgba(251, 207, 232, 0.6)', // Soft Pink
      'rgba(186, 230, 253, 0.6)', // Soft Sky
      'rgba(167, 243, 208, 0.6)', // Soft Emerald
    ]
  }
}

// --- SETUP ---
const setupOrbs = () => {
  orbs = []
  const palette = getThemePalette(isDark.value)
  
  for (let i = 0; i < config.orbCount; i++) {
    const radius = Math.min(width, height) * (0.2 + Math.random() * 0.25)
    orbs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.baseSpeed,
      vy: (Math.random() - 0.5) * config.baseSpeed,
      radius: radius,
      targetRadius: radius,
      color: palette[i % palette.length]
    })
  }
}

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.clientWidth
  height = canvas.clientHeight
  dpr = window.devicePixelRatio || 1

  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx = canvas.getContext("2d")
  if (ctx) ctx.scale(dpr, dpr)
  
  setupOrbs()
}

// --- ANIMATION ---
const draw = () => {
  if (!ctx || mediaQuery?.matches) return

  // Nettoyage transparent pour garder le fond CSS
  ctx.clearRect(0, 0, width, height)
  
  // Mode de fusion pour mélanger les couleurs joliment
  // En Dark mode, 'screen' permet aux couleurs de s'additionner en lumière
  // En Light mode, 'multiply' donnerait un effet sale, donc on garde 'source-over' ou 'overlay'
  ctx.globalCompositeOperation = isDark.value ? 'screen' : 'source-over'

  for (const orb of orbs) {
    // 1. Physique & Mouvement
    // Si la souris est là, on est attiré vers elle
    if (hasMouse) {
      const dx = mouse.x - orb.x
      const dy = mouse.y - orb.y
      // Attraction très douce
      orb.vx += dx * config.mouseFactor * 0.005
      orb.vy += dy * config.mouseFactor * 0.005
      
      // Les orbes grossissent légèrement près de la souris
      orb.targetRadius = orb.radius * 1.2
    } else {
      // Retour à la taille normale
      orb.targetRadius = orb.radius 
      
      // Petit mouvement brownien (aléatoire) pour ne jamais être statique
      orb.vx += (Math.random() - 0.5) * 0.02
      orb.vy += (Math.random() - 0.5) * 0.02
    }

    // Friction pour éviter que ça accélère à l'infini
    orb.vx *= config.friction
    orb.vy *= config.friction
    
    orb.x += orb.vx
    orb.y += orb.vy

    // Rebond sur les murs (soft bounce)
    if (orb.x < -orb.radius) orb.x = width + orb.radius
    if (orb.x > width + orb.radius) orb.x = -orb.radius
    if (orb.y < -orb.radius) orb.y = height + orb.radius
    if (orb.y > height + orb.radius) orb.y = -orb.radius

    // 2. Dessin
    ctx.beginPath()
    
    // Le dégradé radial à l'intérieur de l'orbe pour adoucir encore plus
    // Cela crée un "coeur" coloré et des bords transparents
    const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 0.8)
    gradient.addColorStop(0, orb.color) // Couleur au centre
    gradient.addColorStop(1, 'rgba(0,0,0,0)') // Transparent au bord
    
    ctx.fillStyle = gradient
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

const tick = () => {
  draw()
  rafId = requestAnimationFrame(tick)
}

// --- EVENTS ---
const handlePointer = (e: PointerEvent) => {
  hasMouse = true
  mouse.x = e.clientX
  mouse.y = e.clientY
}
const handlePointerLeave = () => {
  hasMouse = false
}

onMounted(() => {
  mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (mediaQuery.matches) return

  resize()
  window.addEventListener("resize", resize, { passive: true })
  window.addEventListener("pointermove", handlePointer, { passive: true })
  document.addEventListener("pointerleave", handlePointerLeave, { passive: true })

  watch(() => isDark.value, setupOrbs)

  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener("resize", resize)
  window.removeEventListener("pointermove", handlePointer)
  document.removeEventListener("pointerleave", handlePointerLeave)
})
</script>

<style scoped>
.gradient-orbs-container {
  /* TOUJOURS FIXED : Pour le scroll infini */
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  
  /* Background du thème */
  background: var(--theme-page-gradient, linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
  transition: background 0.3s ease;
  overflow: hidden; /* Important pour ne pas avoir de scrollbar si un orbe dépasse */
}

.gradient-orbs-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.orbs-canvas {
  width: 100%;
  height: 100%;
  display: block;
  
  /* LE SECRET EST ICI : Un flou CSS énorme */
  /* Cela transforme les cercles simples en nuages de couleurs fusionnés */
  filter: blur(80px);
  opacity: 0.8; 
  transform: scale(1.2); /* Zoom léger pour éviter les bords flous nets sur les côtés */
}

.is-dark .orbs-canvas {
  /* En dark, on baisse un peu l'opacité pour garantir la lisibilité du texte */
  /* opacity: 0.6;
  filter: blur(90px) saturate(140%);  */
}
</style>