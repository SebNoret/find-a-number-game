import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import postcss from "postcss";
import { createHtmlPlugin } from "vite-plugin-html";
import autoprefixer from "autoprefixer";

const test = "http://localhost:80/dist/";
const dev = "http://localhost:5173/";
const prod = "https://snt-portfolio.netlify.app/nombre-mystere/demo/";

export default defineConfig({
  base: prod,
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    postcss({
      plugins: [autoprefixer()],
    }),
    createHtmlPlugin({
      minify: true, // Active la minification des fichiers HTML
      collapseWhitespace: true, // Réduit les espaces vides
      removeComments: true, // Supprime les commentaires
    }),
  ],
});
