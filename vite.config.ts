import path from 'path';
import { BuildOptions, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function getBuildConfig(isPreviewBuild: boolean): BuildOptions {
  if (isPreviewBuild) {
    return { target: 'esnext' };
  }

  return {
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'createItemWidget',
      fileName: (format) => `createItemWidget.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      external: ['vue'],
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: getBuildConfig(!!process.env.NETLIFY),
});
