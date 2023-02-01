import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import { useSelector, useDispatch } from 'react-redux'
import { setQuestions } from '../app/todoSlice'

function formatQuestions(questions = []) {
  let formatted = questions.map(question => {
    return { ...question, options: [...question.incorrect_answers, question.correct_answer], answer: '' }
  })
  return formatted
}

export default function Home() {
  const navigate = useNavigate()
  const { questions } = useSelector((state) => state.quiz)
  const dispatch = useDispatch()

  const startQuiz = () => {
    if (!Array.isArray(questions) && questions.length === 0) alert('No questions available, please refresh page.')
    navigate('/quiz')   
  }

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
        const data = await res.json()
        const results = data?.results ?? []
        let questions = formatQuestions(results)
        dispatch(setQuestions(questions))
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuestions()
  }, [])
  return (
    <div className='home'>
      <button className="start-quiz" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  )
}
