import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chessboard from "chessboardjsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Chessboard position={"start"}></Chessboard>
    </div>
  )
}

export default App
