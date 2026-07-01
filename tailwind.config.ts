import type { Config } from 'tailwindcss';

/**
 * "Lamplight" theme — near-black indigo night, warm off-white ink,
 * amber-gold accent. Token names are kept from the original template
 * (background/foreground/secondary/accent/light-gray/dark-gray) so every
 * page picks the palette up automatically.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        paragraph: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#0B0B10',
        panel: '#111118',
        foreground: '#EAE8E1',
        // muted label text
        secondary: '#8F8C9C',
        'secondary-foreground': '#0B0B10',
        // slightly-muted body copy (name kept for compatibility)
        'dark-gray': '#B9B6C3',
        // hairlines & subtle fills (name kept for compatibility)
        'light-gray': '#232331',
        accent: '#E3A857',
        'accent-dim': '#8A6A3B',
        primary: '#EAE8E1',
        'primary-foreground': '#0B0B10',
        subtletext: '#8F8C9C',
        destructive: '#DF3131',
        destructiveforeground: '#FFFFFF',
        gridline: '#232331',
      },
      letterSpacing: {
        widestplus: '0.25em',
      },
      maxWidth: {
        site: '90rem',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config;
