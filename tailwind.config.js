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
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

