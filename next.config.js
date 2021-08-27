const path = require('path');
module.exports = {
  webpack: (config, { isServer }) => {
    // this i did to avoid fs errors but need to check.
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  env: {
    APP_NAME: 'Davinci',
    API_KEY: 'AIzaSyBCC6ZG9rLWUyEWsMvKbISBJj61zKY8sS8',
    AUTH_DOMAIN: 'davinci-33f41.firebaseapp.com',
    PROJECT_ID: 'davinci-33f41',
    STORAGE_BUCKET: 'davinci-33f41.appspot.com',
    MESSAGING_SENDER_ID: '543136869191',
    APP_ID: '1:543136869191:web:8e80d6b3618c9d08997a62',
    MEASUREMENT_ID: 'G-SCD4TJGBHV',
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/common/styles')],
  },
  images: {
    domains: ['google.com'],
  },
};
