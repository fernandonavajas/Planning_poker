module.exports = {
  mode: 'development',
  entry: __dirname+'/src',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env', { targets: "defaults" },
            ],
            '@babel/preset-react'
          ]
        }
      }
    ]
  }
}