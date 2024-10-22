import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-black',
      'bg-secondary': 'bg-[#8881]',
      'bg-hover': 'bg-[#8882]',
      'color-base': 'text-#222 dark:text-#ddd',
      'border-base': 'border-gray:20',

      'box-input': 'box-input-shell box-input-inner focus:(border-primary ring-2 ring-primary:20)',
      'box-input-shell': 'bg-base color-base border-base border rounded-lg focus-within:(border-primary ring-2 ring-primary:20) disabled:(bg-gray:10 color-gray:50)',
      'box-input-inner': 'px2 py1 outline-none w-full bg-base rounded-lg placeholder-gray:50',
    },
    [/^btn-simple-(.*)$/, ([,color]) => {
      return [
        `@hover:border-${color}/50 @hover:color-${color} @hover:opacity-100`,
        `active:bg-${color}/10`,
        'disabled:opacity-50 disabled:pointer-events-none',
        `border border-base border-rounded-lg`,
        `flex gap-1 items-center justify-center`,
      ].join(' ')
    }],
  ],
  theme: {
    colors: {
      primary: '#0a9cae',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      timeouts: {
        warning: 7_000,
        failure: 10_000,
      },
      fonts: {
        sans: 'DM Sans',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    ['select-custom', {
      'appearance': 'none',
      'background-image': 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'1em\' height=\'1em\' viewBox=\'0 0 32 32\'%3E%3Cpath fill=\'currentColor\' d=\'M16 22L6 12l1.4-1.4l8.6 8.6l8.6-8.6L26 12z\'/%3E%3C/svg%3E")',
      'background-repeat': 'no-repeat',
      'background-position': 'right 0.7rem top 50%',
      'background-size': '0.65rem auto',
      'padding-right': '2rem',
    }],
  ],
})
