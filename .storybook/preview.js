export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
import { addDecorator } from '@storybook/html'

import '../src/scss/style.scss' // 読み込みを行いたいscssファイル
