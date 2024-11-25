const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

async function connectToDatabase(){
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('online-shop');
}

function getDb(){
    if(!database) {
        throw new Error('You must connect first!');//Create Error object
    }

    return database; //Return handle to db
}


module.exports = {
    connectToDatabase:connectToDatabase,
    getDb:getDb
}