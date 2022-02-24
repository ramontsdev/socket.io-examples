import { GameContextProvider } from '../contexts/GameContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  )
}

export default MyApp
