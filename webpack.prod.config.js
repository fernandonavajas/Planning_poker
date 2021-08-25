module.exports = {
  mode: 'production',
  entry: __dirname+'/src',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: [ /\.js$/, /\.jsx?$/],
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