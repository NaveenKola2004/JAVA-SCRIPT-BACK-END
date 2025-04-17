// This is miniproject of sudent data modification
// I am using the single marks column only in this we can use the multiple marks and subject wise use

require('dotenv').config();
const mysql =require('mysql2');
const express=require('express');
const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

connection.connect((err)=>{
    if (err) return err;
    console.log(" DATABASE CONNECTED SUCESSFULLY")
});

const app=express();
app.use(express.json())
app.get("/data",(req,res)=>{
    connection.query("select * from college",(err,result)=>{
        if (err){
            return res.status(404).json({message : "Faild to get the data"});
        }
        res.status(200).json(result);
    });
});

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
    console.log("Server is running")
});