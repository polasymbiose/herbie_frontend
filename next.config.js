const withPlugins = require('next-compose-plugins')
const sass = require('@zeit/next-sass')
// const fonts = require('nextjs-fonts')

module.exports = withPlugins(
  [
    [
      sass,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]-[hash:base64:5]',
          url: false // This fixed my problem
        },
        typescript: {
          ignoreDevErrors: true
        }
      }
    ]
  ],
  {
    devIndicators: {
      autoPrerender: false,
      typescript: {
        ignoreDevErrors: true
      }
    }
  }
)
