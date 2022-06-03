const withImages = require('next-images');
const path = require('path');
const withTM = require('next-transpile-modules')([
  '@formatjs/intl-relativetimeformat',
  '@formatjs/intl-utils',
  'react-intl',
  'intl-messageformat'
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const constructAlias = (config) => {
  return {
    '@app': path.resolve(__dirname, './app'),
    '@components': path.resolve(__dirname, './app/components'),
    '@containers': path.resolve(__dirname, './app/containers'),
    '@themes': path.resolve(__dirname, './app/themes'),
    '@utils': path.resolve(__dirname, './app/utils'),
    '@images': path.resolve(__dirname, './app/images'),
    '@store': path.resolve(__dirname, './app/store'),
    '@services': path.resolve(__dirname, './app/services'),
    ...config.resolve.alias
  };
};

module.exports = withBundleAnalyzer(
  withTM(
    withImages({
      assetPrefix: process.env.BASE_PATH || '',
      basePath: process.env.BASE_PATH || '',
      trailingSlash: true,
      images: {
        disableStaticImages: true
      },
      webpack(config) {
        config.resolve.alias = constructAlias(config);
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = await originalEntry();

          if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
            entries['main.js'].unshift('./polyfills.js');
          }

          return entries;
        };
        return config;
      }
    })
  )
);
