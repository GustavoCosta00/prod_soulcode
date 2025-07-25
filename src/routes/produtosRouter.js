import express from "express";
import firebase from '../firebase/app.js'
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage";
import { findAll } from "../services/produtosService.js";
const produtosRouter = express.Router();
const storage = getStorage(firebase)
const db = getFirestore(firebase);


// PUXA TODOS OS PRODUTOS
produtosRouter.get("/produtos", async (req, res) => {
    try {
        const produtos = await findAll()
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ msg: `ERRO INTERO ${error}` });
    }
});


// PUXA DADOS APARTIR DE UM ID
produtosRouter.get("/produtos/:id", async (req, res) => {
    try{
        const id = req.params.id
        const doc = await db.collection('produtos').doc(id).get()
        const produto = doc.data()
    
        if(produto) {
            return res.status(200).json(produto)
        } else {
            return res.status(400).json({ msg: "PRODUTO NÃO ENCONTRADO!" })
        }
    } catch(err) {
        console.log(`ACONTECEU UM ERRO ${err}`)
    }
});


// INSERE OS DADOS DENTRO DE UMA LISTA
produtosRouter.post("/produtos", async (req, res) => {
    try {
        
        const produto = req.body;
        await db.collection("produtos").add(produto)
        
        
        

        return res.status(201).json({ msg: "Produto cadastrado." });
        
    } catch (error) {
        console.log(`erro ${error}`)
    }
});

produtosRouter.put("/produtos/:id", async (req,res) => {
    try {
        
        const id = req.params.id
        const dadosProduto = req.body
        const doc = await db.collection("produtos").doc(id).get()
    
        if(doc.exists){
            await db.collection("produtos").doc(id).update(dadosProduto)
            return res.status(200).json({ msg: 'Produto atualizado com sucesso!' })
        } else{
            return res.status(400).json({ msg: 'NÃO FOI !' })
    
        }
    } catch (error) {
        console.log(`erro ${error}`)
    }

})

produtosRouter.delete('/produtos/:id', async (req,res) => {
    try {
        const id = req.params.id
        const docRef = db.collection("produtos").doc(id)
        const doc = await docRef.get()
    
        if(doc.exists) {
            await docRef.delete()
            return res.status(200).json({ msg: 'PRODUTO EXCLUÍDO COM SUCESSO!' })
        } else {
            return res.status(404).json({ msg: 'PRODUTO NÃO ENCTRADO PARA SER EXCLUIDO!' })
        }
        
    } catch (error) {
        console.log(`erro ${error}`)
    }

})



const criador = {
    nome: 'Gutavo Costa Franco de Almeida',
    apelido: 'Gu',
    uf: 'SP'
}

export {
    produtosRouter, criador
}