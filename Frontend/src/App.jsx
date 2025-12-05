import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'

function App() {
  return (
    <Router>
      <RootLayout />
    </Router>
  )
}

export default App