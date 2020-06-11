module.exports = {
  apps: [
    {
      script: "server.js",
      watch: ".",
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "export synapse_jwtPrivateKey=mySecureKey && npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
