import { useState, useEffect } from 'react'
import { Board } from "./board.jsx"
import './App.css'

function shuffle(array) {
    return array.map(value => ({value, sort: Math.random()}))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
}


function App() {
  const [berryList, setBerryList] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  function handleClick(id) {
    let clickedAlready = false
    setBerryList(prevList => {
      let newList = prevList.map(berry => {
        if (berry.id === id) {
          if (berry.clicked) {
            clickedAlready = true
            return berry
          } else {
            return {...berry, clicked: true}
          }
        } else {
          return berry
        }
      })

      if (clickedAlready) {
        newList = newList.map(berry => ({...berry, clicked: false}))
        score > highScore ? setHighScore(score) : setHighScore(highScore)
        setScore(0)
      } else {
        setScore(prev => prev + 1)
        score >= highScore ? setHighScore(score) : setHighScore(highScore)
      }

      return shuffle(newList)
    })
  }

  useEffect(() => {
    async function loadBerries() {
      const berries = []
      for (let i = 1; i < 11; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/berry/${i}/`)
        const data = await res.json()
        berries.push({name: data.name, id: data.id, clicked: false})
      }
    setBerryList(shuffle(berries))
    }

    loadBerries()
  }, [])

  useEffect(() => {
    setHighScore(score > highScore ? score : highScore)
  }, [score])
  return (
    <>
      <div className='title large'>Pokemon Berry Memory Game</div>
      <Board list={ berryList } handleClick={handleClick}></Board>
      <div className='score'>
        <div className='text medium'>Score: {score}</div>
        <div className='text medium'>High Score: {highScore}</div>
      </div>
    </>
  )
}

export default App
