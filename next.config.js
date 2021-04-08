module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: "csv-loader",
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });

    return config;
  },
  env: {
    NEXT_APP_FIREBASE_KEY: "AIzaSyB-3pX-Ugilzx798jjBjUe9iIbDLaxGS8U",
    NEXT_APP_FIREBASE_DOMAIN: "senior-ce96c.firebaseapp.com",
    NEXT_APP_FIREBASE_PROJECT_ID: "senior-ce96c",
    NEXT_APP_FIREBASE_STORAGE_BUCKET: "senior-ce96c.appspot.com",
    NEXT_APP_FIREBASE_SENDER_ID: 1083389397572,
  },
};
