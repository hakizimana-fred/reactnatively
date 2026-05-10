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
    'react-native-reanimated',
    'react-native-safe-area-context',
    'expo-haptics',
    'reactnatively-theme',
    'reactnatively-utils',
  ],
});
