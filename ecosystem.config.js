module.exports = {
  apps: [
    {
      name: "blindspot-app",
      script: ".next/standalone/server.js",
      instances: 1,
      watch: false,
      max_memory_restart: "1G", // Restart app if memory goes over 1GB
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
