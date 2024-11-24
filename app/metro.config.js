const { getDefaultConfig } = require("@expo/metro-config");

const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = wrapWithReanimatedMetroConfig(defaultConfig);

module.exports = config;
