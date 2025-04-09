import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Export konfiguracije
export default defineConfig({
  plugins: [react()],
  define: {
    // Vite automatski koristi `import.meta.env` za varijable iz .env fajlova
    "process.env": process.env,
  },
  // Ako koristiš podputanje, možeš postaviti base
  base: "/", // Postavi putanju ako je aplikacija u poddirektorijumu
});