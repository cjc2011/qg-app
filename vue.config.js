const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  filenameHashing: false,
  baseUrl: './',

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('^', resolve('src/assets'))
      .set('%', resolve('src/components'))
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
}
