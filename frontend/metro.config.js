const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// 1. Fetch default Expo config first
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// 2. Configure SVG Transformer correctly
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  unstable_allowRequireContext: true,
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

// 3. Wrap with NativeWind LAST
module.exports = withNativeWind(config, { input: "./style.css" });
