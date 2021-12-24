module.exports = {
  apps: [
    {
      name: 'owo-server',
      script: './build/server.js',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true
    }
  ]
};
