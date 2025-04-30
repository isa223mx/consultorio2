import express, { Router } from 'express';
import { signosRoutes } from './routes/index.js';
 
const app = express();
const port = process.env.PORT || 402;
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("productos corriendo " + port);
});

app.use("/signos-vitales",signosRoutes
);

app.listen(port,()=>{
  console.log("Mi primer Servicio de Productos!",port);
});