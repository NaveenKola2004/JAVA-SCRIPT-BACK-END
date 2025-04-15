// Database connection 
require('dotenv').config();
const mysql=require('mysql2');
const express=require('express');
const connection=mysql.createConnection({
    host:process.env.DB_HOST, //Here we can pust our host
    user:process.env.DB_USER, //Here we can put our user
    password:process.env.DB_PASSWORD, //Here we can put our mysql password
    database:process.env.DB_NAME //Here we can put our database name 
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("Database connected sucessfully");
});