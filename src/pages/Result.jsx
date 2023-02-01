import './Result.css'
import { useDispatch, useSelector } from 'react-redux'
import { goTo } from '../app/todoSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Result() {
  const { questions, score } = useSelector(state => state.quiz)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToQuestion = (num) => {
    dispatch(goTo(num))
    navigate('/quiz')
  }

  return (
    <div className='result'>
      <div className="result-container">
        <div className="result-heading">
          <div>
            <span className="heading">Results</span>
            <span className="small-text">(click any question to view full options)</span>
          </div>
          <button className="score">Score: {score} / {questions.length}</button>
        </div>

        {questions.map((item, idx) => (
          <div className="question-box" key={idx} onClick={() => goToQuestion(idx)}>
            <p>{idx + 1}. {item.question}</p>
            <p>
              Your Answer: <span className={item.answer === item.correct_answer ? 'success' : 'error'}>{item.answer}</span> <br />
              Correct Answer: <span className="correct-ans">{item.correct_answer}</span>
            </p>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="oops-message">
            <div>
              <span>Oops! Nothing went wrong.</span>
            </div>
            <div>
              <Link to={'/'}>
                <button>Go back to home</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
