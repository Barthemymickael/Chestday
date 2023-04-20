import { useState } from 'react'

import './App.css'
// @ts-ignore
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
