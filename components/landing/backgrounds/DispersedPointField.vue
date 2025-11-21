<template>
  <div class="point-field-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="field-canvas" />
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

// --- MATHS & NOISE ---
// Une implémentation simple de Simplex/Perlin noise 2D
const noise2D = (() => {
  const perm = new Uint8Array(512)
  const p = new Uint8Array(256).map((_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (t: number, a: number, b: number) => a + t * (b - a)
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 15; const u = h < 8 ? x : y; const v = h < 4 ? y : h === 12 || h === 14 ? x : 0
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }
  return (x: number, y: number) => {
    const X = Math.floor(x) & 255; const Y = Math.floor(y) & 255
    x -= Math.floor(x); y -= Math.floor(y)
    const u = fade(x); const v = fade(y)
    const A = perm[X] + Y; const B = perm[X + 1] + Y
    return lerp(v, lerp(u, grad(perm[A], x, y), grad(perm[B], x - 1, y)), lerp(u, grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1)))
  }
})()

// --- TYPES & CONFIG ---
type Particle = {
  x: number
  y: number
  baseSize: number
}

const config = {
  particleDensity: 0.00008, // Combien de particules par pixel carré (ajuster !)
  basePointSize: 0.8,     // Taille minimale d'un point
  maxPointSize: 3.5,      // Taille max lors de l'interaction
  mouseRadius: 200,       // Rayon d'influence de la souris
  noiseScale: 0.002,      // Zoom sur le bruit pour la "vague"
  noiseSpeed: 0.00005,    // Vitesse de défilement du bruit
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

let particles: Particle[] = []
const mouse = { x: -1000, y: -1000 } // Position de la souris, hors écran par défaut
let noiseTime = 0

// --- COULEURS ---
const getParticleColor = (dark: boolean, alpha: number) => {
  // Les particules sont légèrement teintées pour correspondre au thème
  // mais restent très proches du blanc/gris pour l'effet "étoile"
  if (dark) {
    return `rgba(200, 220, 255, ${alpha})` // Blanc-bleuté pour le dark mode
  } else {
    return `rgba(70, 80, 100, ${alpha})` // Gris-bleuté pour le light mode
  }
}

// --- SETUP ---
const setupParticles = () => {
  particles = []
  
  // Calculer le nombre de particules en fonction de la taille de l'écran et de la densité
  const numParticles = Math.floor(width * height * config.particleDensity)

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseSize: config.basePointSize * (0.8 + Math.random() * 0.4) // Variation de taille de base
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
  
  setupParticles()
}

// --- ANIMATION ---
const draw = () => {
  if (!ctx || mediaQuery?.matches) return

  ctx.clearRect(0, 0, width, height)
  
  noiseTime += config.noiseSpeed // Fait évoluer le bruit pour l'animation des zones de densité
  
  // Le mode de fusion 'lighter' permet aux lumières de s'additionner pour créer l'effet "halo"
  ctx.globalCompositeOperation = 'lighter'

  for (const p of particles) {
    // 1. Calcul de la densité basée sur le bruit
    // La valeur du bruit détermine l'opacité et la taille des points
    // Cela crée des "vagues" de points plus ou moins visibles
    const noiseVal = (noise2D(p.x * config.noiseScale, p.y * config.noiseScale + noiseTime) + 1) / 2
    // On met au carré pour rendre les contrastes plus marqués (plus de zones "vides")
    const opacity = Math.pow(noiseVal, 2) * (isDark.value ? 0.4 : 0.3) // Opacité globale ajustée
    
    if (opacity < 0.05) continue; // Ne pas dessiner les points presque invisibles (optimisation)

    let size = p.baseSize
    let interactionAlpha = 0 // Opacité d'interaction
    
    // 2. Interaction souris (Effet Spotlight)
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < config.mouseRadius) {
      const effect = 1 - (dist / config.mouseRadius) // 1 au centre, 0 au bord
      size = config.basePointSize + effect * (config.maxPointSize - config.basePointSize)
      interactionAlpha = effect * (isDark.value ? 0.8 : 0.6) // Plus lumineux près de la souris
    }

    // 3. Dessin du point
    ctx.beginPath()
    // La couleur finale combine l'opacité de base (bruit) et l'opacité d'interaction
    ctx.fillStyle = getParticleColor(isDark.value, Math.min(1, opacity + interactionAlpha))
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
    ctx.fill()
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
  // La souris est hors écran, on la "tue" pour que l'effet s'estompe
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

  watch(() => isDark.value, resize) // Recrée les particules pour adapter la couleur

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
.point-field-container {
  /* TOUJOURS FIXED : Pour le scroll infini */
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none; /* Laisse passer les clics */
  
  /* Background du thème */
  background: var(--theme-page-gradient, linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
  transition: background 0.3s ease; /* Transition douce lors du changement de thème */
  overflow: hidden; /* Empêche les scrollbars si les points dépassent légèrement */
}

.point-field-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.field-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.is-dark .field-canvas {
  /* Un très léger flou en dark mode pour un rendu plus atmosphérique */
  filter: blur(0.2px);
}
</style>