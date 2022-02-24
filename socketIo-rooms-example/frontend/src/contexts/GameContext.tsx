import { createContext, ReactNode, useEffect, useReducer } from "react";
import socketIoClient, { Socket } from 'socket.io-client'

let socket: Socket

type Props = {
    children?: ReactNode
}
type GameContextType = {
    state: State
}
type Action = {
    type: string
    payload: any
}
type PlayerOnline = {
    id: string
    room: string | undefined
}
type Room = {
    id: string
    player1: string | undefined
    player2: string | undefined
}

type State = {
    isConnected: boolean
    playersOnline: Array<PlayerOnline>
    rooms: Array<Room>
    me: PlayerOnline
    roomData: string
}

export const GameContext = createContext({} as GameContextType)

const initialState: State = {
    isConnected: false,
    playersOnline: [],
    rooms: [],
    me: {} as PlayerOnline,
    roomData: ''
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'CONNECTED':
            console.log(`Conectado ${action.payload}`)
            return {
                ...state,
                isConnected: action.payload
            }
        case 'PlayersOnline':
            return {
                ...state,
                playersOnline: action.payload
            }
        case 'Me':
            return {
                ...state,
                me: action.payload
            }
        case 'Rooms':
            return {
                ...state,
                rooms: action.payload
            }
        case 'ReceivedRoomData':
            return {
                ...state,
                roomData: action.payload
            }
        default:
            return state
    }
}
export function GameContextProvider({ children }: Props) {

    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        socket = socketIoClient('http://192.168.100.64:7000', {
            transports: ["websocket"],
            autoConnect: false
        })
        socket.on('connect', () => {
            dispatch({ type: 'CONNECTED', payload: true })
        })
        socket.on('PlayersOnline', (playersOnline) => {
            dispatch({ type: 'PlayersOnline', payload: playersOnline })
        })
        socket.on('Rooms', (rooms) => {
            dispatch({ type: 'Rooms', payload: rooms })
        })
        socket.on('Me', (me) => {
            dispatch({ type: 'Me', payload: me })
        })
        socket.on('ReceivedRoomData', (roomData) => {
            dispatch({ type: 'ReceivedRoomData', payload: roomData })
        })
        socket.open()
    }, [])

    return (
        <GameContext.Provider
            value={{ state }}
        >
            {children}
        </GameContext.Provider>
    )
}
function createRoom() {
    socket.emit('CreateRoom')
}
function joinRoom(roomID: string) {
    socket.emit('JoinRoom', roomID)
}
function sendRoom(roomID: string, data: any) {
    socket.emit('SendRoom', { roomID: roomID, data })
}

export { createRoom, joinRoom, sendRoom }