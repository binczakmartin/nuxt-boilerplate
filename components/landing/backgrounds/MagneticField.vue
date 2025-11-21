<template>
  <div class="magnetic-grid-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="grid-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// --- MOCK USE_THEME (À REMPLACER) ---
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
// ------------------------------------

const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- CONFIGURATION ---
const config = {
  spacing: 35,        // Espace entre les points (plus petit = plus dense)
  mouseRadius: 200,   // Rayon d'influence de la souris
  pointSize: 1.5,     // Taille de base des points
  friction: 0.9,      // Ralentissement du retour à l'origine (0.9 = fluide)
  ease: 0.1,          // Force d'attraction
}

type Point = {
  x: number       // Position actuelle
  y: number
  originX: number // Position grille fixe
  originY: number
  vx: number      // Vitesse
  vy: number
  size: number    // Taille dynamique
  color: string
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

let points: Point[] = []
const mouse = { x: -1000, y: -1000 }
let tickCount = 0

// --- SETUP ---
const setupGrid = () => {
  points = []
  
  // On crée une grille qui dépasse un peu de l'écran pour éviter les bords vides
  const cols = Math.ceil(width / config.spacing) + 2
  const rows = Math.ceil(height / config.spacing) + 2
  
  const offsetX = (width - (cols - 1) * config.spacing) / 2
  const offsetY = (height - (rows - 1) * config.spacing) / 2

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = offsetX + i * config.spacing
      const y = offsetY + j * config.spacing
      
      points.push({
        x, y,
        originX: x, originY: y,
        vx: 0, vy: 0,
        size: config.pointSize,
        // On assignera la couleur au moment du draw pour gérer le thème dynamiquement
        color: '' 
      })
    }
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

  setupGrid()
}

// --- DRAW ---
const draw = () => {
  if (!ctx || mediaQuery?.matches) return
  
  // Clear transparent pour garder le fond CSS
  ctx.clearRect(0, 0, width, height)
  
  tickCount += 0.02
  const dark = isDark.value
  
  // Couleur des points selon le thème (très subtil pour la lisibilité)
  // Dark: Blanc/Bleuté faible | Light: Gris/Bleuté faible
  const baseColor = dark ? 'rgba(200, 220, 255,' : 'rgba(50, 70, 100,' 

  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    
    // 1. Calcul de la distance souris
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    // 2. Interaction Magnétique
    let targetX = p.originX
    let targetY = p.originY
    let alpha = dark ? 0.15 : 0.1 // Opacité de base très faible
    let scale = 1

    if (dist < config.mouseRadius) {
      // Calcul de la force d'attraction/répulsion
      // Plus on est proche, plus l'angle est fort
      const angle = Math.atan2(dy, dx)
      const force = (config.mouseRadius - dist) / config.mouseRadius
      
      // Les points fuient la souris (effet coussin)
      // Changez le signe '-' en '+' pour qu'ils soient attirés
      const push = force * 40 
      
      targetX -= Math.cos(angle) * push
      targetY -= Math.sin(angle) * push
      
      // Highlight: Les points proches de la souris brillent plus et grossissent
      alpha = dark ? 0.6 : 0.4
      scale = 1.8
    } else {
      // Mouvement "Idle" : petite respiration organique quand la souris est loin
      // Utilisation de sin/cos basés sur la position pour créer une vague
      targetX += Math.sin(tickCount + p.originY * 0.05) * 2
      targetY += Math.cos(tickCount + p.originX * 0.05) * 2
    }

    // 3. Physique (Elasticité)
    // On déplace le point actuel vers sa cible (targetX/Y) avec de l'élasticité
    p.vx += (targetX - p.x) * config.ease
    p.vy += (targetY - p.y) * config.ease
    p.vx *= config.friction
    p.vy *= config.friction
    p.x += p.vx
    p.y += p.vy

    // 4. Dessin du point
    ctx.beginPath()
    ctx.fillStyle = `${baseColor}${alpha})`
    ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2)
    ctx.fill()
    
    // Optionnel : Dessiner des connexions très fines si très proche de la souris (High-tech effect)
    if (dist < 60) {
       ctx.beginPath()
       ctx.strokeStyle = `${baseColor}${alpha * 0.5})`
       ctx.lineWidth = 0.5
       ctx.moveTo(p.x, p.y)
       ctx.lineTo(mouse.x, mouse.y)
       ctx.stroke()
    }
  }
}

const tick = () => {
  draw()
  rafId = requestAnimationFrame(tick)
}

// --- EVENTS ---
const handlePointer = (e: PointerEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}
const handlePointerLeave = () => {
  mouse.x = -1000
  mouse.y = -1000
}

onMounted(() => {
  mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (mediaQuery.matches) return

  resize()
  window.addEventListener("resize", resize, { passive: true })
  window.addEventListener("pointermove", handlePointer, { passive: true })
  document.addEventListener("pointerleave", handlePointerLeave, { passive: true })

  watch(() => isDark.value, resize)

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
.magnetic-grid-container {
  /* IMPORTANT : Fixe pour couvrir tout le scroll */
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  
  /* Background du thème */
  background: var(--theme-page-gradient, linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
  transition: background 0.3s ease;
}

.magnetic-grid-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.grid-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>