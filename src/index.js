import "dotenv/config"
import express from "express";
import {produtosRouter, criador} from "./routes/produtosRouter.js";
import { usuariosRouter } from "./routes/usuariosRouter.js";
import cors from "cors"
const app = express()

const port = process.env.PORT || 8081

app.use(express.json())
app.use(cors({origin: "*"}))
app.use(produtosRouter)
app.use(usuariosRouter)

app.get('/', (req,res) => {
    res.send('ola')
    console.log(criador)
})

// app.get('/service', (req,res) => {
//     firebase.
// })



app.listen(port, () => {
    console.log("SERVIDOR RODANDO!" + port)
})