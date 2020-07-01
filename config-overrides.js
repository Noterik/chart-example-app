module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    ...config.resolve.alias,
   react: require.resolve("react"),
   "styled-components": require.resolve("styled-components")
  }
  return config;
}