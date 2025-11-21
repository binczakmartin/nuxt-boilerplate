<template>
  <div class="glitch-grid-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="glitch-canvas" />
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
type Line = {
  start: { x: number; y: number }
  end: { x: number; y: number }
  color: string
}

const config = {
  gridSpacing: 40,        // Espacement des lignes de la grille
  glitchMagnitude: 5,     // Amplitude max du "glitch" (déplacement des lignes)
  pointGlitchFactor: 0.8, // Probabilité qu'un point "glitch"
  mouseInfluenceRadius: 150, // Rayon d'influence de la souris
  mouseGlitchStrength: 0.7, // Intensité du glitch à la souris
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

const mouse = { x: -1000, y: -1000 }
let currentTime = 0

// --- COULEURS ---
const getGridColor = (dark: boolean, alpha: number) => {
  if (dark) {
    return `rgba(100, 100, 150, ${alpha})` // Gris bleuté très subtil
  } else {
    return `rgba(150, 150, 180, ${alpha})` // Gris plus clair
  }
}

// --- SETUP ---
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
}

// --- ANIMATION ---
const draw = () => {
  if (!ctx || mediaQuery?.matches) return

  ctx.clearRect(0, 0, width, height)
  currentTime += 0.01

  const dark = isDark.value
  
  // Opacité de base de la grille, très faible
  const baseAlpha = dark ? 0.08 : 0.05
  ctx.globalCompositeOperation = 'source-over' // Pas de mode de fusion particulier

  // --- Dessin des lignes horizontales ---
  for (let y = 0; y <= height; y += config.gridSpacing) {
    let currentAlpha = baseAlpha
    let glitchOffset = 0
    let lineWidth = 0.8 // Épaisseur de ligne de base

    // Calcul de l'influence de la souris
    const distY = Math.abs(mouse.y - y)
    if (distY < config.mouseInfluenceRadius) {
      const effect = 1 - (distY / config.mouseInfluenceRadius)
      currentAlpha = Math.min(0.5, baseAlpha + effect * (dark ? 0.4 : 0.3)) // La ligne s'illumine
      glitchOffset = effect * config.glitchMagnitude * config.mouseGlitchStrength * Math.sin(currentTime * 10) // Glitch plus fort
      lineWidth = 0.8 + effect * 0.7 // La ligne devient légèrement plus épaisse
    }

    // Glitch de fond aléatoire
    if (Math.random() < 0.01) { // Petite probabilité de glitcher
      glitchOffset += (Math.random() - 0.5) * config.glitchMagnitude
      currentAlpha = Math.min(0.5, currentAlpha + (dark ? 0.2 : 0.1))
    }

    ctx.beginPath()
    ctx.strokeStyle = getGridColor(dark, currentAlpha)
    ctx.lineWidth = lineWidth
    ctx.moveTo(0 + glitchOffset, y)
    ctx.lineTo(width + glitchOffset, y)
    ctx.stroke()
  }

  // --- Dessin des lignes verticales ---
  for (let x = 0; x <= width; x += config.gridSpacing) {
    let currentAlpha = baseAlpha
    let glitchOffset = 0
    let lineWidth = 0.8

    // Influence de la souris
    const distX = Math.abs(mouse.x - x)
    if (distX < config.mouseInfluenceRadius) {
      const effect = 1 - (distX / config.mouseInfluenceRadius)
      currentAlpha = Math.min(0.5, baseAlpha + effect * (dark ? 0.4 : 0.3))
      glitchOffset = effect * config.glitchMagnitude * config.mouseGlitchStrength * Math.cos(currentTime * 10) // Glitch plus fort
      lineWidth = 0.8 + effect * 0.7
    }

    // Glitch de fond aléatoire
    if (Math.random() < 0.01) {
      glitchOffset += (Math.random() - 0.5) * config.glitchMagnitude
      currentAlpha = Math.min(0.5, currentAlpha + (dark ? 0.2 : 0.1))
    }

    ctx.beginPath()
    ctx.strokeStyle = getGridColor(dark, currentAlpha)
    ctx.lineWidth = lineWidth
    ctx.moveTo(x, 0 + glitchOffset)
    ctx.lineTo(x, height + glitchOffset)
    ctx.stroke()
  }

  // --- Dessin des points d'intersection (optionnel, pour plus de détail) ---
  for (let y = 0; y <= height; y += config.gridSpacing) {
    for (let x = 0; x <= width; x += config.gridSpacing) {
      // Influence de la souris
      const dist = Math.sqrt(Math.pow(mouse.x - x, 2) + Math.pow(mouse.y - y, 2))
      let pointAlpha = baseAlpha * 2 // Points un peu plus visibles que les lignes
      let pointSize = 1.2

      if (dist < config.mouseInfluenceRadius) {
        const effect = 1 - (dist / config.mouseInfluenceRadius)
        pointAlpha = Math.min(0.8, baseAlpha * 2 + effect * (dark ? 0.6 : 0.4))
        pointSize = 1.2 + effect * 2.5 // Les points grossissent
      }

      // Glitch de fond des points
      if (Math.random() < config.pointGlitchFactor * 0.01) {
         pointAlpha = Math.min(0.8, pointAlpha + (dark ? 0.3 : 0.2));
         pointSize = 1.2 + Math.random() * 1.5;
      }


      ctx.beginPath()
      ctx.fillStyle = getGridColor(dark, pointAlpha)
      ctx.arc(x, y, pointSize / 2, 0, Math.PI * 2)
      ctx.fill()
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

  watch(isDark, resize) // Ne recrée pas les éléments mais ajuste les couleurs

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
.glitch-grid-container {
  /* TOUJOURS FIXED : Pour le scroll infini */
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none; /* Laisse passer les clics */
  
  /* Background du thème */
  background: var(--theme-page-gradient, linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
  transition: background 0.3s ease; /* Transition douce lors du changement de thème */
  overflow: hidden; /* Empêche les scrollbars */
}

.glitch-grid-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.glitch-canvas {
  width: 100%;
  height: 100%;
  display: block;
  /* Un très léger flou pour adoucir les lignes */
  filter: blur(0.2px);
  /* Une légère distortion pour l'effet "glitch" global, très subtil */
  transform: skewX(-0.5deg); 
}

.is-dark .glitch-canvas {
  filter: blur(0.3px);
  transform: skewX(0.5deg); /* Inverser le skew pour la variation */
}
</style>