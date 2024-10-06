/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: ({ theme }) => ({
        pp: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-invert-body': theme('colors.white')
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

