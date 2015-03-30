module.exports = {
  target: 'build',
  app: {
    src: './src/js/app.js',
    target: 'app.js'
  },
  vendors: {
    target: 'vendors.js',
    modules: [
      'react/addons',
      'material-ui'
    ]
  },
  htmlAssets: [
    'src/index.html'
  ],
  cssAssets: [
    'src/css/style.less'
  ]
};
