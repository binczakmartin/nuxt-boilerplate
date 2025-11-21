import { themeConfig, type ThemeName } from '~/config/theme'

const buildCSSVars = (themeName: ThemeName) => {
  const tokens = themeConfig.themes[themeName]

  return `
    color-scheme: ${tokens.colorScheme};
    --bg-page: ${tokens.page};
    --bg-page-muted: ${tokens.pageMuted};
    --surface: ${tokens.surface};
    --surface-muted: ${tokens.surfaceMuted};
    --glass: ${tokens.glass};
    --border: ${tokens.border};
    --border-strong: ${tokens.borderStrong};
    --text-primary: ${tokens.text};
    --text-secondary: ${tokens.textMuted};
    --text-helper: ${tokens.textHelper};
    --accent: ${tokens.accent};
    --accent-strong: ${tokens.accentStrong};
    --accent-contrast: ${tokens.accentContrast};
    --accent-soft: ${tokens.accentSoft};
    --accent-border: ${tokens.accentBorder};
    --page-gradient: ${tokens.pageGradient};
    --shadow-soft: ${tokens.shadowSoft};
    --shadow-strong: ${tokens.shadowStrong};
    --overlay: ${tokens.overlay};
    --nav-shadow: ${tokens.navShadow};
    --ring: ${tokens.ring};
    --focus-border: ${tokens.focusBorder};
    --state-success: ${themeConfig.state.success};
    --state-warning: ${themeConfig.state.warning};
    --state-error: ${themeConfig.state.error};
    --state-info: ${themeConfig.state.info};
    --radius-sm: ${themeConfig.radius.sm};
    --radius: ${themeConfig.radius.DEFAULT};
    --radius-md: ${themeConfig.radius.md};
    --radius-lg: ${themeConfig.radius.lg};
    --radius-xl: ${themeConfig.radius.xl};
    --radius-2xl: ${themeConfig.radius['2xl']};
  `
}

export default defineNuxtPlugin(() => {
  const light = buildCSSVars('light')
  const dark = buildCSSVars('dark')

  useHead({
    style: [
      {
        id: 'theme-tokens',
        innerHTML: [
          `:root {${light}}`,
          `:root.light, :root[data-theme="light"] {${light}}`,
          `:root.dark, :root[data-theme="dark"] {${dark}}`
        ].join('\n'),
        tagPosition: 'head'
      }
    ]
  })

  if (process.server) {
    const headers = useRequestHeaders(['sec-ch-prefers-color-scheme'])
    const cookie = useCookie<ThemeName | null>(themeConfig.cookieName, {
      default: () => null,
      sameSite: 'lax'
    })

    const headerTheme = headers?.['sec-ch-prefers-color-scheme']
    const preferred: ThemeName = cookie.value || (headerTheme === 'dark' ? 'dark' : 'light')

    useHead({ htmlAttrs: { class: preferred, 'data-theme': preferred } })
  }
})
