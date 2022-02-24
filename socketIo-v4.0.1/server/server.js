import http from 'http'
import * as socketIo from 'socket.io'

const server = http.createServer()
const io = new socketIo.Server(server)

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)
})

server.listen(8080)