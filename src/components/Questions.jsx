import { useState } from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

export default function Question({ data, fetchData, category, setGameStart }) {
	const [completed, setCompleted] = useState(false)
	const [alert, setAlert] = useState(false)
	const [score, setScore] = useState()
	const [gameEnd, setGameEnd] = useState(false)
	const [randomNumber] = useState(Math.random());
	const [userSelections, setUserSelections] = useState({
		question0: "",
		question1: "",
		question2: "",
		question3: "",
		question4: "",
	})
	const [btnState, setBtnState] = useState(false)

	let categoryName
	switch (category.category) {
		case "10":
			categoryName = "Books";
			break;
		case "11":
			categoryName = "Film";
			break;
		case "12":
			categoryName = "Music";
			break;
		case "14":
			categoryName = "Television";
			break;
		case "21":
			categoryName = "Sports";
			break;
		case "26":
			categoryName = "Celebrities";
			break;
	}

	function handleSelection(event) {
		const {name, value} = event.target

		setUserSelections(prevSelection => {
			return {
				...prevSelection,
				[name]: value
			}
		})
	}

	function checkAnswers() {
		const validAnswers = Object.values(userSelections).filter(value => value !== "")
		
		setAlert(true)
		if (validAnswers.length === 5) {
			setCompleted(true)
			setBtnState(true)
			setScore(document.querySelectorAll(".true.checked").length)
			setGameEnd(true)
		} 
	}

	function newGame() {
		fetchData()
		setCompleted(false)
		setScore(0)
		setGameEnd(false)
		setAlert(false)
		setBtnState(false)
	}

	let activateClasses = btnState ? 'active' : ""

	const renderQuestionBlocks = data.map(({question, correct_answer, incorrect_answers}, questionIndex) => {
		const allAnswers = [...incorrect_answers, correct_answer].sort((a, b) => 0.5 - randomNumber)
		data.uniqueQuestionId = nanoid()

		return (
			<form className={`question--container question${questionIndex}`} key={data.uniqueQuestionId}>
				<p className="question">{question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&Uuml;/g, "Ü").replace(/&uuml;/g, "ü").replace(/&eacute;/g, "é").replace(/&Eacute;/g, "É")}</p>
				<div className="choices--container">
					
				{allAnswers.map((answer, answerIndex) => {
					data[questionIndex].uniqueAnswerId = nanoid()

					return (
					<div 
						key={data[questionIndex].uniqueAnswerId}
						className={`choice--container question${questionIndex}`}
					>
						<input 
							type="radio"
							name={`question${questionIndex}`}
							id={`question${questionIndex}option${answerIndex}`}
							value={answer}
							checked={userSelections[`question${questionIndex}`] === answer}
							onChange={handleSelection}
						/>
						<label 
							className={`choiceLabel ${activateClasses} ${userSelections[`question${questionIndex}`] === answer ? "checked" : ""} ${correct_answer === answer ? "true" : "false"}`} 
							htmlFor={`question${questionIndex}option${answerIndex}`}>
								{answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&Uuml;/g, "Ü").replace(/&uuml;/g, "ü").replace(/&eacute;/g, "é").replace(/&Eacute;/g, "É")}
						</label>
					</div>
					)
				})}	
				</div>			
			</form>
		)
	})
	
	return (
		<>
			<div className="quiz--container">
				<h2 className="category--name">Category: <span>{categoryName}</span></h2>
				{renderQuestionBlocks}
			</div>
			{
			gameEnd 
			?
			<div>
				<button onClick={newGame}>New game</button>
				<button onClick={() => setGameStart(false)} className="change-cat--button">Change category</button>
			</div> 
			:
			<button onClick={checkAnswers}>Check answers</button>
			}
			
			{
			alert && completed ?
				<div className="modal">	
					<FontAwesomeIcon icon={faTrophy} className="trophy"/>
					<p className="alert">
						You scored {score}/5 questions
					</p>
				</div>
			:
			alert && !completed &&
				<p className="alert">Please answer all the questions</p>
			}
			
		</>
	)
}