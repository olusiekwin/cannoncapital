import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      {
        name: "inject-google-site-verification",
        transformIndexHtml(html) {
          const token = env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
          if (!token) return html;
          const safe = token.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
          return html.replace("</head>", `<meta name="google-site-verification" content="${safe}" />\n  </head>`);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
