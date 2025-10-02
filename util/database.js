const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient;

let db;

const mongoConnect=(callback)=>{
  MongoClient.connect('mongodb+srv://harshit:Harshit123@cluster0.gtwe7ao.mongodb.net?retryWrites=true&w=majority&appName=Cluster0')
.then((client)=>{
  console.log("Connected")
  db=client.db()
  callback(client)
})
.catch((err)=>{
  console.error(err)
})
}

const getdb=()=>{
  if(db){
    return db
  }
  throw "No database found"
}

exports.mongoConnect=mongoConnect
exports.getdb=getdb

