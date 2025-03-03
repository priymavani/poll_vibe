import { useState } from 'react'
import CreatePoll from './Pages/Create Poll/CreatePoll'
import SharePoll from './Pages/Share Poll/SharePoll'
import ResultPoll from './Pages/Result Poll/ResultPoll'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>

      <Router>
        <Routes>

          {/* For Navbar */}
          {/* <Route element={<Revamp2 />}> */}
          <Route path="/create" element={<CreatePoll />} />
          <Route path="/poll/:poll_id" element={<SharePoll />} />
          <Route path="/poll/:poll_id/result" element={<ResultPoll />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
