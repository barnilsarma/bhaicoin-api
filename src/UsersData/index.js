import sqlite3 from "sqlite3";

const users=new sqlite3.Database("users.sqlite",()=>{
    console.log("Database connected successfully");
    users.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT UNIQUE,
        email TEXT
      )`,(err)=>{
        if(err){
          console.log(err.message);
        }
        else{
          console.log("Successfully created Table users");
        }
      });
});

export default users;