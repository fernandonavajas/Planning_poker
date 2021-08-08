
module.exports = {
  mode: 'development',
  entry: __dirname+'/src',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: [ /\.js$/, /\.jsx?$/],
        exclude: /node_module/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env', { targets: "defaults" },
            ],
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  }
}