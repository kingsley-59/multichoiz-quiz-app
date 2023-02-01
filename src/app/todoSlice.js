import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    index: 0,
    questions: [],
    issue: '',
    score: 0
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload
        },
        next(state) {
            if (state.index >= state.questions.length - 1) return;
            if (!state.questions[state.index].answer) return;
            console.log('next...')
            state.index += 1
        },
        previous(state) {
            if (state.index <= 0) return;
            console.log('previous...')
            state.index -= 1
        },
        goTo(state, action) {
            state.index = action.payload
        },
        answerQuestion(state, action) {
            const { index, answer } = action.payload
            console.log({ index, answer })
            state.questions[index].answer = answer
            if (answer === state.questions[index].correct_answer) {
                state.score += 1
                console.log('correct!')
            } else console.log('wrong.')
        },
        resetQuiz(state) {
            state.index = 0
            state.questions = []
            state.issue = ''
        }
    }
})

export const { setQuestions, next, previous, goTo, answerQuestion, resetQuiz } = quizSlice.actions

export default quizSlice.reducer