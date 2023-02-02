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
  const { questions } = useSelector(state => state.quiz)
  const auth = useSelector(state => state.auth)
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

    if (questions.length === 0) fetchQuestions()
    console.log(auth.isLoggedIn)
  }, [questions])
  return (
    <div className='home'>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
      }}>
        {!auth.isLoggedIn && (
          <>
            <h3>You are not yet logged in</h3>
            <p>Please <Link to='/login'>login</Link> to continue the game.</p>
          </>
        )}
        <button className="start-quiz" onClick={startQuiz} disabled={!auth.isLoggedIn}>
          Start Quiz
        </button>
      </div>
    </div>
  )
}
