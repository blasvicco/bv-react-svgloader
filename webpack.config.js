const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const { optimize } = require('webpack');

const getOptimization = (env) => {
  const general = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      },
      minSize: 30000,
      maxAsyncRequests: 5,
      maxAsyncRequests: 3,
    },
  };
  return {
    optimization: {
      ...general,
      nodeEnv: 'production',
      flagIncludedChunks: true,
      sideEffects: true,
      usedExports: true,
      concatenateModules: true,
      minimize: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
    },
  };
}

module.exports = (env) => {
  return {
    stats: {
      entrypoints: false,
      children: false
    },
    entry: 'svgloader.js',
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: ['/node_modules/', '/build/'],
          // use: { loader: 'babel-loader' },
        },
      ]
    },
    ...getOptimization(env),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'js/svgloader.mim.js',
    },
    plugins: [
      new ESLintPlugin({
        extensions: [`js`, `jsx`],
        exclude: [`node_modules`],
        emitWarning: true,
        overrideConfigFile: './.eslintrc.json'
      }),
    ],
    resolve: {
      modules: [ './', 'node_modules' ],
      extensions: ['.js', '.jsx'],
    },
  };
};
