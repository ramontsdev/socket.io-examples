import { useEffect, useState } from 'react'
import socketIoClient from 'socket.io-client'
import styles from '../styles/Home.module.css'

type User = {
  id?: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const socket = socketIoClient('http://localhost:8080')

    socket.on('connect', () => {
      console.log("Conectado")
    })

    socket.on('UsersOnline', (users: User[]) => {
      setUsers(users)
      console.log(users)
    })

  }, [])
  return (
    <div className={styles.container}>
      {
        users.map(key => ((
          <div key={key.id}>
            <p>{key.id}</p>
          </div>
        )
        ))
      }
    </div>
  )
}
