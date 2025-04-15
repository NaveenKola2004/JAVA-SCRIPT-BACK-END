require('dotenv').config();
const mysql=require('mysql2');
const express=require('express');
const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("Database Connected");
});

const app=express();
app.use(express.json());

//POST REQUEST

app.post("/postdata",(req,res)=>{
    const {id,name,mark,grade}=req.body;
    if (!id||!name||!mark||!grade){
        return res.status(400).json({message : "Need the all data"});
    };
    connection.query("insert into college(id,name,mark,grade) values(?,?,?,?)",[id,name,mark,grade],(err,result)=>{
        if (err){
            return res.status(404).json({message : "Faild to insert data"});
        }
        res.status(200).json({message : "Sucessfully inserted data"});
    });
});
app.listen(5000,()=>{
    console.log("Server is running")
})