import sqlite3 from "sqlite3";

const db=new sqlite3.Database("db.sqlite",(err)=>{
  if(err){
    console.log(err.message);
  }
  else{
    console.log("Connected to database!!");
    db.run(`CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        prev TEXT DEFAULT NULL,
        curr TEXT,
        next TEXT DEFAULT NULL,
        balance REAL,
        amount REAL,
        type TEXT
      )`,(err)=>{
        if(err){
          console.log(err.message);
        }
        else{
          console.log("Successfully created Table transactions");
        }
      });
  }
});
export default db;