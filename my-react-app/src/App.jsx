import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Buy from './pages/Buy.jsx'
import Sell from './pages/Sell.jsx'
import About from './pages/About.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
export default App;