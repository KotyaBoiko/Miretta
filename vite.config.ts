import react from "@vitejs/plugin-react";
import path from 'path';
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/styles/_variables.scss" as *;
        @use "@/assets/styles/_mixins.scss" as *;
        @use "@/assets/styles/_fonts.scss" as *;
        `,
      },
    },
  },
});
