import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import pkg from "./package.json";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json'),
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "./src/core/index.ts"),
      name: "UiKit",
      // the proper extensions will be added
      // fileName: 'ui-kit',
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `ui-kit.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(pkg.peerDependencies || {})],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
    },
  },
});
