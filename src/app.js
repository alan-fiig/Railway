import express from "express";
import { createPool } from "mysql2/promise";

const pool=createPool({
    user:'root',
    password:'AFNc3hgap2SkO76yHwcW',
    host:'containers-us-west-77.railway.app',
    port:6311,
    database:'railway'
})

const app=express() 

app.get('/',(req,res)=>{
  res.send("Bienvenido a este servidor..")      
})

app.get('/usuarios',async (req,res)=>{
    const [result]=await pool.query('select * from usuario')
    res.json(result)      
}) 

app.get('/agregarusuario',async (req,res)=>{
    const nombre=req.query.nombre
    const contrasena=req.query.contrasena
    const correo=req.query.correo
    const tienda=req.query.tienda  
    const [result]=await pool.query(`INSERT INTO usuario (nombre, contrasena, correo, tienda) VALUES ('${nombre}', '${contrasena}', '${correo}','${tienda}')`)
    res.json(result[0])      
  })

app.get('/login', async (req,res)=>{
  const correo=req.query.correo
  const contrasena=req.query.contrasena
  const [result]=await pool.query(`select * from usuario where correo='${correo}' and contrasena='${contrasena}'`)
  res.send(result)
})

app.listen(process.env.PORT || 3000)
console.log("Servidor corriendo en el puerto 3000")
