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
    'react-native-gesture-handler',
    'expo-blur',
    'expo-haptics',
    'reactnatively-theme',
    'reactnatively-animations',
    'reactnatively-glass',
    'reactnatively-utils',
  ],
});
