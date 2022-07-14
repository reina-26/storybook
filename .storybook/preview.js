import { addDecorator } from '@storybook/html'
// // import scss from '../src/scss/style.scss'
// import '../src/scss/style.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
