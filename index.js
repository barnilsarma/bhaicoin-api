import express from "express";
import dotEnv from "dotenv";
import * as controllers from "./src/controllers/index.js";
dotEnv.config();
const app=express();
app.use(express.json());
app.get('/',(_req,res)=>{
    res.send(`PORT ${process.env.PORT} in good health`);
});

app.get('/transactions',controllers.getTrans);
app.post('/mine',controllers.mine);
app.post('/send',controllers.send);
app.listen(`${process.env.PORT}`,()=>{
    console.log(`PORT ${process.env.PORT} in good health`);
});