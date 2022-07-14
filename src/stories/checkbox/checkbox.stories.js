import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import checkboxCss from './checkbox.css';

export default {
  title: 'component/checkbox',
  parameters: {
    notes: `チェックボックスになります。<br>
    使用ページ：<a href="#">トップページ</a><br>
    以下のバリエーションを用意しています<br>
     1. エラー時（当該要素、または先祖要素に .is-error を付加）<br>
     2. disabled 属性`,
  },
  decorators: [withKnobs],
};

export const checkboxNormal = () => {
  const tmpText = text('Text', 'ダミーテキスト');
  const disabled = boolean('disabled', false);
  const err = boolean('err', false);
  return `
    <label class="c-form-checkbox">
      <input type="checkbox">
      <span>${tmpText}</span>
    </label>
  `
};
