const path = require('path')
const os = require('os')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '.env') })

// TODO: current pm2 deployment logic deploys both frontend and backend on each dir
const installPath = '/var/workING/frontend'

let keyFile = process.env.DEPLOY_KEY_PATH || undefined
if (keyFile) { keyFile = keyFile.replace(/^~/g, os.homedir()) }

let keyOption = ''
if (keyOption) { keyOption += '-i "' + keyFile + '"' }

module.exports = {
  apps: [
    {
      name: 'working-fe',
      exec_mode: 'cluster',
      cwd: './WEB(FE)/',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        HOST: '0.0.0.0',
        PORT: 16231,
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/main',
      repo: process.env.GITHUB_TOKEN
        ? 'https://' +
          process.env.GITHUB_TOKEN +
          ':' +
          process.env.GITHUB_TOKEN +
          '@github.com/osamhack2022/WEB_WorkING_WorkING'
        : 'git@github.com:osamhack2022/WEB_WorkING_WorkING.git',
      path: installPath,
      key: keyFile,
      // 'pre-deploy-local': `scp -Cr ./.env ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${installPath}/current`,
      'post-deploy': 'cd "WEB(FE)" && yarn && yarn build && pm2 startOrRestart ecosystem.config.js',
      ssh_options: [
        process.env.DEPLOY_BYPASS_KEY_CHECK ? 'StrictHostKeyChecking=no' : undefined,
        process.env.DEPLOY_SUPPRESS_SSH_LOG ? 'LogLevel=QUIET' : undefined
      ].filter(n => n !== undefined)
    }
  }
}
