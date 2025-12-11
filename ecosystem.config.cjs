/**
 * PM2 Ecosystem Configuration
 * For production deployment on AWS
 * 
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 restart ecosystem.config.cjs
 *   pm2 stop ecosystem.config.cjs
 */

module.exports = {
  apps: [
    {
      name: 'ai-marketing-backend',
      script: './server/server.js',
      cwd: '/var/www/ai-marketing',
      instances: 'max', // Use all CPU cores
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      // Logging
      log_file: '/var/log/pm2/ai-marketing.log',
      error_file: '/var/log/pm2/ai-marketing-error.log',
      out_file: '/var/log/pm2/ai-marketing-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Restart policy
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      min_uptime: '10s',
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000
    }
  ],

  // Deployment configuration
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'YOUR_EC2_IP',
      ref: 'origin/main',
      repo: 'YOUR_GIT_REPO_URL',
      path: '/var/www/ai-marketing',
      'pre-deploy-local': '',
      'post-deploy': 'cd server && npm install && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': ''
    }
  }
};
