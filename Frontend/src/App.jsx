import { useState } from 'react'
import CreatePoll from './Pages/Create Poll/CreatePoll'
import SharePoll from './Pages/Share Poll/SharePoll'
import ResultPoll from './Pages/Result Poll/ResultPoll'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VibeNavbar from './Pages/Header/VibeNavbar';
import Protected from './Pages/Protected';

function App() {


  return (
    <>

      <Router>
        <VibeNavbar />
        <Routes>
          {/* <Route element={<VibeNavbar />} /> */}
          <Route path="/" element={<Protected />} />
          <Route path="poll/create" element={
            <Protected>
              <CreatePoll />
            </Protected>
          } />
          <Route path="/poll/:poll_id" element={<SharePoll />} />
          <Route path="/poll/:poll_id/result" element={<ResultPoll />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
