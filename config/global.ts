// Environment variables imported from .env file
export const env = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,

	MONGO_HOST: "127.0.0.1:27017",
	MONGO_DB: "cards_test",
	MONGO_URI: "mongodb://127.0.0.1:27017/cards?ssl=false&maxPoolSize=10'"

};
