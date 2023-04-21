import { useState } from 'react'
import { io } from "socket.io-client";
import './App.css'
// @ts-ignore
import Chessboard from "chessboardjsx";

function App() {
  const [count, setCount] = useState(0)
  const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")



  const socket = io('http://localhost:8080', {
    transports: ['websocket']
  })

  socket.on('onChange',(event)=>{setPosition(event)})

  function handleDrop(e: any) {


    socket.emit('game',JSON.stringify({"fen": position, e}))



    // fetch('http://localhost:8080/game/test', requestOptions)
    //     .then(response => response.json())
    //     .then(res => setPosition(res))
    // console.log(e);
  }



  return (
    <div className="App">
        <Chessboard position={position} onDrop={handleDrop}/>
    </div>
  )
}

export default App
