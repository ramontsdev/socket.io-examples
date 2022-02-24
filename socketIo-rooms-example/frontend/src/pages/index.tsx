import { useContext, useEffect } from 'react';
import { createRoom, GameContext, joinRoom } from '../contexts/GameContext';
import { useRouter } from 'next/router';
import styles from '../styles/home.module.css';

export default function Home() {
  const router = useRouter()

  function preJoinRoom() {
    const roomName = (document.getElementById('room-name') as HTMLInputElement).value
    joinRoom(roomName)
  }

  const { state: { playersOnline, me, rooms } } = useContext(GameContext)
  useEffect(() => {
    if (me.room) {
      router.push('room-page')
    }
  }, [me])

  return (
    <div className={styles.container}>
      <div className={styles.rooms}>
        <h3>Salas</h3>
        {
          rooms.map((room, index) => (
            <>
              <span key={index}>{room.id}</span>
              <ul>
                <li>{room.player1}</li>
                <li>{room.player2}</li>
              </ul>
              <button onClick={() => joinRoom(room.id)}>
                Entrar na sala
              </button>
            </>
          ))
        }
      </div>
      <div className={styles.playersOnline}>
        <h3>Players Online</h3>
        <button
          onClick={!me?.room && createRoom}
          disabled={me?.room && true}
        >
          Criar Sala
        </button>
        {
          playersOnline.map((player, index) => (
            <span key={index} >{player.id}</span>
          ))
        }
        <input
          type="text"
          id="room-name"
        />
        <button
          onClick={preJoinRoom}
        >
          Entrar na sala
        </button>
      </div>
    </div>
  )
}
