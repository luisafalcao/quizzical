import { useState, useEffect } from 'react'
import Questions from './components/Questions'
import yellowBlob from "./assets/yellowblob.svg"
import blueBlob from "./assets/blueblob.svg"
import './App.css'

function App() {
	const [gameStart, setGameStart] = useState(false)
	const [data, setData] = useState([])

	function startQuiz() {
		setGameStart(true)
	}

	function fetchData() {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
			.then(response => response.json())
			.then(data => setData(Object.values(data)[1]))
	}

	useEffect(() => { // fetch data from API and save it on the data state
		fetchData()
	}, [])  

	return (
		<>
		<img className="yellowblob" src={yellowBlob} alt="" />
		<img className="blueblob" src={blueBlob} alt="" />
		<main className="container">
			{!gameStart ? 
			(<section className="starter--container">
				<h1>Quizzical</h1>
				<button onClick={startQuiz}>Start quiz</button>
			</section>) :
			<Questions 
				data={data}
				fetchData={fetchData}
			/>
			}
		</main>
		</>
	)
}

export default App
