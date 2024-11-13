import { useEffect, useState } from 'react';

const OneQuestionAtTime = ({ allQuestionsAndAnswers }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [finalMessage, setFinalMessage] = useState('');
    const [currentPoints, setCurrentPoints] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [seeFinalResults, setSeeFinalResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // Timer state
    const [isTimedOut, setIsTimedOut] = useState(false); // Flag for time out
    const [startQuiz, setStartQuiz] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true); // Flag to control timer

    // question timer
    useEffect(() => {        
        if (quizFinished || timeLeft === 0 || !isTimerRunning) return;

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval); // Stop the timer when time reaches 0
                    setIsTimedOut(true); // Mark as timed out
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount or when quiz finishes
    }, [timeLeft, quizFinished, isTimerRunning]); // Dependency array, will re-run when timeLeft, quizFinished, or isTimerRunning changes

    useEffect(() => {
        // Move to the next question
        if (isTimedOut) {
            setCurrentQuestion(prev => prev + 1); // Move to the next question
            setTimeLeft(10); // Reset timer for the next question
            setIsTimedOut(false); // Reset timeout flag
        }
    }, [isTimedOut]); // Runs when isTimedOut is true

    const handleNextButton = () => {
        if (quizFinished) return;

        setIsTimerRunning(true); // Start the timer again
        setCurrentQuestion(prev => prev + 1);
        setFinalMessage('');
        setIsClicked(false);
        setTimeLeft(10); // Reset timer when moving to next question

        if (currentQuestion === allQuestionsAndAnswers.length - 1) {
            setQuizFinished(true);
        }
    };

    const handleAnswersClick = (answer) => {
        if (isClicked) return; // Prevent multiple clicks

        setIsClicked(true);
        setIsTimerRunning(false); // Stop the timer when an answer is clicked

        if (answer === allQuestionsAndAnswers[currentQuestion].correctAnswer) {
            setFinalMessage('Correct answer! :)');
            setCurrentPoints(prev => prev + 1);
        } else {
            setFinalMessage('Not correct answer! :/'); 
        }
    };

    const seeResults = () => {
        setSeeFinalResults(true);
    };

    const resetButton = () => {
        setCurrentQuestion(0);
        setFinalMessage('');
        setCurrentPoints(0);
        setIsClicked(false);
        setQuizFinished(false);
        setSeeFinalResults(false);
        setTimeLeft(10); // Reset timer
        setIsTimedOut(false); // Reset the time out flag
        setIsTimerRunning(true); // Reset timer to be running
    };

    const handleStartQuiz = () => {
        setStartQuiz(true);
        setTimeLeft(10);
    };

    if (!startQuiz) {
        return (
            <button onClick={handleStartQuiz}>Start quiz</button>
        );
    }

    // Render nothing if currentQuestion is out of bounds
    if (currentQuestion >= allQuestionsAndAnswers.length) {
        return (
            <div className="container">
                <h1>Quiz Finished!</h1>
                <h2>Your final score: {currentPoints} / {allQuestionsAndAnswers.length}</h2>
                <button onClick={resetButton}>Reset</button>
            </div>
        );
    }

    return (
        <div className='container'>
            <h3>Time left: {timeLeft}</h3>
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
            <h3>Current points: {currentPoints}</h3>
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
};

export default OneQuestionAtTime;
