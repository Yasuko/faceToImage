import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gpo from './pages/Gpo'
import './index.css'
import './styles/app.css'
import './styles/search.css'
import './styles/gyaruno_panty.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Gpo page="" /> }></Route>
    </Routes>
  </BrowserRouter>
)
