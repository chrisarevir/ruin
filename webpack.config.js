module.exports = {
  entry: './src/ruin.js',

  devServer: {
    host: '0.0.0.0'
  },

  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ],

  output: {
    filename: 'index.js'
  }
};
