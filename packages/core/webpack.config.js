const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.glsl$/,
        use: {
          loader: 'glsl-shaders-loader'
        }
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            inline: true,
            fallback: false
          }
        }
      },
    ]
  }
};
