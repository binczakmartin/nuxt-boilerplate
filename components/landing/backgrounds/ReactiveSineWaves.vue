<template>
  <div class="reactive-waves-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="waves-canvas" />
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
type Wave = {
  amplitude: number     // Hauteur maximale de la vague
  frequency: number     // Nombre d'oscillations sur la largeur
  speed: number         // Vitesse de défilement horizontal
  offset: number        // Position de départ horizontale
  color: string         // Couleur de la vague
  pointCount: number    // Nombre de points par vague
}

type Ripple = {
  x: number
  y: number
  radius: number
  maxRadius: number
  speed: number
  opacity: number
  color: string
}

const config = {
  waveCount: 6,           // Nombre de vagues
  baseAmplitude: 50,      // Amplitude de base des vagues
  pointSize: 1.5,         // Taille des points de base
  rippleMaxRadius: 300,   // Rayon max d'une ondulation de souris
  rippleSpeed: 2,         // Vitesse de propagation des ondulations
  rippleInitialOpacity: 0.8, // Opacité de départ d'une ondulation
  interactionForce: 0.05, // Réactivité de la souris (pour les ondulations)
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

let waves: Wave[] = []
let ripples: Ripple[] = []
const mouse = { x: -1000, y: -1000, active: false }
let lastRippleTime = 0
const rippleDelay = 100 // ms entre deux ondulations générées par la souris

// --- COULEURS ---
const getWaveColor = (dark: boolean, index: number, alpha: number) => {
  // On utilise une palette plus variée pour les vagues
  const darkPalette = [
    `rgba(99, 102, 241, ${alpha})`, // Indigo
    `rgba(168, 85, 247, ${alpha})`, // Purple
    `rgba(236, 72, 153, ${alpha})`, // Pink
    `rgba(14, 165, 233, ${alpha})`, // Sky
    `rgba(16, 185, 129, ${alpha})`, // Emerald
    `rgba(250, 204, 21, ${alpha})`, // Amber
  ]
  const lightPalette = [
    `rgba(99, 102, 241, ${alpha * 0.7})`, // Soft Indigo
    `rgba(168, 85, 247, ${alpha * 0.7})`, // Soft Purple
    `rgba(236, 72, 153, ${alpha * 0.7})`, // Soft Pink
    `rgba(14, 165, 233, ${alpha * 0.7})`, // Soft Sky
    `rgba(16, 185, 129, ${alpha * 0.7})`, // Soft Emerald
    `rgba(250, 204, 21, ${alpha * 0.7})`, // Soft Amber
  ]
  return dark ? darkPalette[index % darkPalette.length] : lightPalette[index % lightPalette.length]
}

// --- SETUP ---
const setupWaves = () => {
  waves = []
  const maxAmplitude = config.baseAmplitude
  const maxFrequency = Math.PI / (width / 2) // Pour que ça oscille au moins une fois
  
  for (let i = 0; i < config.waveCount; i++) {
    const depthFactor = (i / (config.waveCount - 1)) // 0 pour la première vague, 1 pour la dernière
    
    waves.push({
      amplitude: maxAmplitude * (0.6 + depthFactor * 0.4), // Vagues plus petites devant, plus grandes derrière
      frequency: maxFrequency * (0.8 + depthFactor * 0.4), // Fréquence différente pour chaque vague
      speed: (0.5 + depthFactor * 0.5) * (i % 2 === 0 ? 1 : -1), // Certaines vagues vont à gauche, d'autres à droite
      offset: Math.random() * Math.PI * 2, // Décalage de phase aléatoire
      color: getWaveColor(isDark.value, i, isDark.value ? 0.4 : 0.3), // Opacité de base
      pointCount: Math.floor(width / (10 + Math.random() * 10)) // Plus ou moins de points
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
  
  setupWaves()
  ripples = [] // Réinitialise les ondulations
}

// --- ANIMATION ---
const draw = (currentTime: number) => {
  if (!ctx || mediaQuery?.matches) return

  ctx.clearRect(0, 0, width, height)
  
  // Mode de fusion pour les vagues (screen en dark pour la lumière)
  ctx.globalCompositeOperation = isDark.value ? 'screen' : 'source-over'

  // --- 1. Dessin des Vagues ---
  const centerY = height * 0.5 // Point central vertical de référence pour les vagues

  for (const wave of waves) {
    wave.offset += wave.speed * 0.005 // Fait défiler la vague

    for (let i = 0; i < wave.pointCount; i++) {
      const x = (i / (wave.pointCount - 1)) * width
      
      // Calcul de la position Y basée sur une fonction sinusoïdale
      let y = centerY + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude
      
      // Appliquer les ondulations (ripples)
      for (const ripple of ripples) {
        const dist = Math.sqrt(Math.pow(x - ripple.x, 2) + Math.pow(y - ripple.y, 2))
        if (dist < ripple.radius) {
          const effect = 1 - (dist / ripple.radius)
          y += Math.sin(effect * Math.PI) * ripple.opacity * (ripple.radius / config.rippleMaxRadius) * 50 // Effet de bosse/creux
        }
      }

      ctx.beginPath()
      ctx.fillStyle = wave.color
      ctx.arc(x, y, config.pointSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // --- 2. Mise à jour et Dessin des Ondulations (Ripples) ---
  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i]
    ripple.radius += ripple.speed
    ripple.opacity -= 0.01 // Diminution progressive de l'opacité

    if (ripple.opacity <= 0 || ripple.radius > ripple.maxRadius) {
      ripples.splice(i, 1) // Supprime l'ondulation si elle est trop transparente ou trop grande
    } else {
      // Dessin de l'ondulation visuelle (un cercle transparent qui s'étend)
      ctx.beginPath()
      ctx.strokeStyle = ripple.color.replace(/,(\s*\d+\.?\d*)\)$/, `,${ripple.opacity * 0.5})`) // Opacité du trait
      ctx.lineWidth = 1 + (ripple.radius / ripple.maxRadius) * 2
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  // --- 3. Génération d'ondulations par la souris ---
  if (mouse.active && currentTime - lastRippleTime > rippleDelay) {
    ripples.push({
      x: mouse.x,
      y: mouse.y,
      radius: 0,
      maxRadius: config.rippleMaxRadius,
      speed: config.rippleSpeed,
      opacity: config.rippleInitialOpacity,
      color: getWaveColor(isDark.value, Math.floor(Math.random() * waves.length), 1)
    })
    lastRippleTime = currentTime
  }
}

const tick = (currentTime: number) => {
  draw(currentTime)
  rafId = requestAnimationFrame(tick)
}

// --- EVENTS ---
const handlePointer = (e: PointerEvent) => {
  mouse.active = true
  mouse.x = e.clientX
  mouse.y = e.clientY
}
const handlePointerLeave = () => {
  mouse.active = false
  // On laisse les ondulations existantes disparaître
}

onMounted(() => {
  mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (mediaQuery.matches) return

  resize()
  window.addEventListener("resize", resize, { passive: true })
  window.addEventListener("pointermove", handlePointer, { passive: true })
  document.addEventListener("pointerleave", handlePointerLeave, { passive: true })

  watch(isDark, resize) // Recrée les vagues et réinitialise les ondulations au changement de thème

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
.reactive-waves-container {
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

.reactive-waves-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.waves-canvas {
  width: 100%;
  height: 100%;
  display: block;
  /* Un léger flou sur le canvas entier pour adoucir les points et créer un effet plus vaporeux */
  filter: blur(0.5px);
}

.is-dark .waves-canvas {
  /* Léger flou en dark mode */
  filter: blur(0.8px);
}
</style>