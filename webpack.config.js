const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  return {
    entry: './svgloader.js',
    module: {
      rules: [{
        test: /.(js|jsx)$/,
        exclude: ['/node_modules/', '/build/'],
        use: { loader: 'babel-loader' },
      }],
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'js/svgloader.min.js',
      library: {
        name: 'SvgLoader',
        type: 'umd',
      },
    },
    plugins: [
      new ESLintPlugin({
        extensions: [`js`, `jsx`],
        exclude: [`node_modules`],
        emitWarning: true,
        overrideConfigFile: './.eslintrc.json'
      }),
    ],
    target: 'web'
  };
};
