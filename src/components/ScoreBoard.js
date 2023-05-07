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


const ScoreBoard = ({ score }) => {
  const [gameStates, setGameStates] = useState(null);
  const [userName, setUserName] = useState(null);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/scores')
    const data = Object.keys(response.data.data).map(item => response.data.data[item])
    setGameStates(data)
  }

  console.log(gameStates)

  const saveData = () => {

    const data = {
      username: userName,
      score: score
    }

    axios.post('http://localhost:8000/addscore', data)
      .then(response => console.log(response))
      .catch(err => {console.log(err)})
      .then(fetchData)
  }

  useEffect(() => {
    fetchData()
    setUserName(UserNames[Math.floor(Math.random() * UserNames.length)])
  }, []);

    const descendingGameStates = gameStates?.sort((a, b) => b.score - a.score)
    console.log(userName)

  return (
    <div className="score-board">
      <h2>Name: {userName} Score: {score}</h2>

      <h2>High Scores:</h2>
      {descendingGameStates?.map((gameState, index) => (
        <div key={index}>
          <h3>{gameState.username}: {gameState.score}</h3>
        </div>
      ))}


      <button onClick={saveData}>SAVE SCORE</button>
    </div>
  )
}

export default ScoreBoard