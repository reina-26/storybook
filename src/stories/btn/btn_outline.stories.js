import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import btnCss from './btn.css';

export default {
  title: 'component/btn',
  decorators: [withKnobs],
};

export const btnOutline = () => {
  const tmpText = text('Text', 'ダミーテキスト');
  const disabled = boolean('disabled', false);
  return `
    <button class="c-btn is-outline">${tmpText}</button>
  `
};
