// config inicial/ instancia do express
const express = require('express')
const app = express()

//config prisma
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


// config p aceitar json
app.use(express.json())


app.get("/", (req,res) => {
    return res.send("Hello World")
})

// rota post p receber dados
app.post("/form", async (req,res) => {
    const {nome, email, senha} = req.body

    await prisma.usuario.create({
        data: {
            nome,
            email,
            senha
        }
    })
    return res.status(201).send("Usuario criado com sucesso")
})

// listagem de usuarios
app.get("/usuarios", async(req,res) => {
    const usuarios = await prisma.usuario.findMany()

    return res.status(200).send(usuarios)
})

// inicia servidor
app.listen(process.env.NODE_PORT || 3030,() => {
    console.log("Server is running")
});