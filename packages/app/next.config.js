const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const flow = require("lodash.flow");

module.exports = flow(
  withCSS,
  withImages
)({
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || "http://127.0.0.1:4000",
    GRAPHQL_SERVER_URI: process.env.GRAPHQL_SERVER_URI || "http://localhost:5000/v1/graphql",
    NODE_ENV: process.env.NODE_ENV,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN
  },
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  }
});
