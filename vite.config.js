import { defineConfig } from 'vite';

export default defineConfig({
    // Base URL for production builds
    base: '/ThreeJs-SolarSystem/',

    // Development server configuration
    server: {
        port: 3000, // Specify the port you want to use for the development server
    },

    // Build configuration for production
    build: {
        outDir: 'dist', // Specify the output directory for the production build
        assetsDir: '', // Specify the assets directory relative to the output directory
        sourcemap: false, // Set this to true if you want to generate sourcemaps for debugging
    },
});