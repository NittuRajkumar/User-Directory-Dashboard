import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import UserDetail from './pages/UserDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App
