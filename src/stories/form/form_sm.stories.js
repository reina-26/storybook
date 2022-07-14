import { withKnobs, boolean } from '@storybook/addon-knobs'
import formCss from './form.css';

export default {
  title: 'component/form',
  decorators: [withKnobs],
};

export const FromSmall = () => {
  const disabled = boolean('disabled', false);
  const err = boolean('err', false);
  return `
    <input type="text" class="c-form-text is-sm" name="" id="" value=".is-sm">
  `
};
