import { useContext } from "react"
import { GameContext, sendRoom } from "../contexts/GameContext"

export default function RoomPage() {
    const { state: { me, roomData } } = useContext(GameContext)

    return (
        <div>
            <p>Sala: {me.room}</p>
            {
                roomData
                    ? (
                        <h3>{roomData}</h3>
                    )
                    : (
                        <h3>Mensagem aqui</h3>
                    )
            }
            <button
                onClick={() => sendRoom(me.room, { message: `Eu sou o ${me.id} estou na SALA:: ${me.room}` })}
            >
                Enviar
            </button>
        </div>
    )
}