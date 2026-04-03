import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
    },
  },
  shortcuts: {
    'pretty-scrollbar': 'scrollbar scrollbar-rounded scrollbar-thumb-color-gray-300 scrollbar-track-color-gray-100 dark:scrollbar-thumb-color-#424242 dark:scrollbar-track-color-#686868',
    'divider': 'h-1px bg-current op-10',
    'bg-surface': 'bg-#ffffff dark:bg-#1f2937',
    'bg-background': 'bg-#f8fafc dark:bg-#0f172a',
    'text-primary': 'text-#1e293b dark:text-#f3f4f6',
    'text-secondary': 'text-#64748b dark:text-#9ca3af',
    'text-tertiary': 'text-#94a3b8 dark:text-#6b7280',
    'border-light': 'border-#e2e8f0 dark:border-#374151',
    'shadow-sm': 'shadow-0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow-md': 'shadow-0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    'shadow-lg': 'shadow-0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    'transition-smooth': 'transition-all duration-300 ease-in-out',
  },
});
