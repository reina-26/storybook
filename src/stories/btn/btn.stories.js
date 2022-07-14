import { withKnobs, text, boolean } from '@storybook/addon-knobs'
// import heading1 from './_heading1.html';
import btnCss from './btn.css';

export default {
  title: 'component/btn',
  parameters: {
    notes:
    `ノーマルのボタンになります。<br>
    使用ページ：<a href="#">トップページ</a><br>
    以下のバリエーションを用意しています<br>
    1. デフォルト: a.c-btn または button.c-btn<br>
    2. サイズ: is-xl, is-lg, （未指定）, is-sm, is-xs<br>
    3. レベル: （未指定）, is-primary, is-primary-alt, .is-outline<br>
    4. 状態: disabled 属性<br>
    5. ローディング: .is-loading 付加でボタン文言をローディングアイコンに変更<br>
      ※注： .is-loading の付加だけではボタンとしての機能は活きている状態なので<br>
        disalbed 属性も JavaScript 等で付加すること<br>`
  },
  decorators: [withKnobs],
};

export const btnNormal = () => {
  // return heading1;
  const tmpText = text('Text', 'ダミーテキスト');
  const disabled = boolean('disabled', false);
  return `
    <button class="c-btn">${tmpText}</button>
  `
};
