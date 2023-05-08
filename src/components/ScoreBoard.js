import axios from "axios";
import {useEffect, useState} from "react";
import "../scoreboard.css"

const ScoreBoard = ({ score }) => {
  const [gameStates, setGameStates] = useState(null);
  const [userName, setUserName] = useState("");
  
  const fetchData = async () => {
    const response = await axios.get('https://arcade-backend.onrender.com/scoreboard/flappy')
    console.log(response.data)
    const data = Object.keys(response.data).map(item => response.data[item])
    setGameStates(data)
  }
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

  useEffect(() => {fetchData()}, []);

    const descendingGameStates = gameStates?.sort((a, b) => b.score - a.score)
    const topTenGameStates = descendingGameStates?.slice(0, 10)
    console.log(userName)

  return (
    <div className="score-board">
      <h2>Player Name:</h2>
      <input
        type="text"
        id="name-input"
        placeholder="Enter your name"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        />
      <h2>Score: {score} </h2>

      <h3>High Scores: </h3>

      {topTenGameStates?.map((gameState, index) => (
        <div class="top-ten-scores" key={index}>
          <h4>{gameState.name}: {gameState.score}</h4>
        </div>
      ))}

      <button onClick={saveData}>Submit Score</button>
    </div>
  )
}

export default ScoreBoard