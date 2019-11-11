const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = async ({ config }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.ts', '.tsx'],
    },
    devtool: 'source-map',
    plugins: [
      ...config.plugins,
      new WebpackBuildNotifierPlugin({
        title: 'Happy Hooks Build',
        warningSound: true,
        failureSound: true,
      }),
    ],
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: require.resolve('awesome-typescript-loader'),
              options: {
                babelOptions: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                    [
                      'import',
                      {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true,
                      },
                    ],
                  ],
                },
              },
            },
            // Optional
            {
              loader: require.resolve('react-docgen-typescript-loader'),
            },
          ],
        },
        // {
        //   test: /\.(js|jsx)$/,
        //   exclude: /(node_modules)/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //       options: {
        //         presets: ['@babel/preset-env', '@babel/preset-react'],
        //         plugins: [
        //           [
        //             'import',
        //             {
        //               libraryName: 'antd',
        //               libraryDirectory: 'es',
        //               style: true,
        //             },
        //           ],
        //         ],
        //       },
        //     },
        //     { loader: 'source-map-loader' },
        //   ],
        // },
        {
          test: /\.css$/,
          exclude: /(node_modules)/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                // modifyVars: antdTheme,    // 如果要自定义主题样式
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  };
};
