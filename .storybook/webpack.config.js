const path = require('path');

module.exports = ({ config }) => {

  // @see https://github.com/webpack/webpack/issues/6642#issuecomment-371087342
  config.output.globalObject = "this";

  config.module.rules.push({
    test: /\.glsl$/,
    loader: 'raw-loader'
  });

  config.module.rules.push({
    test: /\.worker\.(js|ts)$/,
    use: {
      loader: 'worker-loader',
      options: { inline: true, fallback: false }
    }
  });

  // config.module.rules.push({
  //   test: /\.stories\.tsx?$/,
  //   loaders: [
  //     {
  //       loader: require.resolve('@storybook/addon-storysource/loader'),
  //       options: { parser: 'typescript' },
  //     },
  //   ],
  //   enforce: 'pre',
  // });

  // @see https://github.com/storybookjs/storybook/issues/3346#issuecomment-467237732
  config.module.rules = config.module.rules.filter(rule => !(
    (rule.use && rule.use.length && rule.use.find(({ loader }) => loader === 'babel-loader'))
  ));
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
        sourceType: 'unambiguous',
        presets: [['react-app', { flow: false, typescript: true }]],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx', '.js', '.glsl');
  config.resolve.alias = {
    '@layers': path.resolve(__dirname, '../packages/layers/'),
  };

  return config;
};