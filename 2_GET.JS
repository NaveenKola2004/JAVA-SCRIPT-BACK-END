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
    console.log("database connected");
});

const app=express();
app.use(express.json());
//GET REQUEST
app.get("/data",(req,res)=>{
    connection.query("select * from college",(err,result)=>{
        if (err){
            return res.status(404).json({message : "Faild to get the data"});
        }
        res.status(200).json(result);
    });
});

app.listen(5000,()=>{
    console.log("Server is running")
})