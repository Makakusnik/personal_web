module.exports = {
  apps : [{
    name: "strapi-cms",       // A friendly name for your Strapi application
    script: "npm",            // The command to execute (npm in this case)
    args: "start",            // Arguments to pass to the script (runs the 'start' script in package.json)
    cwd: "/home/marek/applications/personal_web/backend", // IMPORTANT: Set this to the actual absolute path of your Strapi project
    instances: 1,             // Number of instances to run. For most Strapi setups, 1 is sufficient.
    exec_mode: "fork",        // "fork" mode for a single process, "cluster" for load balancing
    autorestart: true,        // Automatically restart the app if it crashes
    watch: false,             // Set to true if you want PM2 to watch for file changes and restart (usually false in production)
    max_memory_restart: "2G", // Restart the app if it exceeds this memory limit (adjust based on your Strapi app's needs)
    env: {                    // Environment variables for your Strapi application
      NODE_ENV: "production",
    }
  }]
};
