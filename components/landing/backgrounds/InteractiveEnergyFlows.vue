<template>
  <div class="energy-flow-container" :class="{ 'is-dark': isDark }">
    <canvas ref="canvasRef" class="flow-canvas" />
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
type Point = { x: number; y: number }
type HSL = { h: number; s: number; l: number }
type Ribbon = {
  path: Point[]
  color: HSL
  speed: number
  thickness: number
  phase: number
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0, height = 0, dpr = 1
let rafId: number | null = null
let mediaQuery: MediaQueryList | null = null

let ribbons: Ribbon[] = []
let palette: HSL[] = []

const target: Point = { x: 0, y: 0 }
const mouse: Point = { x: 0, y: 0 }
let hasMouse = false
let idleTimer = 0

// --- UTILS ---
const hsla = ({ h, s, l }: HSL, a: number) => `hsla(${h}, ${s}%, ${l}%, ${a})`
const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end

// --- COULEURS ---
const getThemeColors = (dark: boolean): HSL[] => {
  if (dark) {
    // Dark Mode : On baisse la luminosité (l) et on garde la saturation (s)
    // pour avoir de la couleur sans éblouir le texte blanc.
    return [
      { h: 236, s: 70, l: 45 }, // Indigo profond
      { h: 190, s: 80, l: 40 }, // Cyan profond
      { h: 280, s: 65, l: 45 }, // Violet sombre
      { h: 160, s: 70, l: 40 }, // Émeraude sombre
    ]
  } else {
    // Light Mode : Couleurs très douces
    return [
      { h: 236, s: 70, l: 60 },
      { h: 199, s: 75, l: 55 },
      { h: 280, s: 60, l: 60 },
      { h: 35,  s: 80, l: 60 },
    ]
  }
}

// --- SETUP ---
const setupRibbons = () => {
  palette = getThemeColors(isDark.value)
  ribbons = []

  // Nombre de rubans
  const count = width < 768 ? 3 : 5
  // Longueur plus importante pour des courbes plus gracieuses
  const pathLength = width < 768 ? 30 : 50

  for (let i = 0; i < count; i++) {
    const path: Point[] = []
    for (let j = 0; j < pathLength; j++) {
      path.push({ x: width / 2, y: height / 2 + j * 5 })
    }

    ribbons.push({
      path,
      color: palette[i % palette.length],
      speed: 0.04 + i * 0.01, // Vitesse un peu plus lente pour le calme
      thickness: isDark.value ? (20 + i * 4) : (25 + i * 3),
      phase: Math.random() * Math.PI * 2
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
  if (ctx) {
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  // Reset positions
  target.x = width / 2
  target.y = height / 2
  mouse.x = width / 2
  mouse.y = height / 2
  
  setupRibbons()
}

// --- DRAW ---
const draw = (time: number) => {
  if (!ctx || mediaQuery?.matches) return
  const t = time * 0.001
  const dark = isDark.value

  // On nettoie le canvas pour la frame suivante (le fond CSS reste visible derrière)
  ctx.clearRect(0, 0, width, height)

  // 1. Logique de mouvement (Souris vs Idle)
  if (hasMouse) {
    target.x = lerp(target.x, mouse.x, 0.08)
    target.y = lerp(target.y, mouse.y, 0.08)
    idleTimer = 0
  } else {
    idleTimer += 0.008
    const wanderRadius = width * 0.25
    target.x = width / 2 + Math.cos(t * 0.4) * wanderRadius * Math.sin(idleTimer)
    target.y = height / 2 + Math.sin(t * 0.6) * wanderRadius * Math.cos(idleTimer * 0.8)
  }

  // 2. Dessin
  // IMPORTANT : "source-over" respecte l'opacité sans additionner la lumière à l'infini.
  // C'est crucial pour que le texte reste lisible.
  ctx.globalCompositeOperation = 'source-over'

  for (const ribbon of ribbons) {
    ribbon.phase += 0.015

    // Physique du ruban
    const head = ribbon.path[0]
    head.x = lerp(head.x, target.x, ribbon.speed)
    head.y = lerp(head.y, target.y, ribbon.speed)

    const segmentLen = width * 0.012
    for (let i = 1; i < ribbon.path.length; i++) {
      const pCurrent = ribbon.path[i]
      const pPrev = ribbon.path[i - 1]
      const dx = pPrev.x - pCurrent.x
      const dy = pPrev.y - pCurrent.y
      const angle = Math.atan2(dy, dx)
      
      // Ondulation douce
      const waviness = Math.sin(ribbon.phase + i * 0.15) * 3

      pCurrent.x = pPrev.x - Math.cos(angle) * segmentLen + Math.cos(angle + Math.PI/2) * waviness
      pCurrent.y = pPrev.y - Math.sin(angle) * segmentLen + Math.sin(angle + Math.PI/2) * waviness
    }

    // Création du chemin
    ctx.beginPath()
    ctx.moveTo(ribbon.path[0].x, ribbon.path[0].y)
    for (let i = 1; i < ribbon.path.length - 1; i++) {
      const pMid = {
        x: (ribbon.path[i].x + ribbon.path[i+1].x) / 2,
        y: (ribbon.path[i].y + ribbon.path[i+1].y) / 2
      }
      ctx.quadraticCurveTo(ribbon.path[i].x, ribbon.path[i].y, pMid.x, pMid.y)
    }

    // Gestion de la couleur et de l'opacité pour la lisibilité
    const gradient = ctx.createLinearGradient(
      head.x, head.y, 
      ribbon.path[ribbon.path.length-1].x, ribbon.path[ribbon.path.length-1].y
    )

    if (dark) {
      // DARK MODE LISIBLE :
      // Opacité max réduite à 0.25 (au lieu de 0.8 ou 1.0)
      // Pas de blanc pur, on garde la teinte.
      gradient.addColorStop(0, hsla(ribbon.color, 0.25))
      gradient.addColorStop(1, hsla(ribbon.color, 0.0))
      
      // Glow très subtil, à peine visible pour ne pas baver sur le texte
      ctx.shadowBlur = 15
      ctx.shadowColor = hsla(ribbon.color, 0.2)
    } else {
      // LIGHT MODE :
      // Un peu plus visible car le contraste noir sur blanc est plus fort par défaut
      gradient.addColorStop(0, hsla(ribbon.color, 0.35))
      gradient.addColorStop(1, hsla(ribbon.color, 0.0))
      ctx.shadowBlur = 0
    }

    ctx.strokeStyle = gradient
    ctx.lineWidth = ribbon.thickness
    ctx.stroke()
  }
  
  // Nettoyage shadow
  ctx.shadowBlur = 0
}

const tick = (time: number) => {
  draw(time)
  rafId = requestAnimationFrame(tick)
}

const handlePointer = (e: PointerEvent) => {
  hasMouse = true
  mouse.x = e.clientX
  mouse.y = e.clientY
}
const handlePointerLeave = () => { hasMouse = false }

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
.energy-flow-container {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  
  /* C'EST ICI QUE L'ON FORCE LE MEME BACKGROUND QUE LE THEME */
  /* Assurez-vous que --theme-page-gradient est bien défini dans votre CSS global ou :root */
  background: var(--theme-page-gradient, radial-gradient(circle at 18% 20%, rgba(99, 102, 241, 0.12), transparent 32%), linear-gradient(180deg, #f8fafc 0%, #e8edf5 100%));
}

.energy-flow-container.is-dark {
  background: var(--theme-page-gradient, radial-gradient(circle at 20% 18%, rgba(99, 102, 241, 0.12), transparent 32%), linear-gradient(180deg, #0a0f1e 0%, #050a14 100%));
}

.flow-canvas {
  width: 100%;
  height: 100%;
  display: block;
  /* Pas de filtre de contraste agressif ici pour préserver la douceur */
}
</style>