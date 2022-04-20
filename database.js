const mongodb = require("mongodb");

async function getDb() {
    const client = new mongodb.MongoClient("mongodb://localhost");
    await client.connect();

    const db = client.db("todos");

    return db;
}

async function getTodos() {
    const db = await getDb();

    const todos = db.collection("todos").find().toArray();

    return todos;
}

module.exports = {
    getDb,
    getTodos,
};
