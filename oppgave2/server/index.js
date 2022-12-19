const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8069;
const app = express();

const { MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://simenf05:aeu8tAAWMVf6jqM3vLN2@cluster0.jlcn1j5.mongodb.net/?retryWrites=true&w=majority";
var databaseInfo = {}
var dataWithoutNames = {}
var sending = {}

const updateDBinfo = (obj) => databaseInfo[obj.name] = obj
const updateWithoutNames = (obj) => Object.entries(obj).map((obj2, index) => dataWithoutNames[index] = obj2[1].results);
const updateSending = (obj) => {
    var arr = Object.values(obj);

    for (let i=0; i < arr.length; i++) {

        for (let j=0; j < arr[i].length; j++) {
            if (j in sending) {
                sending[j] = sending[j] += Number(arr[i][j])
            }
            else {
                sending[j] = Number(arr[i][j]);
            }
        }
    }
}



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
    try {
        var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const database = client.db("form");
        const usersCol = database.collection("users");

        let query = { name: obj.name }

        if (await usersCol.countDocuments(query) === 0) {
            await usersCol.insertOne(obj);
        }
    } finally {
        await client.close()
        getFromDb().catch(console.dir)
    }
}

getFromDb().catch(console.dir)

app.get("/api", (req, res) => {
    res.setHeader('content-type', "text/plain")
    res.send(JSON.stringify(sending))
})

app.post("/api", (req, res) => {

    let name = req.body.name
    let results = req.body.results

    obj = {
        name: name,
        results: results
    }

    postToDb(obj)
    res.end("yes")
})

app.listen(PORT, () => {
    console.log('server listening on ' + PORT);
})

