module.exports = {
  apps: [
    {
      name: "cms-prod",
      script: "npm",
      args: "start",
      cwd: "/home/marek/applications/personal_web/backend",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "2G",
      env: {
        NODE_ENV: "production",
      }
    },
    {
      name: "cms-dev",
      script: "npm",
      args: "run develop",
      cwd: "/home/marek/applications/personal_web/backend",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: ["/home/marek/applications/personal_web/backend"],
      ignore_watch: [
        "node_modules",
        "public",
        ".git",
        ".env",
        "dist",
        "build",
        ".tmp",
        "data"
      ],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      }
    }
  ]
};
