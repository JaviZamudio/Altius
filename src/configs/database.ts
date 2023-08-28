import { configs } from "./configs";
import { MongoClient } from "mongodb";

const client = new MongoClient(configs.MONGO_URI);
client.connect().then(() => console.log("Connected to MongoDB"));

export const db = client.db("altius");

export const events = db.collection("events");

