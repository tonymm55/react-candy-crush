const PORT = 8000
const axios = require("axios")
const express = require("express")
const cors = require("cors")
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('this is our backend and works a treat')
})


//get all the game scores
app.get('/scores', (req, res) => {

    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': process.env.ASTRA_TOKEN
        }
    }
    axios(`${process.env.URL}?page-size=10`, options)
      .then(response => res.status(200).json(response.data))
      .catch(err => res.status(500).json({message: err}))
})

app.post('/addscore', (req, res) => {
    const bodyContent = req.body
    // const testData = {
    //     username: 'John',
    //     score: 250
    // }

    const options = {
        method: 'POST',
        headers: {
            Accepts: 'application/json', 
            'X-Cassandra-Token': process.env.ASTRA_TOKEN,
            'Content-Type': 'application/json'
        },
        // data: testData removed the hard coded test data and replaced with content of body
        data: bodyContent
    }
    axios(process.env.URL, options)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({message: err}))
})

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))