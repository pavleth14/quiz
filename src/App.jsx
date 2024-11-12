import './App.css'
import OneQuestionAtTime from './components/OneQuestionAtTime'

function App() {

  const allQuestionsAndAnswers = [
    {
      question: 'What is capital of Serbia?',
      answers: ['Nis', 'Kragujevac', 'Beograd', 'Novi Sad'],
      correctAnswer: 'Beograd'
    },
    {
      question: 'What number is devidable by 3?',
      answers: ['2', '4', '6', '8'],
      correctAnswer: '6'
    },
    {
      question: 'Whuch motocycle is fastest?',
      answers: ['r1', 'gsxr 1000', 'cbr100rr', 'zx10r'],
      correctAnswer: 'zx10r'
    }
  ]  

  return (
    <>
      <OneQuestionAtTime allQuestionsAndAnswers={allQuestionsAndAnswers} />
    </>
  )
}

export default App
