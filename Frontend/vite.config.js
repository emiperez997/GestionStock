import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }) => {
  // Using env variables in Vite
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // base: "/ecommerce-alkemy/",
    plugins: [react()],
  });
};
