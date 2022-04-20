require('dotenv').config()
const { ObjectId, Db } = require("mongodb");
const { getDb } = require("./database");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const todosRouter = require("./routes/todos-router.js");
const database = require("./database.js");

app.engine("hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
}));

app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const todos = await database.getTodos();

    res.render("home", {todos});
});

app.use("/todos", todosRouter);

app.get("/todos/:id/done", async (req, res) => {
    const id = ObjectId(req.params.id);
    const db = await getDb();
    await db.collection("todos").findOne({_id: id}, async (err, todo) => {
        const updateTodo = {
            done: !todo.done,
        };
        await db
            .collection("todos")
            .updateOne({_id: id}, {$set: {done: !todo.done} })
        console.log(todo.done)
        res.redirect("/"); 
    })
})

app.listen("8080", () => {
    console.log("http://localhost:8080");
})

