import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  external: [
    'react',
    'react-native',
    'expo-blur',
    'react-native-gesture-handler',
    'react-native-linear-gradient',
    'react-native-reanimated',
    '@reactnatively/animations',
    '@reactnatively/glass',
    '@reactnatively/theme',
    '@reactnatively/utils',
  ],
});
