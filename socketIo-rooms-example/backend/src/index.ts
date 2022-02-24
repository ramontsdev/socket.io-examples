import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer()
const sockets = new Server(server)


type PlayerOnline = {
    id: string
    room: string | undefined
}
type Room = {
    id: string
    player1: string | undefined
    player2: string | undefined
}
const rooms: Array<Room> = []
const playersOnline: Array<PlayerOnline> = []

sockets.on('connection', (socket) => {
    console.log(`O socket ${socket.id} está conectado`)

    const playerOnline: PlayerOnline = {
        id: socket.id,
        room: undefined
    }

    playersOnline.push(playerOnline)
    sockets.emit('PlayersOnline', playersOnline)
    sockets.emit('Rooms', rooms)
    socket.emit('Me', playerOnline)

    socket.on('CreateRoom', () => {
        const roomName = `${socket.id.substr(3, 3)}`//substr() para pegar as três primeiras letras
        //a partir da posição 3 pegar as 3 próximas letras

        socket.join(roomName)

        playersOnline.forEach((player, index) => {
            if (player.id === socket.id) {
                player.room = roomName
                socket.emit('Me', player)
            }
        })
    })

    socket.on('JoinRoom', (roomID) => {
        console.log(roomID)
        socket.join(roomID)
        playersOnline.forEach((player, index) => {
            if (player.id === socket.id) {
                player.room = roomID
                socket.emit('Me', player)
            }
        })
    })

    socket.on('SendRoom', (data) => {
        console.log(data)
        //socket.to(data.roomID).emit('ReceivedRoomData', data.data.message) //enviando para todos na sala (room) 'game', com exceção do remetente
        sockets.in(data.roomID).emit('ReceivedRoomData', data.data.message) // enviando para todos na sala (room) 'game', incluindo o remetente
    })

    socket.on('disconnect', () => {
        playersOnline.forEach((player, index) => {
            if (player.id === socket.id) {
                playersOnline.splice(index, 1)
                sockets.emit('PlayersOnline', playersOnline)
            }
        })
    })
})


const PORT = process.env.PORT || 7000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))