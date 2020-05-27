module.exports = {
  apps : [{
    "name": "dev_eco",
    script: 'server.js',
    watch: '.',
    env: {
	"PORT": 3021,
	"NODE_ENV": "development"
    }
  }, {
    "name": "prod",
    script: 'prod.js',
    watch: '.',
    env: {
        "NODE_ENV": "production"
    }
  }]
};