module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/html"
}

// const path = require('path');

// module.exports = {
//   webpackFinal: async (config, { configType }) => {

//     config.module.rules.push();

//     return config;
//   },
//   stories: ['../stories/**/*.stories.@(js|mdx)']
// };

const path = require('path');

module.exports = {
  webpackFinal: async (config, { configType }) => {

    config.module.rules.push(
      {
        test: /\.ejs$/,
        loaders: ['ejs-compiled-loader'],
        // 読み込む予定のEJSのディレクトリを指定する
        include: path.resolve(__dirname, '../src/ejs/_partials/_components/')
      }
    );

    return config;
  },
  stories: ['../stories/**/*.stories.@(js|mdx)']
};
