module.exports = {
    apps: [
      {
        name: 'your-app-name',
        script: 'path/to/your/server.js',
        watch: true,
        env: {
          NODE_ENV: 'production',
          // Other environment variables
        },
      },
    ],
  };