<template>
  <div class="hex-hive-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="hive-canvas" />
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

// --- CONFIGURATION ---
const config = {
  hexSize: 35,           // Rayon d'un hexagone
  hexGap: 2,             // Espace entre les hexagones
  mouseRadius: 150,      // Rayon d'influence de la souris
  lightDecay: 0.05,      // Vitesse à laquelle la lumière s'éteint
  waveSpeed: 0.005,      // Vitesse de l'onde automatique
}

type Hexagon = {
  x: number
  y: number
  intensity: number      // 0 à 1 (Luminosité actuelle)
  targetIntensity: number
  scale: number          // 1 = taille normale
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

let hexagons: Hexagon[] = []
const mouse = { x: -1000, y: -1000 }
let time = 0

// --- COULEURS ---
const getColors = (dark: boolean) => {
  if (dark) {
    return {
      stroke: 'rgba(255, 255, 255, 0.03)', // Contour très discret
      fillActive: 'rgba(99, 102, 241,',    // Base Indigo pour le remplissage
      fillHighlight: 'rgba(14, 165, 233,'  // Cyan pour le highlight souris
    }
  } else {
    return {
      stroke: 'rgba(0, 0, 0, 0.03)',
      fillActive: 'rgba(99, 102, 241,',    // Indigo doux
      fillHighlight: 'rgba(168, 85, 247,'  // Violet doux
    }
  }
}

// --- GEOMETRIE HEXAGONALE ---
const drawHexagonPath = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    // Math.PI / 6 permet de tourner l'hexagone pour qu'il soit "pointu" vers le haut
    const px = x + size * Math.cos(angle - Math.PI / 6)
    const py = y + size * Math.sin(angle - Math.PI / 6)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
}

// --- SETUP ---
const setupGrid = () => {
  hexagons = []
  
  // Calculs de grille hexagonale (coordonnées axiales "pointy topped")
  // Distance horizontale entre les centres = size * sqrt(3)
  // Distance verticale entre les centres = size * 1.5
  const w = config.hexSize * Math.sqrt(3) + config.hexGap
  const h = config.hexSize * 1.5 + config.hexGap
  
  const cols = Math.ceil(width / w) + 2
  const rows = Math.ceil(height / h) + 2

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      // Décalage d'une ligne sur deux
      const xOffset = (row % 2) * (w / 2)
      const x = col * w + xOffset - w/2
      const y = row * h - h/2
      
      hexagons.push({
        x, y,
        intensity: 0,
        targetIntensity: 0,
        scale: 1
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

// --- ANIMATION ---
const draw = () => {
  if (!ctx || mediaQuery?.matches) return

  ctx.clearRect(0, 0, width, height)
  time += config.waveSpeed
  
  const colors = getColors(isDark.value)
  const dark = isDark.value
  
  // Pas de mode de fusion complexe pour garder la netteté des lignes
  ctx.globalCompositeOperation = 'source-over'

  for (const hex of hexagons) {
    // 1. Calcul de l'intensité
    
    // A. Onde automatique (Perlin-ish simple via sin/cos)
    // Crée des vagues diagonales douces
    const wave = (Math.sin(hex.x * 0.002 + hex.y * 0.003 + time) + 1) / 2
    // On ne garde que les crêtes de la vague pour que la majorité reste éteinte
    const autoIntensity = Math.pow(wave, 12) * 0.15 // 0.15 max opacité auto

    // B. Interaction Souris
    const dx = mouse.x - hex.x
    const dy = mouse.y - hex.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    let mouseIntensity = 0
    if (dist < config.mouseRadius) {
      mouseIntensity = (1 - dist / config.mouseRadius)
      // Effet de "clic" visuel : l'hexagone rétrécit si très proche
      hex.scale = 1 - (mouseIntensity * 0.15) 
    } else {
      hex.scale += (1 - hex.scale) * 0.1 // Retour fluide à l'échelle 1
    }

    // L'intensité cible est la somme de l'onde et de la souris
    hex.targetIntensity = Math.max(autoIntensity, mouseIntensity)
    
    // Lissage de l'intensité (Transition douce)
    hex.intensity += (hex.targetIntensity - hex.intensity) * 0.1

    // Optimisation : si l'hexagone est quasi invisible et sans contour fort, on le dessine juste en contour
    if (hex.intensity < 0.01) {
        ctx.strokeStyle = colors.stroke
        ctx.lineWidth = 1
        drawHexagonPath(ctx, hex.x, hex.y, config.hexSize)
        ctx.stroke()
        continue
    }

    // 2. Dessin
    const currentSize = config.hexSize * hex.scale
    drawHexagonPath(ctx, hex.x, hex.y, currentSize)

    // Remplissage dynamique
    if (hex.intensity > 0.01) {
      // Mélange de couleur : si c'est la souris (forte intensité), on utilise la couleur Highlight
      // Sinon la couleur Active standard
      const isHighlight = hex.intensity > 0.2
      const colorBase = isHighlight ? colors.fillHighlight : colors.fillActive
      
      // Opacité finale
      const alpha = dark ? hex.intensity * 0.6 : hex.intensity * 0.4
      ctx.fillStyle = `${colorBase} ${alpha})`
      ctx.fill()
      
      // En dark mode, on ajoute un petit "glow" sur les éléments actifs
      if (dark && isHighlight) {
         ctx.shadowBlur = 15
         ctx.shadowColor = colors.fillHighlight + '0.5)'
      }
    }

    // Contour
    ctx.strokeStyle = colors.stroke
    ctx.lineWidth = 1
    ctx.stroke()
    
    // Reset shadow
    ctx.shadowBlur = 0
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

  watch(isDark, resize)

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
.hex-hive-container {
  /* TOUJOURS FIXED */
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  
  /* Background du thème */
  background: var(--theme-page-gradient, linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
  transition: background 0.3s ease;
  overflow: hidden;
}

.hex-hive-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.hive-canvas {
  width: 100%;
  height: 100%;
  display: block;
  /* Netteté maximale, pas de flou ici, on veut du "Tech" précis */
}
</style>