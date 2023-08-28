import { config } from "dotenv";

config();

export const configs = {
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce"
}