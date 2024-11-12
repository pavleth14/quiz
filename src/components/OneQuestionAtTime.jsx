import { useState } from 'react';

const OneQuestionAtTime = ({ allQuestionsAndAnswers }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [finalMessage, setFinalMessage] = useState('');
    const [currentPoints, setCurrentPoints] = useState(0);    
    const [isClicked, setIsClicked] = useState(false);    
    const [quizFinished, setQuizFinished] = useState(false);
    const [seeFinalResults, setSeeFinalResults] = useState(false);

    const handleNextButton = () => {
        if(quizFinished) {
            return;
        }
        
        setCurrentQuestion(prev => prev + 1)
        setFinalMessage('');
        setIsClicked(false);  

        if(currentQuestion === allQuestionsAndAnswers.length - 2) {
            setQuizFinished(true);
        }

    }

    const handleAnswersClick = (answer) => {
        if(isClicked) {
            return
        }
        setIsClicked(true);
        if (answer === allQuestionsAndAnswers[currentQuestion].correctAnswer) {
            setFinalMessage('Correct answer! :)');
            setCurrentPoints(prev => prev + 1);
        } else {
            setFinalMessage('Not correct answer! :/');
        }
    }

    const seeResults = () => {
        setSeeFinalResults(true);
    }

    const resetButton = () => {
        setCurrentQuestion(0);
        setFinalMessage('');
        setCurrentPoints(0);        
        setIsClicked(false);
        setQuizFinished(false);
        setSeeFinalResults(false);
    }

    return (
        <div className='container'>
            <h3>Current points: {currentPoints}</h3>
            <h1>{allQuestionsAndAnswers[currentQuestion].question}</h1>
            <div className='allAnswersDiv'>
                {allQuestionsAndAnswers[currentQuestion].answers.map((answer, index) => (                    
                    <div                        
                        key={index}
                        onClick={() => handleAnswersClick(answer)}
                        className={`answerDiv
                                ${isClicked && answer === allQuestionsAndAnswers[currentQuestion].correctAnswer ? 'correct' : 'incorrect'}
                                ${!isClicked && 'neutral'}
                            `}
                    >
                        {answer}
                    </div>
                ))}
            </div>
            {finalMessage && (
                <div>
                    <h2>{finalMessage}</h2>
                    {!quizFinished ? 
                        <button onClick={handleNextButton}>Next</button>
                        :
                        <button onClick={seeResults}>See Results</button>                    
                    }
                </div>
            )}
            {seeFinalResults && (
                <div>
                    <h1>Results: {currentPoints} / {allQuestionsAndAnswers.length}</h1>
                    <button onClick={resetButton}>Reset</button>
                </div>
            )}
        </div>
    );
}

export default OneQuestionAtTime;