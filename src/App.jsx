import { useState, useEffect } from 'react'
import './App.css'
import Questions from './components/Questions'

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
		<img className="yellowblob" src="/src/assets/yellowblob.svg" alt="" />
		<img className="blueblob" src="/src/assets/blueblob.svg" alt="" />
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
