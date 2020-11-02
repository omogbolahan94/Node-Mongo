/*
Performing various mongoDb database operations in this encapsulation operations folder

db: a database
document: the documemnt(json) to insert into a collection
collection: this will hold the document(s)
callback: a function that is called back once the operation is completed
*/
const assert = require('assert');

//inserting a document to a particular collection
/*
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection); //where coll is just a variable that points to the 

    coll.insert(document, (err, result) => {
        assert.equal(err, null);

        console.log('Inserted ' + result.result.n + ' documents into the collection ' + collection);
        callback(result);
    });
}

//find all documents in a particular collection
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);

    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    });
}

//remove a particular document from a collection
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    coll.deleteOne(document, (err, result) => { //to delete the first document in our collection
        assert.equal(err, null);

        console.log('Removed the document ', document)
        callback(result);
    });
}

//updating the document in a particualr collection
//the document to be updated(2nd parameter) can be any chosen based on any of its field
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    coll.updateOne(document, { $set: update }, null, (err, docs) => { 
        assert.equal(err, null);

        console.log('Updating the document with ', update)
        callback(result);
    })
}

*/

/*USING PROMISES FOR THE COMMENTED PROGRAMS ABOVE AND SO I WILL REMOVE THE CALLBACK FUNCTION*/ 
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection); //where coll is just a variable that points to the 

    return coll.insert(document); //returns a promise
};

//find all documents in a particular collection
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);

    return coll.find({}).toArray(); //returns a promise that will resolve all the document in the specified collection and store them in an array
};

//remove a particular document from a collection
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    return coll.deleteOne(document); //returns a promise
};

//updating the document in a particualr collection
//the document to be updated(2nd parameter) can be any chosen based on any of its field
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    return coll.updateOne(document, { $set: update }, null); //returns a promise
};
