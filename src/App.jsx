import { useState, useEffect } from 'react'
import Questions from './components/Questions'
import yellowBlob from "./assets/yellowblob.svg"
import blueBlob from "./assets/blueblob.svg"
import './App.css'

function App() {
	const [gameStart, setGameStart] = useState(false)
	const [data, setData] = useState([])
	const [category, setCategory] = useState({category: 0})
	const [disable, setDisable] = useState(true)

	function startQuiz() {
		setGameStart(true)
	}

	function chooseCategory(event) {
		const {name, value} = event.target

		setCategory({category: value})
		setDisable(false)
	}

	function fetchData() {
		fetch(`https://opentdb.com/api.php?amount=5&category=${category.category}&difficulty=easy&type=multiple`)
			.then(response => response.json())
			.then(data => setData(Object.values(data)[1]))
	}

	useEffect(() => { // fetch data from API and save it on the data state
		fetchData()
	}, [category])  

	return (
		<>
		<img className="yellowblob" src={yellowBlob} alt="" />
		<img className="blueblob" src={blueBlob} alt="" />
		<main className="container">
			{!gameStart ? 
			(<section className="starter--container">
				<h1>Quizzical</h1>
				<h3>Choose category:</h3>

				<div className="category--container">
					<input
						type="radio"
						id="books"
						name="category"
						value="10"
						checked={category.category === "10"}
						onChange={chooseCategory}
					/>
					<label
						className={`choiceLabel`}
						htmlFor="books">
							Books
					</label>
					<input
						type="radio"
						id="film"
						name="category"
						value="11"
						checked={category.category === "11"}
						onChange={chooseCategory}
					/>
					<label
						className={`choiceLabel`}
						htmlFor="film">
							Film
					</label>
					<input
						type="radio"
						id="music"
						name="category"
						value="12"
						checked={category.category === "12"}
						onChange={chooseCategory}
					/>
					<label
						className={`choiceLabel`}
						htmlFor="music">
							Music
					</label>
					<input
						type="radio"
						id="tv"
						name="category"
						value="14"
						checked={category.category === "14"}
						onChange={chooseCategory}
					/>
					<label
						className={`choiceLabel`}
						htmlFor="tv">
							TV
					</label>
					<input
						type="radio"
						id="sports"
						name="category"
						value="21"
						checked={category.category === "21"}
						onChange={chooseCategory}
					/>
					<label
						className={`choiceLabel`}
						htmlFor="sports">
							Sports
					</label>
					<input
						type="radio"
						id="celebrities"
						name="category"
						value="26"
						checked={category.category === "26"}
						onChange={chooseCategory}
					/>
					<label
						className={`choiceLabel`}
						htmlFor="celebrities">
							Celebrities
					</label>
				</div>

				<button onClick={startQuiz} disabled={disable} className={`${disable ? "disabled" : ""}`}>Start quiz</button>
			</section>) :
			<Questions 
				data={data}
				fetchData={fetchData}
				category={category}
				setGameStart={setGameStart}
			/>
			}
		</main>
		</>
	)
}

export default App
