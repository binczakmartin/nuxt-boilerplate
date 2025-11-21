<template>
  <div class="topo-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="topo-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// --- MOCK USE_THEME (À REMPLACER PAR LE VÔTRE) ---
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

// --- MATHS & NOISE (Pour des ondulations naturelles) ---
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

// --- CONFIG & STATE ---
let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null
let time = 0

const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }

// Paramètres des lignes
const config = {
  lineCount: 12, // Nombre de lignes horizontales
  segmentRes: 25, // Résolution horizontale (plus bas = plus anguleux)
  amplitude: 80, // Hauteur des vagues
  speed: 0.002,  // Vitesse d'ondulation
}

// --- COULEURS ---
type HSL = { h: number; s: number; l: number }
const hsla = ({ h, s, l }: HSL, a: number) => `hsla(${h}, ${s}%, ${l}%, ${a})`

const getThemePalette = (dark: boolean): HSL[] => {
  if (dark) {
    // Dark: Couleurs néon, lumineuses mais pas trop saturées pour ne pas agresser
    return [
      { h: 230, s: 85, l: 60 }, // Bleu/Indigo
      { h: 180, s: 80, l: 55 }, // Cyan
      { h: 270, s: 80, l: 60 }, // Violet
    ]
  } else {
    // Light: Couleurs type "encre", plus sombres et fines
    return [
      { h: 230, s: 60, l: 40 }, // Bleu encre
      { h: 190, s: 60, l: 35 }, // Teal encre
      { h: 260, s: 50, l: 45 }, // Violet encre
    ]
  }
}

// --- SETUP & RESIZE ---
const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.clientWidth
  height = canvas.clientHeight
  dpr = window.devicePixelRatio || 1

  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.scale(dpr, dpr)
  }
}

// --- DRAW LOOP ---
const draw = () => {
  if (!ctx || mediaQuery?.matches) return
  time += config.speed
  const dark = isDark.value
  const palette = getThemePalette(dark)

  ctx.clearRect(0, 0, width, height)

  // Lissage de la position de la souris pour l'interaction
  mouse.x += (mouse.targetX - mouse.x) * 0.05
  mouse.y += (mouse.targetY - mouse.y) * 0.05

  // Mode de fusion : 'screen' en dark pour que les lignes s'illuminent entre elles
  ctx.globalCompositeOperation = dark ? 'screen' : 'source-over'

  const lineGap = height / (config.lineCount + 1)

  for (let i = 0; i < config.lineCount; i++) {
    const baseY = lineGap * (i + 1)
    const color = palette[i % palette.length]

    // --- Dessin de la ligne ---
    ctx.beginPath()
    ctx.moveTo(0, baseY)

    for (let x = 0; x <= width; x += config.segmentRes) {
      // 1. Ondulation de base avec le bruit
      // On utilise 'i' pour que chaque ligne ait un motif de bruit différent
      const noiseVal = noise2D(x * 0.003, i * 0.5 + time)

      // 2. Interaction souris (repoussement)
      const dx = x - mouse.x
      const dy = baseY - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      // L'interaction est plus forte au centre et diminue avec la distance
      const interaction = Math.max(0, 1 - dist / (width * 0.25))
      // La direction de la poussée dépend de si la souris est au-dessus ou en dessous de la ligne
      const pushDir = dy > 0 ? 1 : -1

      const y = baseY + noiseVal * config.amplitude + (interaction * pushDir * 40)

      ctx.lineTo(x, y)
    }

    // --- Style de la ligne ---
    if (dark) {
      // Dark mode : Ligne fine et brillante avec un léger "glow"
      ctx.strokeStyle = hsla(color, 0.5)
      ctx.lineWidth = 1.5
      ctx.shadowColor = hsla(color, 1)
      ctx.shadowBlur = 10
    } else {
      // Light mode : Ligne très fine, style dessin technique
      ctx.strokeStyle = hsla(color, 0.15)
      ctx.lineWidth = 1
      ctx.shadowBlur = 0
    }
    ctx.stroke()

    // --- Optionnel : Remplissage sous la ligne pour plus de profondeur ---
    // Cela crée un effet de "couches" superposées
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    // Remplissage dégradé très subtil
    const gradient = ctx.createLinearGradient(0, baseY, 0, height)
    gradient.addColorStop(0, hsla(color, dark ? 0.05 : 0.02))
    gradient.addColorStop(1, hsla(color, 0))
    ctx.fillStyle = gradient
    // On enlève le shadow pour le remplissage sinon c'est trop lourd
    ctx.shadowBlur = 0
    ctx.fill()
  }
}

const tick = () => {
  draw()
  rafId = requestAnimationFrame(tick)
}

// --- EVENTS ---
const handlePointer = (e: PointerEvent) => {
  mouse.targetX = e.clientX
  mouse.targetY = e.clientY
}
const handlePointerLeave = () => {
  // On sort la cible de l'écran pour que l'effet disparaisse doucement
  mouse.targetX = -1000
  mouse.targetY = -1000
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
.topo-container {
  /* C'EST ICI : On utilise 'fixed' pour que l'animation couvre tout l'écran
     et reste en place pendant le scroll. */
  position: fixed;
  inset: 0;
  z-index: -1; /* Derrière le contenu */
  pointer-events: none; /* Laisse passer les clics */

  /* Le gradient de fond de votre thème */
  background: var(--theme-page-gradient, linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
  transition: background 0.3s ease;
}

.topo-container.is-dark {
  background: var(--theme-page-gradient, linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.topo-canvas {
  width: 100%;
  height: 100%;
  display: block;
  /* Un léger flou pour rendre le tout plus onirique, surtout en dark mode */
  filter: blur(0.5px);
}

.is-dark .topo-canvas {
   /* En dark mode, on peut augmenter un peu le contraste pour faire ressortir les lignes */
   filter: blur(0.5px) contrast(110%);
}
</style>