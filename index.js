const express=require("express");
const cors=require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app=express();
const port=5000;

 



// middleware

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xq8ej.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 

 

async function run(){

    try{
        await client.connect();
        const database=client.db('randomUsers');
        const usersCollection=database.collection('users');
       

       

        app.get('/', async (req,res)=>{
         
             res.send("Hello World");
                });


            // POST API


       app.post('/addUser',async(req,res)=>{
                
                const result=await usersCollection.insertOne(req.body);
                 res.send(result.acknowledged)
                 
        });

        // Get Method 

        app.get('/users',async (req,res)=>{
            const result=await usersCollection.find({}).toArray();
            console.log(result)
            res.send(result);
        })

      // DELETE API

      app.delete('/users/:id', async(req,res) =>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const result=await usersCollection.deleteOne(query);
        res.json(result);
    })


 


    }
    finally{

    }

}

run().catch(console.dir);





 


 app.listen(port,()=>{
     console.log('server running at port',port)
 })
