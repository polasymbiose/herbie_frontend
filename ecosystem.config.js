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
    "name": "prod_eco",
    script: 'server.js',
    watch: '.',
    env: {
	"PORT": 3022,
        "NODE_ENV": "production"
    }
  }]
};
