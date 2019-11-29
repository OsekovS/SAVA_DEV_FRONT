const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
          test: /\.scss$/,
          use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                  loader: 'css-loader',
                  options: { sourceMap: true }
              }, {
                  loader: 'sass-loader',
                  options: { sourceMap: true}
              }
          ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name.ext]'
          // outputPath: 'images',
        },
        // use: [
        //   {
        //     loader: 'file-loader',
        //   },
        // ],
      }
    ],
  },
};