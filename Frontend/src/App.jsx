import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import Hero from "./components/Hero"
import "./App.css"


const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}>
        <Route index element={<Hero/>}/>
        <Route path="/chat" element={<Chat/>}/>
    </Route>
    
  </Routes>
  </BrowserRouter>
)

export default App