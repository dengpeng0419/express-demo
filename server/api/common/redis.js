var redis = require("redis");

var	client = null;//redis.createClient();

function connectRedis() {
	if(client) return;
	client = redis.createClient();
	client.on("error", function (err) {
		console.log("Error " + err);
	});
	console.log('===============Redis client created.');
}

function getRedisClient() {
	return client;
}

function closeRedis() {
	if (client) {
		client.quit((error) => {
			if (error) {
				console.log('Redis client close failed');
			}
			console.log('Redis client closed.');
		});
	} else {
		console.log('Redis client not exsit');
	}
}

module.exports = {
	connectRedis,
	getRedisClient,
	closeRedis,
};
