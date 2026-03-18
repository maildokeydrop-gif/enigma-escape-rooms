import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomsPage from './pages/RoomsPage'
import GamePage from './pages/GamePage'
import VictoryPage from './pages/VictoryPage'
import Nav from './components/Nav'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/komnaty" element={<RoomsPage />} />
        <Route path="/gra/:roomId" element={<GamePage />} />
        <Route path="/zwyciestwo/:roomId" element={<VictoryPage />} />
      </Routes>
    </>
  )
}
