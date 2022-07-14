import { withKnobs,text, boolean } from '@storybook/addon-knobs'
import raduioCss from './radiobtn.css';

export default {
  title: 'component/radiobtn',
  decorators: [withKnobs],
};

export const radiobtnNormal = () => {
  const tmpText = text('Text', 'ダミーテキスト');
  const disabled = boolean('disabled', false);
  const err = boolean('err', false);
  return `
    <label class="c-form-radio">
      <input type="radio">
      <span>${tmpText}</span>
    </label>
  `
};
