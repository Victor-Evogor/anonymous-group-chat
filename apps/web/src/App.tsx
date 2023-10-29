import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChatHome } from './components/ChatHome'
import { Home } from './components/Home'
import { UserContextProvider } from './contexts/User'

function App() {
  return (
    <Router>
       <UserContextProvider>
      <Routes>
        <Route path="/chat-group" element={<ChatHome />} />
        <Route
          path="/"
          element={

              <Home />

          }
        />
      </Routes>
      </UserContextProvider>
    </Router>
  )
}

export default App
