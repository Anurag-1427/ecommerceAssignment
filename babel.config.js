module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~navigation': './src/navigation',
          '~screens': './src/screens',
          '~utils': './src/utils',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-worklets/plugin',
  ],
};
