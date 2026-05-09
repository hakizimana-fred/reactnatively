import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: [
    'react',
    'react-native',
    'expo-blur',
    'react-native-linear-gradient',
    'react-native-reanimated',
    '@reactnatively/animations',
    '@reactnatively/theme',
    '@reactnatively/utils',
  ],
});
