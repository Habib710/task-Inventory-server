const express = require('express');
const cors = require('cors');
const port=process.env.PORT || 5000 ;
const app=express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middelware
app.use(cors());
app.use(express.json());

// user : task-server-inventory
// pass : 1w07kNHsn8hl8014


const uri = "mongodb+srv://task-server-inventory:1w07kNHsn8hl8014@cluster0.tgg5a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const mycollection = client.db("Task-server").collection("AllData");

    // get all.........

        app.get('/items',async(req,res)=>{

            const query = {};
            const cursor = mycollection.find(query);
            const Allitems= await cursor.toArray();
            res.send(Allitems);
          });

    //  get one with id.................

          app.get('/items/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const item=await mycollection.findOne(query);
            res.send(item);
    
    
          });

     // delete  one with id ..............................

      app.delete('/items/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const item=await mycollection.deleteOne(query);
        res.send(item)
    });

     //   post  or add new ................

        app.post('/items',async(req,res)=>{
            const additems=req.body;
            
              const result= await mycollection.insertOne(additems);
              res.send(result)
    
          });

          // update.........................

      app.put('/items/:id',async(req,res)=>{
        const id=req.params.id;  
        const updateitem=req.body;
        const query={_id:ObjectId(id)};
       
        newitem={
          $set: {
            price:updateitem.updated.price ,
            quantity:updateitem.updated.quantity ,
            name:updateitem.updated.name ,
          }
        };
        
        const update=await mycollection.updateMany(query,newitem);
        res.send(update);


      });
    }

    finally{


    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })