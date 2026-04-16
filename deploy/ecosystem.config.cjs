module.exports = {
  apps: [
    {
      name: "tamex-api",
      script: "server/index.js",
      cwd: "/var/www/tamex-inc/current",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};
