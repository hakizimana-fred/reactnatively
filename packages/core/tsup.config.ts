import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/glass.ts',
    'src/hooks.ts',
    'src/animations.ts',
    'src/theme.ts',
    'src/primitives.ts',
    'src/utils.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  // Internal workspace packages are bundled in — users install only "reactnatively"
  external: [
    'react',
    'react-native',
    'expo-blur',
    'react-native-gesture-handler',
    'react-native-reanimated',
  ],
});
