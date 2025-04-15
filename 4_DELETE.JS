require('dotenv').config();
const mysql=require("mysql2");
const express=require("express");
const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("Database connected");
});


const app=express();
app.use(express.json());

//DELETE REQUEST
app.delete("/deletedata/:id",(req,res)=>{ //id throw delete the data
const id=req.params.id;
connection.query("delete from college where id = ?",[id],(err,result)=>{
    if (result.affectedRows===0){
        return res.status(404).json({message : `id ${id} not found`})
    }
    res.status(200).json({message : `Sucessfully deleted  ${id} data`});
});
});
//marks throw delete data 

app.delete("/delete/data/:mark",(req,res)=>{
    const mark=req.params.mark;
    connection.query("delete from college where mark = ?",mark,(err,result)=>{
        if(result.affectedRows===0){
            return res.status(404).json({message : `${mark} marks no one have `});
        }
        res.status(200).json({message : `Sucessfully deleted ${mark}'s data`})
    });
});

app.delete("/data/:name",(req,res)=>{
    const name=req.params.name;
    connection.query("delete from college where name=?",[String(name)],(err,result)=>{
        if(result.affectedRows===0){
            return res.status(404).json({message : `${name} data not found!` });
        }
        res.status(200).json({meaage : `Sucessfully deleted the data of ${name}`})
    });
});

app.listen(5000,()=>{
    console.log("Server is running")
})
