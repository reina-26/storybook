// const path = require('path')

// module.exports = {
//   webpackFinal: async(config, {configType}) => {
//     config.module.rules.push({
//       test: /\.scss$/,
//       use: [
//         'style-loader',
//         {
//           loader: 'css-loader',
// 　　　　   options: {
//             url: false
//           }
//         },
//         'sass-loader',
//         {
//           loader: 'sass-resources-loader',
//           options: {
//             resources: ['../src/scss/style.scss'],
//           }
//         }
//       ],
//     })
//     return config
//   },
//   stories: [
//     "../src/**/*.stories.mdx",
//     "../src/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//     '@storybook/addon-knobs',
//     '@storybook/addon-notes/register'
//   ],
//   framework: "@storybook/html"
// }
const path = require('path')

module.exports = {
  webpackFinal: async(config, {configType}) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            // Prefer `dart-sass`
            implementation: require("sass"),
          },
        },
      ],
    })
    return config
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-knobs',
    '@storybook/addon-notes/register'
  ],
  framework: "@storybook/html",
  "core": {
    "builder": "webpack4"
  },
  core: {
    builder: "webpack5",
  }
}
