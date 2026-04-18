module.exports = {
  apps: [
    {
      name: "blindspot-app",
      script: "node_modules/next/dist/bin/next",
      args: "start",
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
