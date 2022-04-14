module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lk/'
    : '/',

  // pwa: {
  //   name: 'Корма для Животных',
  //   themeColor: '#fff6e5',
  //   msTitleColor: '#ffe1f2',
  //   manifestOptions: {
  //     background_color: '#ffe1f2'
  //   },
  //   workboxOptions: {
  //     skipWaiting: true
  //   }
  // },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/[name].[hash:8].min.js'
      config.output.chunkFilename = 'js/[name].[hash:8].min.js'
    }
  },
  chainWebpack: config => {
    config.plugins.delete('pwa')
    config.plugins.delete('workbox')
    if (process.env.NODE_ENV === 'production') {
      config.module.rule('vue').uses.delete('cache-loader')
      config.module.rule('js').uses.delete('cache-loader')
      config.module.rule('ts').uses.delete('cache-loader')
      config.module.rule('tsx').uses.delete('cache-loader')
      config
        .plugin('html')
        .tap(args => {
          args[0].title = 'ЛК ИП Сидоров'
          return args
        })
    }
  }
}
