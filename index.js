import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import * as controllers from "./src/controllers/index.js";
dotEnv.config();
const app=express();
app.use(express.json());
app.use(cors({origin:[`${process.env.FRONTEND_URL}`],credentials: true}));
app.get('/',(_req,res)=>{
    res.send(`PORT ${process.env.PORT} in good health`);
});

app.get('/transactions/:user',controllers.getTrans);
app.post('/mine',controllers.mine);
app.post('/send',controllers.send);
app.post('/user/add',controllers.create);
app.get('/user/read/:user',controllers.read);
// app.put('/user/update/:user',controllers.update);
// app.delete('/user/delete/:user',controllers.del);

app.listen(`${process.env.PORT}`,()=>{
    console.log(`PORT ${process.env.PORT} in good health`);
});