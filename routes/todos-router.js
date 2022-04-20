const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../database");
const router = express.Router();
const database = require("../database");

router.get("/create", (req, res) => {
    res.render("todos/todos-create");
});

router.post("/create", async (req, res) => {
    const todo = {
        title: req.body.title,
        done: false,
        created: new Date().toLocaleString(),
    };

    const db = await getDb();

    db.collection("todos").insertOne(todo);

    res.redirect("/");
});

router.get("/:id", async (req, res) => {
    const id = ObjectId(req.params.id);

    const db = await database.getDb();

    db.collection("todos").findOne({ _id: id }, (err, todo) => {
        res.render("todos/todos-single", todo);
    });
});

router.post("/:id", async (req, res) => {
    const id = ObjectId(req.params.id);

    const updatedTodo = {
        title: req.body.title,
        done: false,
        created: new Date().toLocaleString(),
    };

    const db = await database.getDb();
    await db.collection("todos").updateOne({ _id: id }, { $set: updatedTodo });

    console.log(updatedTodo);

    res.redirect("/");
});

router.get("/:id/delete", async (req, res) => {
    const id = ObjectId(req.params.id);

    const db = await getDb();

    const result = db.collection("todos").deleteOne({ _id: id });

    await result;

    res.redirect("/");
});

module.exports = router;
