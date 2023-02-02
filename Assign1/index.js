// import the required modules 
const express = require('express');
const path = require("path");
const { MongoClient } = require("mongodb");


// establish connection to the database
const dbURl = "mongodb://127.0.0.1:27017/shoesdb";
const client = new MongoClient(dbURl);


//set up express object and the port
const app = express();
const port = process.env.PORT || "8888";


//server listening 
app.listen(port, () => {
    console.log(`listing on http://localhost:${port}`)
});

//set file folders 
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


//set up pug engine
app.set("view engine", "pug");

//home page
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

//shop page
app.get("/shop", async (req, res) => {
    let shoes = await getShoes();
    res.render("shop", { title: "shop", shoeBox: shoes });
});

//about page
app.get("/about", async (req, res) => {
    let shoes = await getShoes();
    res.render("about", { title: "about" });
});




async function connection() {
    await client.connect();
    db = client.db("Shoesdb");
    return db;
}
async function getShoes() {
    db = await connection();
    var results = db.collection("shoes").find({});
    res = await results.toArray();
    return res;
}