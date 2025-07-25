import express from "express";
import firebase from '../firebase/app.js'
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";

const usuariosRouter = express.Router();
const storage = getStorage(firebase)
const db = getFirestore(firebase);


// PUXA TODOS OS usuarios
usuariosRouter.get("/usuarios", async (req, res) => {
    try {
        const documents = await db.collection("usuarios").get();
        const usuarios = []
        documents.forEach(doc => usuarios.push (doc.data()))
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: `ERRO INTERO ${error}` });
    }
});


// PUXA DADOS APARTIR DE UM ID
usuariosRouter.get("/usuarios/:id", async (req, res) => {
    try{
        const id = req.params.id
        const doc = await db.collection('usuarios').doc(id).get()
        const usuario = doc.data()
    
        if(usuario) {
            return res.status(200).json(usuario)
        } else {
            return res.status(400).json({ msg: "usuario NÃO ENCONTRADO!" })
        }
    } catch(err) {
        console.log(`ACONTECEU UM ERRO ${err}`)
    }
});


// INSERE OS DADOS DENTRO DE UMA LISTA
usuariosRouter.post("/usuarios", async (req, res) => {
    try {
        
        const usuario = req.body;
        await db.collection("usuarios").add(usuario)

        getAuth()
            .createUser({
                email: req.body.email,
                emailVerified: false,
                phoneNumber: `+ ${req.body.numero}`,
                password: 'secretPassword',
                displayName: 'John Doe',
                photoURL: 'http://www.example.com/12345678/photo.png',
                disabled: false,
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
            });

        return res.status(201).json({ msg: "usuario cadastrado." });
    } catch (error) {
        console.log(`erro ${error}`)
    }
});

usuariosRouter.put("/usuarios/:id", async (req,res) => {
    try {
        
        const id = req.params.id
        const dadosusuario = req.body
        const doc = await db.collection("usuarios").doc(id).get()
    
        if(doc.exists){
            await db.collection("usuarios").doc(id).update(dadosusuario)
            return res.status(200).json({ msg: 'usuario atualizado com sucesso!' })
        } else{
            return res.status(400).json({ msg: 'NÃO FOI !' })
    
        }
    } catch (error) {
        console.log(`erro ${error}`)
    }

})

usuariosRouter.delete('/usuarios/:id', async (req,res) => {
    try {
        const id = req.params.id
        const docRef = db.collection("usuarios").doc(id)
        const doc = await docRef.get()
    
        if(doc.exists) {
            await docRef.delete()
            return res.status(200).json({ msg: 'usuario EXCLUÍDO COM SUCESSO!' })
        } else {
            return res.status(404).json({ msg: 'usuario NÃO ENCTRADO PARA SER EXCLUIDO!' })
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
    usuariosRouter
}