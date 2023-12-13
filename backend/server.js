
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "",
        database : "singup"
    }
)

//This is post method
app.post('/singup' ,(req,res) => {
    const sql ="INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (error, data)=>{
        if(error){
            return res.json("Error");
        }
        return res.json(data);
    })
})

//This is login method 
app.post('/login' ,(req,res) => {
    const sql ="SELECT * FROM login WHERE `email` =?  AND `password` =?";
    db.query(sql, [  req.body.email, req.body.password], (error, data)=>{
        if(error){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.listen(8081,() => {
    console.log("listening on 8081");
})