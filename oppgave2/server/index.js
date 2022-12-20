const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8069;
const app = express();

const { MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://simenf05:aeu8tAAWMVf6jqM3vLN2@cluster0.jlcn1j5.mongodb.net/?retryWrites=true&w=majority";
var databaseInfo = {}
var dataWithoutNames = {}
var sending = {}

const updateDBinfo = (obj) => databaseInfo[obj.name] = obj;
const updateWithoutNames = (obj) => Object.entries(obj).map((obj2, index) => dataWithoutNames[index] = obj2[1].results);
const updateSending = (obj) => {
    var arr = Object.values(obj);

    for (let i=0; i < arr[0].length; i++) {sending[i] = [0, 0]};

    for (let i=0; i < arr.length; i++) {
        for (let j=0; j < arr[i].length; j++) {

            if (arr[i][j] === "1") {sending[j][0]++;}

            else {sending[j][1]++;}
        };
    };
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getFromDb(callback = null) {
    try {
        var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const database = client.db("form");
        const usersCol = database.collection("users");
        const cursor = usersCol.find();
        await cursor.forEach((e) => updateDBinfo(e));
        updateWithoutNames(databaseInfo);
        updateSending(dataWithoutNames);
    } finally {
        await client.close();
    }

    if (callback) {
        callback();
    }
}

async function postToDb(obj) {
    var returnVal = "fail";

    try {
        var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const database = client.db("form");
        const usersCol = database.collection("users");

        let query = { name: obj.name };

        if (await usersCol.countDocuments(query) === 0) {
            await usersCol.insertOne(obj);
            returnVal = "success";
        }
        
    } finally {
        await client.close();
        getFromDb().catch(console.dir);
        return returnVal;
    }
}

getFromDb().catch(console.dir);

app.get("/api", (req, res) => {
    res.setHeader('content-type', "text/plain");
    res.send(JSON.stringify(sending));
})

app.post("/api", (req, res) => {

    res.header({ "content-type" : "text/plain" });

    let name = req.body.name;
    let results = req.body.results;

    obj = {
        name: name,
        results: results
    };

    postToDb(obj).then((insert) =>
        {if (insert === "success") 
        {res.end("Data sent.")}
        else 
        {res.end("Already exists.")}}
    );
})

app.listen(PORT, () => {
    console.log('server listening on ' + PORT);
})