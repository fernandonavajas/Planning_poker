const path = require('path');

module.exports = {
  mode: 'production',
  entry: __dirname+'/src/index.js',
  output: {
    filename: './dist/bundle.js'
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