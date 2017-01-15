module.exports = {
  entry: './src/ruin.js',
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ],
  output: {
    filename: 'index.js',
  },
};
