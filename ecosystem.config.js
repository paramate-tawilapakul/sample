module.exports = {
  apps: [
    {
      name: 'server',
      script: 'server.js',
      watch: true,
      instances: 3,
      exec_mode: 'cluster',
      // error_file: 'c:/apps/endoplus/logs/err.log',
      // out_file: 'c:/apps/endoplus/logs/out.log',
      // log_file: 'c:/apps/endoplus/logs/combined.log',
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
