/*
Ensure the mogobd server is runing while creating this node application

assert function allows us to check if error is null or not. 
if error is not null, that means an error occurs

Mongo db drivers supports promises. So, if we do not specify a callback, the calls to their functions will return promises
*/

const MongoClient = require('mongodb').MongoClient; //this MongoClient enables us to connect to mongodb server
const assert = require('assert');
const dboperations = require('./operations');

const url = 'mongodb://localhost:27017/'; //address where the mongodb server can be acccessed 
const dbname = 'confusion'; //conFusion is database in our mongoDb server

/*NOW ACCESSING THE SERVER*/ //client is a callback function
/*
MongoClient.connect(url, (err, client) => {
    assert.equal(err, null); //enduring error is not null

    //if no error
    console.log('Connected correctly to server');

    const db = client.db(dbname) //connecting to the 'conFusion' database of the mongoDb application
*/
    // const collection = db.collection('dishes') //accessing the 'dishes' collection of the 'conFusion' database

    // /*inserting one document to the 'dishes' collection*/ 
    // collection.insertOne({'name': 'Uthappizza', 'description': 'test'}, (err, result) => {
    //     assert.equall(err, null);

    //     console.log('After Insert:\n');
    //     console.log(result.ops); //number of document inserted

    //     //to print out all the documents(hence the empty curly braces) and storing them in array object
    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null); //if docs was not in the collection, return an error

    //         console.log('Found:\n');
    //         console.log(docs) //the item that was succesfully inserted in the 'dishes' collection

    //         /*to remove the 'dishes' collection from the database(cleaning up the database)*/
    //         db.dropCollection('dishes', (err, result) => {
    //             assert.equal(err, null);

    //             client.close(); //closing connection to the database server 
    //         }) 
    //     })
        
    // })

    /* USING THE dboperations MODULE TO insert, find, delete and update document in a collection  */
    /*dboperations.insertDocumentent(
        db, 
        {name: 'Vadonut', description: 'Test'}, 
        'dishes', 
        (result) => {
            console.log('Insert Document:\n', result.ops); //returns the number of inserted operation
            
            dboperations.findDocuments(db, 'dishes', (docs) => {
                console.log('Found Documents:\n', docs);

                dboperations.updateDocument(
                    db, 
                    {name: 'Vadonut'}, 
                    {description: 'Updated Test'}, 
                    'dishes', 
                    (result) => {
                        console.log('Updated Document:\n', result.result);

                        dboperations.findDocuments(db, 'dishes', (docs) => {
                            console.log('Found Documents:\n', docs);

                            db.dropCollection('dishes', (result) => {
                                console.log('Dropped Collection: ', result);
                            
                                client.close(); //closing connection to the database server 
                            }) ;
                        });
                    }
                );
            });
        }
    );  */

    /*  USING THE PROMISES TO HANDLE CALLBACKS HELL*/
MongoClient.connect(url).then((client) => { //client is an object that holds the data base after connecting to the database server  
    
    //if no error
    console.log('Connected correctly to server');
    
    const db = client.db(dbname) 
    
    dboperations.insertDocument(db, {name: 'Vadonut', description: 'Test'}, 'dishes') 
    .then( (result) => {
        console.log('Insert Document:\n', result.ops); //returns the number of inserted operation
            
        return dboperations.findDocuments(db, 'dishes')
    })
    .then( (docs) => {
        console.log('Found Documents:\n', docs);

        return dboperations.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes') 
    })            
    .then( (result) => {
        console.log('Updated Document:\n', result.result);

        return dboperations.findDocuments(db, 'dishes')
    }) 
    .then( (docs) => {
        console.log('Found Documents:\n', docs);

        return db.dropCollection('dishes')
    })
    .then( (result) => {
        console.log('Dropped Collection: ', result);
                            
        client.close(); //closing connection to the database server 
    })
    .catch( (err) => console.log(err) );

})
.catch( (err) => console.log(err) );
