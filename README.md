# gulpfile

## Require
[node.js version 14.x](https://qiita.com/taiponrock/items/9001ae194571feb63a5e)
[yarn install](https://www.suzu6.net/posts/124-yarn-windows/)

## インストール手順
対象ディレクトリでパッケージのインストール
npm i -D

監視状態にする
yarn gulp watch

ブラウザ自動更新（browser-sync, ファイル更新したら自動でブラウザを更新する）
npm run bs

## Git設定情報
dist配下のHTML等のコンフリクトを避けるため、ブランチによってdist配下をコミット出来ないように設定しております。

master→dist配下のコミットOK
develop→dist配下のコミットNG。（開発用）

masterはディレクターさんや外部の方が確認できるようにdist配下のコミットをOKにしています。
developは開発用です。

## モック制作時のGit操作
0. 初期設定として、.git/config ファイルに以下の設定を記述。参考:(https://www.yokoweb.net/2016/09/14/git-branch/)
[merge "ours"]
    name = "Keep ours merge"
    driver = true
1. developにチェックアウト
2. ブランチを切る
3. 作業が完了したらdevelopにマージ（マージ後に一度npmを停止する）
4. developをpushする
5. masterにチェックアウト
6. developをmasterにマージする
7. npmを動かしてdist配下のHTMLとCSSを出力する
8. masterをpushする
9. 1の作業に戻る


## CSS設計思想
FLOCSSを採用しています。

FLOCSS参考URLは以下です。

[FLOCSS公式Github](https://github.com/hiloki/flocss)

[Qiita:私のためのFLOCSSまとめ](https://qiita.com/super-mana-chan/items/644c6827be954c8db2c0)

[Dart Sass（@use）の基本的な書き方と@importから乗り換える方法](https://haniwaman.com/dart-sass/)

[Sassのモジュールシステムを@importから@useに移行する方法を考えてみた](https://parashuto.com/rriver/development/sass-module-system-from-import-to-use)

## SCSSファイル構成
scss/
├── foundation
│   ├── _index.scss          -foundation内のSCSSをまとめておくファイル
│   ├── _reset.scss          -リセットCSS
│   └── _base.scss           -ベースになるCSSを管理
├── global
│   ├── _index.scss          -global内のSCSSをまとめておくファイル
│   ├── _color.scss          -色の変数を管理
│   ├── _functions.scss      -関数を管理
│   ├── _mixins.scss         -mixinsを管理
│   └── _variable.scss       -ブレイクポイントなどその他変数を管理
├── layout
│   └── ...                  -各ページを構成するサイト全体で共通したレイアウトCSSを管理
├── object                   -サイト全体で再利用できるパターンを持つモジュールを管理
│   ├── component            -小さな単位のモジュールを管理
│ 	│   ├── _index.scss      -component内のSCSSをまとめておくファイル
│   │   └── ...
│   ├── project              -ページごとに使用するクラスを管理
│ 	│   ├── _index.scss      -project内のSCSSをまとめておくファイル
│   │   └── ...
│   └── utility              -調整のための便利クラスなどを管理
│ 	    ├── _index.scss      -utility内のSCSSをまとめておくファイル
│       └── ...
└── style.scss

## ディレクトリ構成

/
├── fdocs               -srcの出力先ディレクトリ
│   └── ...
└── src                 -出力元
    ├── ejs
    │   └── ...
    ├── html
    │   └── index.html  -ページ確認用HTML（一覧のHTMLが掲載）
    ├── images
    │   └── ...
    ├── js
    │   └── ...
    ├── scss
    │   └── ...
    └── ogp/favicon/gulpfile...

## Gitのコミットメッセージ
基本的にプレフィックスを付けます。
以下のURLのコミットの書き方をざっくり抜粋しました。
[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)
```
feat：新機能
refactor: リファクタリング
fix：バグ修正
perf：パフォーマンスを向上させるコード変更
update : 既存ファイルのアップデート
```



```
title: Storybook
```

[プラグインページ](https://storybook.js.org/)

## storybookの作成方法
.scssファイルはsrc/object/component/以下にコンポーネントの種類ごとにフォルダを切って格納します。
その中でさらにコンポーネントごとに名前を分けてファイルを格納します。
ファイルの命名規則とディレクトリ名の命名規則は以下とします。
コンポーネント名は基本的に最後に連番を付けますが、色変更やマーカなど、連番の必要のないものは不要です。
色変更コンポーネントなど、記述が１行などで短く、かつコンポーネント名に連番が不要なものについてはバリエーションごとにファイルをわける必要はありません。

## 例：c-btn01の場合
- ①コンポーネントの種類がボタン（button）
- ②コンポーネント名がc-btn01
- ③バリエーションが.is-lg
がある時

## SASS
``src/scss/object/component/_btn01.scss``

ファイル名は

ディレクトリ名は①
ファイル名はc-を除いて、先頭に_を付けたものにします。


## HTMLとコンポーネントの説明
以下のように、htmlはstory.jsファイルに（バリエーションごとにファイルを分ける）
説明は各story.jsファイルのnotesに記述します。
その際どのページで使用されているかを必ず明記するようにしましょう。
どのような用途で使うのか、使用する際の注意点も必ず記述してください。
コンポーネント名だけをかくのはNGです。

## 起動
npm run storybook
