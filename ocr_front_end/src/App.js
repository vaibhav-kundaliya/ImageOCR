import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FileCapturePage from './pages/FileCapturePage'
import TextExtractedPage from './pages/TextExtractedPage'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<FileCapturePage />} />
            <Route path="/text-extraction" element={<TextExtractedPage />} />
        </Routes>
      </Router>
    </div>
  )
}
