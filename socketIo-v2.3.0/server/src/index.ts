import http from 'http'
import express from 'express'
import socketIo from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketIo(server)

type User = {
    id?: string
}

let usersOnline: User[] = []

sockets.on('connection', socket => {
    console.log(`${socket.id} está conectado`)

    usersOnline.push({ id: `${socket.id}` })

    console.log(usersOnline)

    refreshUsers()

    socket.on('disconnect', () => {
        usersOnline = removeById(usersOnline, socket.id)
        refreshUsers()
    })
})

function refreshUsers() {
    sockets.emit('UsersOnline', usersOnline)
}

function removeById(array: User[], id: string) {
    return array.filter((element) => {
        return element.id !== id;
    })
}

server.listen(8080, () => console.log("Server running"))