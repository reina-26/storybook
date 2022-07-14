import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import btnCss from './btn.css';

export default {
  title: 'component/btn',
  decorators: [withKnobs],
};

export const btnLarge = () => {
  const tmpText = text('Text', 'ダミーテキスト');
  const disabled = boolean('disabled', false);
  return `
    <button class="c-btn is-lg">${tmpText}</button>
  `
};
