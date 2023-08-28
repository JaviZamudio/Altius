import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // https://coolors.co/c09e53-0b1821-19324D
        'primary': '#0b1821',
        'secondary': '#c09e53',
        'tertiary': '#19324D',
        'accent': '#B9BCBE',
        // // DARK: https://coolors.co/aaaeb1-050b0f-b38f42-0f1e2e
        // 'primary-dark': '#050b0f',
        // 'secondary-dark': '#b38f42',
        // 'tertiary-dark': '#0f1e2e',
        // 'accent-dark': '#aaaeb1',
      },
      // // when dark mode is enabled
      // darkMode: 'class',
    },
  },
  // daisyui: {
  //   themes: [],
  // },
  // plugins: [require("daisyui")],
}
export default config
