import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { answerQuestion, next, previous } from '../app/todoSlice';
import './Quiz.css'

/**
 * 
 * @param {Array} array 
 * @returns {[string]}
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export default function Quiz() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [options, setOptions] = useState([])

  const { index, questions } = useSelector(state => state.quiz)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOptionChange = (e) => {
    setAnswer(e.target.value)
    dispatch(answerQuestion({ index, answer: e.target.value }))
  }

  useEffect(() => {
    if (questions.length === 0) return navigate('/')
    let shuffled = shuffleArray([...questions[index].options])

    setAnswer(questions[index].answer)
    setQuestion(questions[index].question)
    setOptions(shuffled)
  }, [index])

  return (
    <div className='quiz'>
      <div className="quiz-container">
        <h3>Question {index + 1}</h3>

        <p>{question}</p>

        <div className="radio-group">
          {options?.map((option, idx) => (
            <div key={idx} className="option">
              <input
                type="radio"
                name="option"
                value={option}
                id={option}
                checked={answer === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>

        <div className="nav-container">
          <button className="nav-btn" onClick={() => dispatch(previous())} disabled={index === 0}>
            Prev
          </button>
          {index === questions.length - 1 ? (
            <button className="nav-btn" onClick={() => navigate('/result')} disabled={!answer}>
              Submit
            </button>
          ) : (
            <button className="nav-btn" onClick={() => dispatch(next())} disabled={!answer}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
