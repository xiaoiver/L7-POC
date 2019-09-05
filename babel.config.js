// @see https://babeljs.io/docs/en/next/config-files#project-wide-configuration
module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: 'current',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          // @see https://github.com/storybookjs/storybook/issues/6069#issuecomment-472544973
          loose: true
        }
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-modules-commonjs',
      [
        // import glsl as raw text
        'babel-plugin-inline-import',
        {
          extensions: [
            '.json',
            '.glsl'
          ]
        }
      ]
    ],
    env: {
      build: {
        ignore: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.story.tsx',
          '__snapshots__',
          '__tests__',
          '__stories__',
          '**/*/__snapshots__',
          '**/*/__tests__',
        ],
      },
    },
    ignore: ['node_modules'],
  };
}