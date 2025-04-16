require('dotenv').config();
const mysql=require('mysql2');
const express=require('express');
const connection =mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("Database connected sucessfully")
});

const app=express();
app.use(express.json());

app.put("/updatename/:id",(req,res)=>{
    const id=req.params.id;
    const {name}=req.body;
    if(!name){
        return res.status(400).json({message : `need the data of ${name}`});
    }
    connection.query("update college set name = ? where id = ?",[name,id],(err,result)=>{
        if (err){
            return res.status(500).json("faild")
        }
        if(result.affectedRows===0){
            return res.status(404).json({Message : `Faild to update the data of ${id}`})
        };
        res.status(200).json({message : `Sucessfully updated the data of ${id}`})
    });
});

app.put("/updatemark/:id",(req,res)=>{
    const id=req.params.id;
    const {mark,grade}=req.body;
    if(!mark||!grade){
        return res.status(400).json("need all data")
    }
    connection.query("update college set mark = ?,grade=? where id=?",[mark,grade,id],(err,result)=>{
        if (err) {
            return res.status(500).json("Faild to update data",Error);
        }
        if(result.affectedRows===0){
            return res.status(404).json("faild to update data in database")
        }
        res.status(200).json({Message :`Sucessfully updated the ${id} id's marks and grade`});
    });
});

app.listen(5000,()=>{
    console.log("Serever is running")
})