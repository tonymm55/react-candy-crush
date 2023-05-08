import axios from "axios";
import {useEffect, useState} from "react";

//figure out a way to handle user name inputs here:

const UserNames = [
  "Anthony", 
  "Tarndeep",
  "Matthew",
  "PurpleFish",
  "SillySloth",
  "Malcolm-X",
  "Bill",
  "Lisa",
  "Reggie",
  "Ronald",
  "Charles3",
  "Rasputin",
  "Jason"
]
// http://localhost:8000/scores

const ScoreBoard = ({ score }) => {
  const [gameStates, setGameStates] = useState(null);
  const [userName, setUserName] = useState(null);
  // https://arcade-backend.onrender.com/scoreboard/flappy
  const fetchData = async () => {
    const response = await axios.get('https://arcade-backend.onrender.com/scoreboard/flappy')
    console.log(response.data)
    const data = Object.keys(response.data).map(item => response.data[item])
    setGameStates(data)
  }
  // 
  console.log(gameStates)

  const saveData = () => {

    const data = {
      name: userName,
      score: score
    }
    // 'http://localhost:8000/addscore'
    axios.post('https://arcade-backend.onrender.com/scoreboard/flappy/add', data)
      .then(response => console.log(response))
      .catch(err => {console.log(err)})
      .then(fetchData)
  }

  useEffect(() => {
    fetchData()
    setUserName(UserNames[Math.floor(Math.random() * UserNames.length)])
  }, []);

    const descendingGameStates = gameStates?.sort((a, b) => b.score - a.score)
    const topTenGameStates = descendingGameStates?.slice(0, 10)
    console.log(userName)

  return (
    <div className="score-board">
      <h2>Name: {userName} Score: {score}</h2>

      <h2>High Scores:</h2>
      {topTenGameStates?.map((gameState, index) => (
        <div key={index}>
          <h3>{gameState.name}: {gameState.score}</h3>
        </div>
      ))}


      <button onClick={saveData}>Submit Name & Score</button>
    </div>
  )
}

export default ScoreBoard