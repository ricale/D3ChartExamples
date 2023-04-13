module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          utils: './src/utils',
        },
      },
    ],
  ],
};
