const path = require('path');

const src = path.resolve(__dirname, '../src');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [src, 'node_modules'],
      alias: {
        components$: path.join(src, 'components'),
        compositions$: path.join(src, 'compositions'),
        config$: path.join(src, 'config'),
        context$: path.join(src, 'context'),
        docs$: path.join(src, 'docs'),
        hooks$: path.join(src, 'hooks'),
        icons$: path.join(src, 'icons'),
        postcss$: path.join(src, 'postcss/vars/index'),
        public$: path.resolve(__dirname, '../public'),
        styles$: path.join(src, 'styles'),
        types$: path.join(src, 'types'),
        utils$: path.join(src, 'utils'),
        'react-dom': '@hot-loader/react-dom',
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-object-rest-spread',
  });

  actions.setBabelPlugin({
    name: '@emotion/babel-plugin',
  });

  actions.setBabelPreset({
    name: `babel-preset-gatsby`,
    options: {
      reactRuntime: 'classic',
    },
  });
};
