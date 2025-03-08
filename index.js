import express from 'express'
import {createServer} from 'node:http'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io'; 


const app = express ();
const server = createServer (app);
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))
const indexPath = join (__dirname, 'index.html') 


app.get('/', (req, res) => {
    res.sendFile(indexPath)
})

io.on ('connection', (socket) => {
    console.log ('login realizado sucesso' + socket.id )

    socket.on ("chat message", (text) =>{
         console.log ("recebeu mensagem: " + text)
         io.emit ("chat message", text)
    })

})

server.listen(3000, () => {
    console.log ('server rotate porta 3000')
})

