import {MongoClient} from "mongodb"
const client = new MongoClient(import.meta.env.VITE_db)

export var join = async () => {
	await client.connect()
  return await client.db("showify")
}

export var close = async () => {
	await client.close()
  console.log('closed')
}

